import styled from "styled-components";
import { CheckboxInput } from "../../../shared/components/CheckboxInput";
import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../../constants";
import { CheckoutSteps } from "../components/Steps";
import { PreviewCartItem } from "../PreviewCartItem";

const Container = styled.section`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;

    form {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
    }

    form input {
        grid-column: 1 / 7;
    }

    form input.cols-2-1 {
        grid-column: 1 / 4;
    }
    form input.cols-2-2 {
        grid-column: 4 / 7;
    }
    form input.cols-3-1 {
        grid-column: 1 / 3;
    }
    form input.cols-3-2 {
        grid-column: 3 / 5;
    }
    form input.cols-3-3 {
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

    const navigate = useNavigate();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);

        console.log(Object.fromEntries(formData))

        navigate(APP_ROUTES.CHECKOUT_SHIPPING);
    }

    return (
        <main className="container p-3">
            <h1>Checkout Address</h1>
            <Container>
                <section>
                    <CheckoutSteps position={1}/>
                    <div>
                        <h2>Address Information</h2>
                        <form onSubmit={handleSubmit}>
                            <input className="text-input cols-2-1 mb-1" type="text" name="first_name" placeholder="First Name" required />
                            <input className="text-input cols-2-2 mb-1" type="text" name="last_name" placeholder="Last Name" required />
                            <input className="text-input mb-1" type="text" name="address" id="" placeholder="Address" required />
                            <input className="text-input mb-1" type="text" name="apartment" id="" placeholder="Apartment, suit (optional)" />
                            <input className="text-input mb-1" type="text" name="country" id="" placeholder="Country" required />
                            <input className="text-input cols-3-1 mb-1" type="text" name="city" id="" placeholder="city" required />
                            <input className="text-input cols-3-2 mb-1" type="text" name="city" id="" placeholder="City" required />
                            <input className="text-input cols-3-3 mb-1" type="number" name="zipcode" id="" placeholder="zipcode" required />
                            <input className="text-input mb-1" type="text" name="optional" id="" placeholder="Optional" />
                            <div className="full py-1">
                                <CheckboxInput label="Save this information for next time" name={"Save contact information"} value={""} />
                            </div>
                            <button type="submit" className="full btn btn-primary ">Save information</button>
                        </form>
                    </div>
                </section>
                <PreviewCartItem />
            </Container>
        </main>
    )
}