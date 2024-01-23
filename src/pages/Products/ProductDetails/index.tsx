import { Link, useParams } from "react-router-dom";
import { fetchProductById } from "../../../api";
import { Loading } from "../../../shared/components/Loading";
import { ErrorMessage } from "../../../shared/components/ErrorMessage";
import { useQuery } from "react-query";
import { APP_ROUTES, QUERY_KEYS } from "../../../constants";
import { Carousel } from "../../../shared/components/Carousel";
import { QuantityInput } from "../../../shared/components/QuantityInput";
import { useState } from "react";
import { useCart } from "../../../contexts/CartProvider";
import { AuthenticatedComponentGuard } from "../../../guards/AuthenticatedComponent";
import { NoAuthenticatedComponentGuard } from "../../../guards/NoAuthenticatedComponent";
import { FullContainer } from "../../../shared/components/FullContainer";
import { Button } from "../../../shared/components/Button";
import { MutedText, ProductDetailContainer, ProductInformationContainer } from "../ProductLayout";
import styled from "styled-components";

const StyledPrice = styled.p`
    font-weight: bold;
    font-size: 24px;
`;

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
        <FullContainer>
            <main>
                <ProductDetailContainer>
                    <Carousel images={data.images} />
                    <ProductInformationContainer>
                        <h1 className="product-title">{data.title}</h1>
                        <p>{data.description}</p>
                        <StyledPrice>${data.price}</StyledPrice>
                        <AuthenticatedComponentGuard>
                            <QuantityInput
                                quantity={quantity}
                                incrementQuantity={incrementQuantity}
                                decrementQuantity={decrementQuantity}
                                onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                            />
                            {
                                isProductInCart() && (
                                    <MutedText>
                                        * The product is already in the cart
                                    </MutedText>
                                )
                            }
                            <div>
                                <Button type="button" onClick={handleAddToCart}>{isProductInCart() ? 'Update cart ' : 'Add to cart '} {'$' + data.price * quantity}</Button>
                            </div>
                        </AuthenticatedComponentGuard>
                        <NoAuthenticatedComponentGuard>
                            <p>
                                * You must <Link to={APP_ROUTES.LOGIN} state={{ from: location.pathname }}>log in</Link> to add products to the cart
                            </p>
                        </NoAuthenticatedComponentGuard>
                    </ProductInformationContainer>
                </ProductDetailContainer>
            </main>
        </FullContainer>
    )
}