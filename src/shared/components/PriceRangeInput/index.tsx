import { useReducer } from "react";
import { LabeledRangeInput } from "../LabeledRangeInput";
import { PriceRange } from "../../../types";
import styled from "styled-components";


const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

type PriceRangeInputProps = {
    min: number;
    max: number;
    rangeValue: PriceRange;
    handleChange?: (min: number, max: number) => void;
};

enum ActionType {
    SET_MIN = "SET_MIN",
    SET_MAX = "SET_MAX",
}

function priceRangeReducer(state: any, action: any) {
    switch (action.type) {
        case ActionType.SET_MIN:
            return { ...state, min: action.payload };
        case ActionType.SET_MAX:
            return { ...state, max: action.payload };
        default:
            throw new Error();
    }
}

export const PriceRangeInput: React.FC<PriceRangeInputProps> = ({ min, max, rangeValue }) => {

    const [priceRange, dispatch] = useReducer(priceRangeReducer, rangeValue);

    const handleMinChange = (newMinValue: number) => {
        const clampedMinValue = Math.min(newMinValue, priceRange.max);
        dispatch({ type: ActionType.SET_MIN, payload: clampedMinValue });
    };

    const handleMaxChange = (newMaxValue: number) => {
        const clampedMaxValue = Math.max(newMaxValue, priceRange.min);
        dispatch({ type: ActionType.SET_MAX, payload: clampedMaxValue });
    };

    return (
        <Container>

            <LabeledRangeInput
            input_name="minprice"
            label="Min" 
            min={min} 
            max={max} 
            value={priceRange.min} 
            handleChange={handleMinChange}/>

            <LabeledRangeInput 
            input_name="maxprice"
            label="Max" 
            min={min} 
            max={max} 
            value={priceRange.max} 
            handleChange={handleMaxChange} />

        </Container>
    );
};
