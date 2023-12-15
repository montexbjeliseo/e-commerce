import styled from "styled-components";
import { CheckoutSteps } from "../components/Steps";
import { PreviewCartItem } from "../PreviewCartItem";
import { CheckboxInput } from "../../../shared/components/CheckboxInput";
import { FormEvent } from "react";

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;

    form {
        display: flex;
        flex-direction: column;
        gap: 18px;

        .cols-3 {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 18px;
        }
    }
`;

export const CheckoutPaymentPage = () => {

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Finalzing order...");
    }

    return (
        <main className="container p-3">
            <h1>Checkout</h1>
            <Container>
                <section>
                    <CheckoutSteps position={3} />
                    <form onSubmit={handleSubmit}>
                        <input className="text-input" type="text" name="card_holder" id="" placeholder="Card Holder" />
                        <input className="text-input" type="text" name="card_number" id="" placeholder="Card Number" />

                        <div className="cols-3">
                            <input className="text-input cols-3" type="number" name="month" id="" placeholder="Month" />
                            <input className="text-input cols-3" type="number" name="year" id="" placeholder="Year" />
                            <input className="text-input cols-3" type="text" name="cvv" id="" placeholder="CVV" />
                        </div>
                        <div>
                        <CheckboxInput name="terms" label="I agree with terms and conditions" value={"true"}/>
                        </div>
                        <button className="btn btn-primary">Pay with card</button>
                    </form>
                </section>
                <PreviewCartItem />
            </Container>
        </main>
    )
}