import { useId } from "react";

export const PasswordInput = () => {

    const passwordInputId = useId();

    return (
        <>
            <label htmlFor={passwordInputId}>Password</label>
            <input required={true} className="text-input" type="password" placeholder="Password" name="password" id={passwordInputId} />
        </>
    )
}