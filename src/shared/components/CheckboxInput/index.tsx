import React, { useId } from "react"

type Props = {
    name: string;
    value: string;
    label: string;
}

export const CheckboxInput: React.FC<Props> = ({ name, value, label }) => {

    const CheckboxInputId = useId();

    return (
        <>
            <input type="checkbox" name={name} value={value} id={CheckboxInputId} />
            <label htmlFor={CheckboxInputId}>{label}</label>
        </>
    )
}