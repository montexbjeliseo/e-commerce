import { createProduct } from "../../../api";
import { Loading } from "../../../shared/components/Loading";
import { useMutation } from "react-query";
import { useReducer, useState } from "react";
import { Button } from "../../../shared/components/Button";
import { Form } from "../../../shared/components/Styled/Form";
import { Modal } from "../../../shared/components/Modal";
import { UploadImage } from "../../../shared/components/UploadImage";
import { SelectProductCategory } from "../../../shared/components/SelectProductCategory";
import { CheckIcon } from "../../../shared/components/CheckIcon";
import { ProductImageCarousel } from "../ProductImageCarousel";
import { APP_ROUTES } from "../../../constants";
import { Link, useNavigate } from "react-router-dom";
import { FullContainer } from "../../../shared/components/FullContainer";
import { ProductDetailContainer, ProductInformationContainer } from "../ProductLayout";
import { InputText } from "../../../shared/components/InputText";
import { Textarea } from "../../../shared/components/Textarea";

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

export const ProductCreatePage = () => {

    const [product, dispatch] = useReducer(productEditReducer, {
        images: [],
        isLoading: false,
        isSuccess: false,
        isError: false
    });

    const mutation = useMutation(createProduct, {
        onSuccess: () => {
            dispatch({
                type: EDIT_PRODUCT_ACTION_TYPES.SET_IS_SUCCESS,
                payload: true
            })
        },
        onError: () => {
            dispatch({
                type: EDIT_PRODUCT_ACTION_TYPES.SET_IS_ERROR,
                payload: true
            })
        }
    });

    const [showAddImage, setShowAddImage] = useState(false);

    const navigate = useNavigate();

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

        dispatch({
            type: EDIT_PRODUCT_ACTION_TYPES.SET_IS_LOADING,
            payload: true
        })
        mutation.mutate(formData);
    }

    return (
        <FullContainer>
            <main>
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
                        navigate(APP_ROUTES.PRODUCTS);
                    }}
                >
                    <div>
                        <div className="error-icon">
                            <CheckIcon checked={true} />
                        </div>
                        <div>
                            Product create successfully.
                            <p>Go back to <Link to={APP_ROUTES.PRODUCTS}>Products</Link></p>
                        </div>
                    </div>
                </Modal>
                <h2>Create a new product</h2>
                <ProductDetailContainer>
                    <ProductImageCarousel images={product.images} onRemoveImage={removeImage} />
                    <ProductInformationContainer>
                        <h3>Product Information</h3>
                        <Form onSubmit={handleSubmit}>
                            <label>
                                Title:
                                <InputText
                                    type="text"
                                    name="title"
                                    placeholder="Enter product title"
                                />
                            </label>
                            <label>
                                Price:
                                <InputText
                                    type="number"
                                    name="price"
                                    placeholder="Enter product price"
                                />
                            </label>
                            <label>
                                Category:
                                <SelectProductCategory selected={''} />
                            </label>
                            <label>
                                Description:
                                <Textarea
                                    name="description"
                                    placeholder="Enter product description"
                                    rows={5}></Textarea>
                            </label>
                            <div>
                                <Button type="button" onClick={handleClickAddImage}>Add Image</Button>
                                <Button type="submit">Create product</Button>
                            </div>
                        </Form>
                    </ProductInformationContainer>
                </ProductDetailContainer>
            </main>
        </FullContainer>
    )
}