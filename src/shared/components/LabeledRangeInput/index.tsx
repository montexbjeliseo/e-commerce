import { useId } from "react";

type LabeledRangeInputProps = {
    input_name: string;
    label: string;
    min: number
    max: number
    handleChange?: (newValue: number) => void
    value: number;
}

export const LabeledRangeInput: React.FC<LabeledRangeInputProps> = ({ input_name, label, min, max, handleChange, value }) => {
    
    const rangeInputId = useId();
    
    return (
        <>
            <p><label htmlFor={rangeInputId}>{label}: {value}</label></p>
            <input
                type="range"
                name={input_name}
                id={rangeInputId}
                min={min}
                max={max}
                value={value}
                onChange={handleChange ? (event) => handleChange(parseInt(event.target.value, 10)) : undefined}
            />
        </>
    )
}