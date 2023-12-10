import { useReducer } from "react";
import { LabeledRangeInput } from "../LabeledRangeInput";

type PriceRangeInputProps = {
    min: number;
    max: number;
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

export const PriceRangeInput: React.FC<PriceRangeInputProps> = ({ min, max }) => {

    const [priceRange, dispatch] = useReducer(priceRangeReducer, { min, max });

    const handleMinChange = (newMinValue: number) => {
        const clampedMinValue = Math.min(newMinValue, priceRange.max);
        dispatch({ type: ActionType.SET_MIN, payload: clampedMinValue });
    };

    const handleMaxChange = (newMaxValue: number) => {
        console.log(newMaxValue)
        const clampedMaxValue = Math.max(newMaxValue, priceRange.min);
        dispatch({ type: ActionType.SET_MAX, payload: clampedMaxValue });
    };

    return (
        <div>

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

        </div>
    );
};
