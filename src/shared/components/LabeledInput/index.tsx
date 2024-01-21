import { useId } from "react";
import { InputText } from "../InputText";

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
            <InputText required={required} className="text-input" placeholder={placeholder} type={type} name={name} id={textInputId} />
        </>
    )
}