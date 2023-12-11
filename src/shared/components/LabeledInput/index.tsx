import { useId } from "react";

type LabeledInputProps = {
    label: string;
    name: string;
    type: string;
    placeholder?: string;
    required?: boolean;
}

export const LabeledInput: React.FC<LabeledInputProps> = ({ label, name, type, placeholder, required }) => {

    const textInputId = useId();

    return (
        <>
            <label htmlFor={textInputId}>{label}</label>
            <input required={required} className="text-input" placeholder={placeholder} type={type} name={name} id={textInputId} />
        </>
    )
}