import { useParams } from "react-router-dom";
import { fetchProductById, updateProduct } from "../../../api";
import { Loading } from "../../../shared/components/Loading";
import { ErrorMessage } from "../../../shared/components/ErrorMessage";
import { useQuery } from "react-query";
import { QUERY_KEYS } from "../../../constants";
import { useEffect, useReducer, useState } from "react";
import { Button } from "../../../shared/components/Styled/Button";
import { Form } from "../../../shared/components/Styled/Form";
import { Modal } from "../../../shared/components/Modal";
import { UploadImage } from "../../../shared/components/UploadImage";
import { SelectProductCategory } from "../../../shared/components/SelectProductCategory";
import { CheckIcon } from "../../../shared/components/CheckIcon";
import { ProductImageCarousel } from "../ProductImageCarousel";



type ProductState = {
    images: string[];
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
}

enum EDIT_PRODUCT_ACTION_TYPES {
    SET_IMAGES,
    ADD_IMAGE,
    REMOVE_IMAGE,
    SET_IS_LOADING,
    SET_IS_ERROR,
    SET_IS_SUCCESS
}

type EditProductAction = {
    type: EDIT_PRODUCT_ACTION_TYPES;
    payload: any;
}

const productEditReducer = (state: ProductState, action: EditProductAction) => {
    const operations = {
        isLoading: false,
        isError: false,
        isSuccess: false
    }
    switch (action.type) {
        case EDIT_PRODUCT_ACTION_TYPES.SET_IS_SUCCESS:
            return { ...state, ...operations, isSuccess: action.payload }
        case EDIT_PRODUCT_ACTION_TYPES.SET_IS_LOADING:
            return { ...state, ...operations, isLoading: action.payload }
        case EDIT_PRODUCT_ACTION_TYPES.SET_IS_ERROR:
            return { ...state, ...operations, isError: action.payload }

        case EDIT_PRODUCT_ACTION_TYPES.SET_IMAGES:
            return { ...state, images: action.payload }
        case EDIT_PRODUCT_ACTION_TYPES.ADD_IMAGE:
            return { ...state, images: [...state.images, action.payload] }
        case EDIT_PRODUCT_ACTION_TYPES.REMOVE_IMAGE:
            return { ...state, images: state.images.filter((image) => image !== action.payload) }
        default:
            return state
    }
}

export const ProductEditPage = () => {

    const { id } = useParams();

    const {
        data,
        isLoading,
        isError,
        refetch: fetchData
    } = useQuery([QUERY_KEYS.PRODUCTS, id], () => fetchProductById(id ? parseInt(id, 10) : 0), { enabled: false });

    const [product, dispatch] = useReducer(productEditReducer, {
        images: [],
        ...data
    });

    const [showAddImage, setShowAddImage] = useState(false);

    const handleClickAddImage = () => {
        setShowAddImage(true);
    }

    const addImage = (image: string) => {
        dispatch({
            type: EDIT_PRODUCT_ACTION_TYPES.ADD_IMAGE,
            payload: image
        })
    }

    const removeImage = (image: string) => {
        dispatch({
            type: EDIT_PRODUCT_ACTION_TYPES.REMOVE_IMAGE,
            payload: image
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = Object.fromEntries(new FormData(e.target as HTMLFormElement));

        formData.images = product.images;

        if (!id) {
            return;
        }

        dispatch({
            type: EDIT_PRODUCT_ACTION_TYPES.SET_IS_LOADING,
            payload: true
        })

        updateProduct(formData, id).then(() => {
            dispatch({
                type: EDIT_PRODUCT_ACTION_TYPES.SET_IS_SUCCESS,
                payload: true
            });
        }).catch((error) => {
            dispatch({
                type: EDIT_PRODUCT_ACTION_TYPES.SET_IS_ERROR,
                payload: true
            });
        });


    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {

        if (data) {
            dispatch({
                type: EDIT_PRODUCT_ACTION_TYPES.SET_IMAGES,
                payload: data.images
            })
        }
    }, [data]);


    if (isLoading) {
        return (
            <Loading />
        )
    }

    if (isError || !data) {
        return (
            <ErrorMessage />
        )
    }

    return (
        <div className="container">
            <Modal
                isOpen={showAddImage}
                onClose={() => setShowAddImage(false)}
            >
                <UploadImage
                    onUpload={addImage} />
            </Modal>

            <Modal
                isOpen={product.isLoading}
                onClose={() => {
                    dispatch({
                        type: EDIT_PRODUCT_ACTION_TYPES.SET_IS_LOADING,
                        payload: false
                    })
                }}
            >
                <div>
                    <Loading />
                    <p>Please wait...</p>
                </div>
            </Modal>

            <Modal
                isOpen={product.isError}
                onClose={() => {
                    dispatch({
                        type: EDIT_PRODUCT_ACTION_TYPES.SET_IS_ERROR,
                        payload: false
                    })
                }}
            >
                <div>
                    <div className="error-icon">
                        <CheckIcon checked={false} />
                    </div>
                    <div className="error-message">
                        An error has occurred.
                    </div>
                </div>
            </Modal>
            <Modal
                isOpen={product.isSuccess}
                onClose={() => {
                    dispatch({
                        type: EDIT_PRODUCT_ACTION_TYPES.SET_IS_SUCCESS,
                        payload: false
                    })
                }}
            >
                <div>
                    <div className="error-icon">
                        <CheckIcon checked={true} />
                    </div>
                    <div>
                        Product updated successfully.
                    </div>
                </div>
            </Modal>
            {data ? (
                <>
                    <h1>Edit Product</h1>
                    <div className="product-details-container">
                        <div className="product-images-container">
                            <ProductImageCarousel images={product.images} onRemoveImage={removeImage} />
                        </div>
                        <div className="product-details-description-container">
                            <h2>Product Information</h2>
                            <Form onSubmit={handleSubmit}>
                                <label>
                                    Title:
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder="Enter product title"
                                        defaultValue={data.title}
                                    />
                                </label>
                                <label>
                                    Price:
                                    <input
                                        type="number"
                                        name="price"
                                        placeholder="Enter product price"
                                        defaultValue={data.price}
                                    />
                                </label>
                                <label>
                                    Category:
                                    <SelectProductCategory selected={data.category.id} />
                                </label>
                                <label>
                                    Description:
                                    <textarea
                                        name="description"
                                        placeholder="Enter product description"
                                        defaultValue={data.description}
                                        rows={5}></textarea>
                                </label>
                                <div>
                                    <Button type="button" onClick={handleClickAddImage}>Add Image</Button>
                                    <Button type="submit">Save product</Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </>
            ) : null}
        </div>
    )
}