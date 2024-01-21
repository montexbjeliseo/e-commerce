import styled from "styled-components";
import { FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../../constants";
import { CheckoutSteps } from "../components/Steps";
import { PreviewCartItem } from "../../../shared/components/PreviewCartItem";
import { useShopping } from "../../../contexts/ShoppingProvider";
import { AddressInfoType } from "../../../types";
import { SwitchInput } from "../../../shared/components/SwitchInput";
import { useCart } from "../../../contexts/CartProvider";
import { InputText } from "../../../shared/components/InputText";
import { CartPageLayout } from "../../CartPage/CartPageLayout";
import { FullContainer } from "../../../shared/components/FullContainer";
import { Button } from "../../../shared/components/Button";

const StyledAddressForm = styled.form`
    box-sizing: border-box;
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(6, 1fr);

    input {
        grid-column: 1 / 7;
    }

    input.cols-2-1 {
        grid-column: 1 / 4;
    }
    input.cols-2-2 {
        grid-column: 4 / 7;
    }
    input.cols-3-1 {
        grid-column: 1 / 3;
    }
    input.cols-3-2 {
        grid-column: 3 / 5;
    }
    input.cols-3-3 {
        grid-column: 5 / 7;
    }

    .full {
        grid-column: 1 / 7;
    }
    .py-1 {
        padding: 1rem 0;
    }
    .mb-1 {
        margin-bottom: 1rem;
    }
`;

export const CheckoutAddressPage = () => {

    const { saveAddressInfo } = useShopping();

    const { items } = useCart();

    const navigate = useNavigate();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        const formData = Object.fromEntries(new FormData(event.target as HTMLFormElement));

        saveAddressInfo(formData as AddressInfoType);

        navigate(APP_ROUTES.CHECKOUT_SHIPPING);
    }

    useEffect(() => {

        if (items.length === 0) {
            navigate(APP_ROUTES.CHECKOUT_ADDRESS);
        }
    }, [])

    return (
        <FullContainer>
            <main className="container p-3">
                <h1>Checkout Address</h1>
                <CartPageLayout>
                    <section>
                        <CheckoutSteps position={1} />
                        <div>
                            <h2>Address Information</h2>
                            <StyledAddressForm onSubmit={handleSubmit}>
                                <InputText className="cols-2-1 mb-1" type="text" name="first_name" placeholder="First Name" required />
                                <InputText className="cols-2-2 mb-1" type="text" name="last_name" placeholder="Last Name" required />
                                <InputText type="text" name="address" id="" placeholder="Address" required />
                                <InputText type="text" name="apartment" id="" placeholder="Apartment, suit (optional)" />
                                <InputText type="text" name="country" id="" placeholder="Country" required />
                                <InputText className="cols-3-1" type="text" name="city" id="" placeholder="city" required />
                                <InputText className="cols-3-2" type="text" name="city" id="" placeholder="City" required />
                                <InputText className="cols-3-3" type="number" name="zipcode" id="" placeholder="zipcode" required />
                                <InputText type="text" name="optional" id="" placeholder="Optional" />
                                <div className="full py-1">
                                    <SwitchInput label="Save this information for next time" name={"Save contact information"} />
                                </div>
                                <Button type="submit" className="full">Save information</Button>
                            </StyledAddressForm>
                        </div>
                    </section>
                    <PreviewCartItem />
                </CartPageLayout>
            </main>
        </FullContainer>
    )
}