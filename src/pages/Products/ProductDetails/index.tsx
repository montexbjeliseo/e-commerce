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
import { LoggedUserComponent } from "../../../guards/LoggedUserComponent";
import { NoLoggedUserComponent } from "../../../guards/NoLoggedUserComponent";

export const ProductDetailPage = () => {

    const { id } = useParams();

    const { data, isLoading, isError } = useQuery([QUERY_KEYS.PRODUCTS, id], () => fetchProductById(id ? parseInt(id, 10) : 0));

    const [quantity, setQuantity] = useState(1);

    const { items, addItem, updateItem } = useCart();

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

        if (isProductInCart()) {
            updateItem(data.id, quantity);
        } else {
            addItem(data.id, data, quantity);
        }
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
                    <LoggedUserComponent>
                        <QuantityInput
                            quantity={quantity}
                            incrementQuantity={incrementQuantity}
                            decrementQuantity={decrementQuantity}
                            onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                        />
                        {
                            isProductInCart() && (
                                <div>
                                    <p>
                                        * The product is already in the cart
                                    </p>
                                </div>
                            )
                        }
                        <div>
                            <button className="btn btn-primary" type="button" onClick={handleAddToCart}>{isProductInCart() ? 'Update cart ' : 'Add to cart '} {'$' + data.price * quantity}</button>
                        </div>
                    </LoggedUserComponent>
                    <NoLoggedUserComponent>
                        <p>
                            * You must be logged in to add products to the cart
                        </p>
                    </NoLoggedUserComponent>
                </div>
            </div>
        </div>
    )
}