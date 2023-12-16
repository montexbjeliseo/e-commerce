import styled from "styled-components";
import { CheckoutSteps } from "../components/Steps";
import { PreviewCartItem } from "../../../shared/components/PreviewCartItem";
import { CheckboxInput } from "../../../shared/components/CheckboxInput";
import { FormEvent, useEffect, useReducer, useState } from "react";
import * as CardValidator from 'card-validator';
import { useShopping } from "../../../contexts/ShoppingProvider";
import { OrderInfoType } from "../../../types";
import { useCart } from "../../../contexts/CartProvider";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../../constants";
import { ValidableField } from "../../../shared/components/ValidableField";
import { CreditCardIcon } from "../../../shared/components/CreditCardIcon";
import { CheckIcon } from "../../../shared/components/CheckIcon";

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;

    form {
        display: flex;
        flex-direction: column;
        gap: 18px;

        .card-number {
            display: flex;
            flex-direction: column;
            position: relative;
        }

        .card-icon {
            position: absolute;
            right: 10px;
            height: 100%;
            display: flex;
            align-items: center;
            user-select: none;
        }

        .card-icon img {
            width: 40px;
            height: 40px;
            user-select: none;
        }

        .cols-3 {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 18px;
        }
    }
`;

type CreditCard = {
    cardHolder: string;
    cardNumber: string,
    cardCVV: string,
    cardExpiryMonth: string,
    cardExpiryYear: string,

    cardHolderValidation?: {
        isValid: boolean,
        isPotentiallyValid: boolean
    },
    cardNumberValidation?: {
        isValid: boolean,
        isPotentiallyValid: boolean,
        card: any
    },
    cardMonthValidation?: {
        isPotentiallyValid: boolean,
        isValid: boolean,
        isValidForThisYear: boolean
    },
    cardYearValidation?: {
        isValid: boolean,
        isPotentiallyValid: boolean,
        isCurrentYear: boolean
    },
    cardCVVValidation?: {
        isValid: boolean,
        isPotentiallyValid: boolean
    }
}

const INITIAL_STATE: CreditCard = {
    cardHolder: '',
    cardNumber: '',
    cardCVV: '',
    cardExpiryMonth: '',
    cardExpiryYear: ''
}

enum ACTION_TYPES {
    setCardHolder = 'setCardHolder',
    setCardNumber = 'setCardNumber',
    setCardCVV = 'setCardCVV',
    setCardExpiryMonth = 'setCardExpiryMonth',
    setCardExpiryYear = 'setCardExpiryYear'
}

type ActionType = {
    type: ACTION_TYPES,
    payload: string
}

const checkCardReducer = (state: CreditCard, action: ActionType): CreditCard => {
    switch (action.type) {
        case ACTION_TYPES.setCardHolder:
            return {
                ...state,
                cardHolder: action.payload,
                cardHolderValidation: CardValidator.cardholderName(action.payload)
            }
        case ACTION_TYPES.setCardNumber:
            return {
                ...state,
                cardNumber: action.payload,
                cardNumberValidation: CardValidator.number(action.payload)
            };
        case ACTION_TYPES.setCardCVV:
            return {
                ...state,
                cardCVV: action.payload,
                cardCVVValidation: CardValidator.cvv(action.payload)
            };
        case ACTION_TYPES.setCardExpiryMonth:
            return {
                ...state,
                cardExpiryMonth: action.payload,
                cardMonthValidation: CardValidator.expirationMonth(action.payload)
            };
        case ACTION_TYPES.setCardExpiryYear:
            return {
                ...state,
                cardExpiryYear: action.payload,
                cardYearValidation: CardValidator.expirationYear(action.payload)
            };
    }
}


export const CheckoutPaymentPage = () => {

    const { addressInfo, shippingInfo, addOrder, isAddressInfoValid, isShippingInfoValid } = useShopping();

    const { items, clear: clearCart } = useCart();

    const [creditCard, dispatch] = useReducer(checkCardReducer, INITIAL_STATE as CreditCard);

    const [shopSuccess, setShopSuccess] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // const formData = Object.fromEntries(new FormData(e.target as HTMLFormElement));

        if (
            creditCard.cardHolderValidation?.isValid &&
            creditCard.cardNumberValidation?.isValid &&
            creditCard.cardMonthValidation?.isValid &&
            creditCard.cardYearValidation?.isValid &&
            creditCard.cardCVVValidation?.isValid
        ) {
            const newOrder = {
                address: addressInfo,
                shipping: shippingInfo,
                payment: creditCard,
                items: items,
                date: new Date(),
                arrival: new Date()
            } as OrderInfoType;
            addOrder(newOrder);
            clearCart();
            setShopSuccess(true);
        }
    }

    useEffect(() => {
        if (items.length === 0) {
            navigate(APP_ROUTES.CART);
        } else if (!isAddressInfoValid()) {
            navigate(APP_ROUTES.CHECKOUT_ADDRESS);
        } else if (!isShippingInfoValid()) {
            navigate(APP_ROUTES.CHECKOUT_SHIPPING);
        }

    }, []);

    return (
        <main className="container p-3">
            <h1>Checkout</h1>
            <Container>
                <section>
                    <CheckoutSteps position={3} />
                    <div>
                        {shopSuccess ? <h2>Thank you for your order!</h2> : <h2>Payment</h2>}
                    </div>
                    {shopSuccess ? (
                        <p className="success-message">Your order has been placed! We will send you a confirmation email shortly.</p>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <ValidableField
                                name="card_holder"
                                placeholder="Card Holder"
                                value={creditCard.cardHolder}
                                onChange={(e) => dispatch({ type: ACTION_TYPES.setCardHolder, payload: e.currentTarget.value })}
                                isValid={creditCard.cardHolderValidation?.isValid && creditCard.cardHolder.length > 5 ? true : false}
                            />
                            <div className="card-number">
                                <input
                                    className="text-input"
                                    type="text"
                                    name="card_number"
                                    placeholder="Card Number"
                                    value={creditCard.cardNumber}
                                    onChange={(e) => dispatch({ type: ACTION_TYPES.setCardNumber, payload: e.currentTarget.value })} />
                                <div className="card-icon">
                                    
                                    <CreditCardIcon
                                        number={creditCard.cardNumber}
                                    />
                                    <CheckIcon
                                        checked={
                                            creditCard.cardNumberValidation?.isValid || false
                                        }
                                    />
                                </div>
                            </div>

                            <div className="cols-3">
                                <ValidableField
                                    name="month"
                                    placeholder="MM"
                                    value={creditCard.cardExpiryMonth}
                                    onChange={
                                        (e) => dispatch(
                                            {
                                                type: ACTION_TYPES.setCardExpiryMonth,
                                                payload: e.currentTarget.value
                                            })
                                    }
                                    isValid={
                                        creditCard.cardMonthValidation?.isValid &&
                                            creditCard.cardExpiryMonth.length === 2 ? true : false}
                                />
                                <ValidableField
                                    name="year"
                                    placeholder="YY"
                                    value={creditCard.cardExpiryYear}
                                    onChange={(e) => dispatch({ type: ACTION_TYPES.setCardExpiryYear, payload: e.currentTarget.value })}
                                    isValid={
                                        ((creditCard.cardYearValidation?.isValid &&
                                            !creditCard.cardYearValidation?.isCurrentYear) ||
                                            (creditCard.cardYearValidation?.isValid &&
                                                creditCard.cardYearValidation?.isCurrentYear &&
                                                creditCard.cardMonthValidation?.isValidForThisYear)) &&
                                            creditCard.cardExpiryYear.length === 2 ? true : false}
                                />
                                <ValidableField
                                    name="cvv"
                                    placeholder="CVV"
                                    value={creditCard.cardCVV}
                                    onChange={(e) => dispatch({ type: ACTION_TYPES.setCardCVV, payload: e.currentTarget.value })}
                                    isValid={creditCard.cardCVVValidation?.isValid && creditCard.cardCVV.length === 3 ? true : false}
                                />
                            </div>
                            <div>
                                <CheckboxInput name="terms" label="I agree with terms and conditions" value={"true"} />
                            </div>
                            <button className="btn btn-primary">Pay with card</button>
                        </form>
                    )}
                </section>
                <PreviewCartItem />
            </Container>
        </main>
    )
}