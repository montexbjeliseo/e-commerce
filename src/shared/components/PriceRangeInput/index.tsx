import { useId, useReducer } from "react";

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

    const minPriceRangeInputId = useId();
    const maxPriceRangeInputId = useId();

    const [priceRange, dispatch] = useReducer(priceRangeReducer, { min, max });

    const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newMinValue = parseInt(event.target.value, 10);
        const clampedMinValue = Math.min(newMinValue, priceRange.max);
        dispatch({ type: ActionType.SET_MIN, payload: clampedMinValue });
    };

    const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newMaxValue = parseInt(event.target.value, 10);
        const clampedMaxValue = Math.max(newMaxValue, priceRange.min);
        dispatch({ type: ActionType.SET_MAX, payload: clampedMaxValue });
    };

    return (
        <div>
            <p>
                <label htmlFor={minPriceRangeInputId}>Min: {priceRange.min}</label>
            </p>
            <input
                type="range"
                name="pricemin"
                id={minPriceRangeInputId}
                min={min}
                max={max}
                value={priceRange.min}
                onChange={handleMinChange}
            />

            <p><label htmlFor={maxPriceRangeInputId}>Max: {priceRange.max}</label></p>
            <input
                type="range"
                name="pricemax"
                id={maxPriceRangeInputId}
                min={min}
                max={max}
                value={priceRange.max}
                onChange={handleMaxChange}
            />
        </div>
    );
};
