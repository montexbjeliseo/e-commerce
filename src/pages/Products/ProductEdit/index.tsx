import { useParams } from "react-router-dom";
import { fetchProductById } from "../../../api";
import { Loading } from "../../../shared/components/Loading";
import { ErrorMessage } from "../../../shared/components/ErrorMessage";
import { useQuery } from "react-query";
import { QUERY_KEYS } from "../../../constants";
import { Carousel } from "../../../shared/components/Carousel";
import { useEffect, useReducer, useState } from "react";
import { Button } from "../../../shared/components/Styled/Button";
import { Form } from "../../../shared/components/Styled/Form";
import { Modal } from "../../../shared/components/Modal";
import { UploadImage } from "../../../shared/components/UploadImage";




type ProductState = {
    title: string;
    description: string;
    price: string;
    images: string[];
}

enum EDIT_PRODUCT_ACTION_TYPES {
    SET_PRODUCT,
    SET_TITLE,
    SET_DESCRIPTION,
    SET_PRICE,
    SET_IMAGES,
    ADD_IMAGE,
    REMOVE_IMAGE
}

type EditProductAction = {
    type: EDIT_PRODUCT_ACTION_TYPES;
    payload: any;
}

const productEditReducer = (state: ProductState, action: EditProductAction) => {

    switch (action.type) {
        case EDIT_PRODUCT_ACTION_TYPES.SET_PRODUCT:
            return { ...state, ...action.payload }
        case EDIT_PRODUCT_ACTION_TYPES.SET_TITLE:
            return { ...state, title: action.payload }
        case EDIT_PRODUCT_ACTION_TYPES.SET_DESCRIPTION:
            return { ...state, description: action.payload }
        case EDIT_PRODUCT_ACTION_TYPES.SET_PRICE:
            return { ...state, price: action.payload }
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
        title: "",
        description: "",
        price: "",
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

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        dispatch({
            type: EDIT_PRODUCT_ACTION_TYPES.SET_PRODUCT,
            payload: data
        })
    }, [data]);

    if (isLoading) {
        return (
            <Loading />
        )
    }

    if (isError) {
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
            <h1>Edit Product</h1>
            <div className="product-details-container">
                <div className="product-images-container">
                    <Carousel images={product.images} />
                </div>
                <div className="product-details-description-container">
                    <h2>Product Information</h2>
                    <Form action="">
                        <label>
                            Title:
                            <input
                                type="text"
                                name="title"
                                placeholder="Enter product title"
                                value={product.title}
                                onChange={(e) => dispatch({
                                    type: EDIT_PRODUCT_ACTION_TYPES.SET_TITLE,
                                    payload: e.target.value
                                })} />
                        </label>
                        <label>
                            Price:
                            <input
                                type="number"
                                name="price"
                                placeholder="Enter product price"
                                value={product.price}
                                onChange={(e) => {
                                    dispatch({
                                        type: EDIT_PRODUCT_ACTION_TYPES.SET_PRICE,
                                        payload: e.target.value
                                    })
                                }} />
                        </label>
                        <label>
                            Description:
                            <textarea
                                name="description"
                                placeholder="Enter product description"
                                value={product.description}
                                onChange={(e) => {
                                    dispatch({
                                        type: EDIT_PRODUCT_ACTION_TYPES.SET_DESCRIPTION,
                                        payload: e.target.value
                                    })
                                }}
                                rows={5}></textarea>
                        </label>
                        <div>
                            <Button type="reset">Reset</Button> 
                            <Button type="button" onClick={handleClickAddImage}>Add Image</Button> 
                            <Button type="submit">Save product</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}