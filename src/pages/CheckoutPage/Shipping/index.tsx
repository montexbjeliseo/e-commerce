import styled from "styled-components"
import { CheckoutSteps } from "../components/Steps";
import { PreviewCartItem } from "../PreviewCartItem";
import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../../constants";

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;

    .options {
        display: flex;
        flex-direction: column;
        gap: 18px;
    }
    .options li {
        list-style: none;
        height: 89px;
        background: #fff;
        padding: 20px;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 20px;
        height: 100%;
    }
`;

const Label = styled.label`
    display: flex;
    align-items: center;
    gap: 20px;
    height: 100%;
`;

export const CheckoutShippingPage = () => {

    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate(APP_ROUTES.CHECKOUT_PAYMENT);
        console.log("Shipping")
    }

    return (
        <main className="container p-3">
            <h1>Checkout Address</h1>
            <Container>
                <section>
                    <CheckoutSteps position={2} />
                    <form onSubmit={handleSubmit}>
                        <ul className="options">
                            <li>
                                <Label>
                                    <p>
                                        <input type="radio" name="shipping" id="" defaultChecked value={"1"} />
                                    </p>
                                    <p>
                                        <strong>UPS/USPS Surepost</strong>
                                        <br /> 4-7 business days
                                    </p>
                                </Label>
                            </li>
                            <li>
                                <Label>
                                    <p>
                                        <input type="radio" name="shipping" id="" value={"2"} />
                                    </p>
                                    <p>
                                        <strong>UPS Ground Shipping</strong>
                                        <br />
                                        3-5 business days</p>
                                </Label>
                            </li>
                        </ul>
                        <button className="btn btn-primary">Continue</button>
                    </form>
                </section>
                <PreviewCartItem />
            </Container>
        </main>
    )
}