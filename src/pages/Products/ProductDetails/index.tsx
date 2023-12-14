import { useParams } from "react-router-dom";
import { fetchProductById } from "../../../api";
import { Loading } from "../../../shared/components/Loading";
import { ErrorMessage } from "../../../shared/components/ErrorMessage";
import { useQuery } from "react-query";
import { QUERY_KEYS } from "../../../constants";
import "./styles.css";
import { Carousel } from "../../../shared/components/Carousel";
import { QuantityInput } from "../../../shared/components/QuantityInput";
import { useState } from "react";
import { useCart } from "../../../contexts/CartProvider";

export const ProductDetailPage = () => {

    const { id } = useParams();

    const { data, isLoading, isError } = useQuery([QUERY_KEYS.PRODUCTS, id], () => fetchProductById(id ? parseInt(id, 10) : 0));

    const [quantity, setQuantity] = useState(1);

    const { items, addItem } = useCart();

    const incrementQuantity = () => {
        setQuantity(quantity + 1);
    }

    const decrementQuantity = () => {
        setQuantity(Math.max(quantity - 1, 1));
    }

    const handleAddToCart = () => {

        if (quantity === 0) {
            return;
        }

        addItem(data.id, data, quantity);
    }

    const isProductInCart = () => {
        return items.some((item) => item.product_id === data.id);
    }

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
            <div className="product-details-container">
                <div className="product-images-container">
                    <Carousel images={data.images} />
                </div>
                <div className="product-details-description-container">
                    <h1 className="product-title">{data.title}</h1>
                    <p><b>{data.category.name}</b></p>
                    <p><b>Description: </b>{data.description}</p>
                    <p><b>Price: </b>${data.price}</p>
                    <QuantityInput
                        quantity={quantity}
                        incrementQuantity={incrementQuantity}
                        decrementQuantity={decrementQuantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                    />
                    <div>
                        <button disabled={isProductInCart()} className="btn btn-primary" type="button" onClick={handleAddToCart}>{isProductInCart() ? 'Is already in cart' : 'Add to cart $' + data.price * quantity}</button> <button className="btn btn-cta" type="button">Buy now</button>
                    </div>
                </div>
            </div>
        </div>
    )
}