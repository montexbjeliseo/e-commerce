import { useId } from "react";
import { InputText } from "../InputText";

export const PasswordInput = () => {

    const passwordInputId = useId();

    return (
        <>
            <label htmlFor={passwordInputId}>Password</label>
            <InputText required={true} className="text-input" type="password" placeholder="Password" name="password" id={passwordInputId} />
        </>
    )
}