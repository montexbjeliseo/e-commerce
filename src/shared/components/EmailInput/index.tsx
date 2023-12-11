import { useId } from "react";

export const EmailInput = () => {

    const emailInputId = useId();

    return (
        <>
            <label htmlFor={emailInputId}>Email</label>
            <input required={true} className="text-input" placeholder="Email" type="email" name="email" id={emailInputId} />
        </>
    )
}