import styled from "styled-components"
import { CheckoutSteps } from "../components/Steps";
import { PreviewCartItem } from "../../../shared/components/PreviewCartItem";
import { FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../../constants";
import { useShopping } from "../../../contexts/ShoppingProvider";
import { FullContainer } from "../../../shared/components/FullContainer";
import { CartPageLayout } from "../../CartPage/CartPageLayout";
import { Button } from "../../../shared/components/Button";

const Options = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 18px;
    li {
        list-style: none;
        height: 89px;
        // background: #fff;
        padding: 20px;
    }
`;

const Label = styled.label`
    display: flex;
    align-items: center;
    gap: 20px;
    height: 100%;
`;

export const CheckoutShippingPage = () => {

    const { saveShippingInfo, shippingMethods, isAddressInfoValid } = useShopping();

    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.target as HTMLFormElement));
        const shipping = parseInt(formData.shipping as string);
        if (Number.isNaN(shipping)) return;
        saveShippingInfo(shippingMethods.find((method: any) => method.id === shipping));
        navigate(APP_ROUTES.CHECKOUT_PAYMENT);
    }

    useEffect(() => {
        if (!isAddressInfoValid()) {
            navigate(APP_ROUTES.CHECKOUT_ADDRESS);
        }
    }, []);

    return (
        <FullContainer>
            <main className="container p-3">
                <h2>Checkout Address</h2>
                <CartPageLayout>
                    <section>
                        <CheckoutSteps position={2} />
                        <form onSubmit={handleSubmit}>
                            <Options>
                                {shippingMethods && shippingMethods.map((method, index) => (
                                    <li key={method.id}>
                                        <Label>
                                            <p>
                                                <input type="radio" name="shipping" value={method.id} defaultChecked={index === 0} />
                                            </p>
                                            <p>
                                                <strong>{method.name}</strong>
                                                <br />
                                                {method.description}
                                            </p>
                                        </Label>
                                    </li>
                                ))}
                            </Options>
                            <Button>Continue</Button>
                        </form>
                    </section>
                    <PreviewCartItem />
                </CartPageLayout>
            </main>
        </FullContainer>
    )
}