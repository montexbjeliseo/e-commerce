import styled from "styled-components"

const QuantityInputContainer = styled.div`
    width: 167px;
    height: 50px;
    flex-shrink: 0;
    border: 1px solid #000;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    padding: 0 6px;
    box-sizing: border-box;
    button {
        width: 20px;
        height: 20px;
        background-color: transparent;
        border: none;
        font-size: 20px;
        opacity: 0.5;
        cursor: pointer;
    }
    button:hover {
        opacity: 1;
    }
    input[type="text"] {
        width: 100px;
        height: 25px;
        text-align: center;
        background-color: transparent;
        border: none;
        outline: none;
        font-family: Inter;
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: 26px; /* 144.444% */
        letter-spacing: -0.3px;
    }
`;

type Props = {
    quantity: number
    incrementQuantity: () => void
    decrementQuantity: () => void
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const QuantityInput: React.FC<Props> = ({quantity, incrementQuantity, decrementQuantity, onChange}) => {

    

    return (
        <QuantityInputContainer>
            <button onClick={decrementQuantity}>-</button>
            <input type="text" readOnly value={quantity} onChange={onChange}/>
            <button onClick={incrementQuantity}>+</button>
        </QuantityInputContainer>
    )
}