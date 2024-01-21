import { useId } from "react";
import { InputText } from "../InputText";

export const EmailInput = () => {

    const emailInputId = useId();

    return (
        <>
            <label htmlFor={emailInputId}>Email</label>
            <InputText required={true} className="text-input" placeholder="Email" type="email" name="email" id={emailInputId} />
        </>
    )
}