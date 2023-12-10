import { useId } from "react";

export const PasswordInput = () => {

    const passwordInputId = useId();

    return (
        <>
            <label htmlFor={passwordInputId}>Password</label>
            <input className="text-input" type="password" placeholder="Password" name="password" id={passwordInputId} />
        </>
    )
}