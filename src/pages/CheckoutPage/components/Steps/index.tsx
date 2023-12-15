import styled from "styled-components"

const Steps = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
        padding: 20px;
    }

    .div {
        padding: 0;
        border: 2px solid #000;
        height: 1px;
        width: 90%;
        opacity: 0.6;
    }
`;

type Props = {
    position: number;
}

export const CheckoutSteps: React.FC<Props> = ({position}) => {
    return (
        <Steps>
            <span>{position === 1 ? <strong>Address</strong> : "Address"}</span>
            <span className="div"></span>
            <span>{position === 2 ? <strong>Shipping</strong> : "Shipping"}</span>
            <span className="div"></span>
            <span>{position === 3 ? <strong>Payment</strong> : "Payment"}</span>
        </Steps>
    )
}