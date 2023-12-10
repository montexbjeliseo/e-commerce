import { useId } from "react";

export const UsernameInput = () => {

    const usernameInputId = useId();

    return (
        <>
            <label htmlFor={usernameInputId}>Username</label>
            <input className="text-input" placeholder="Username" type="text" name="username" id={usernameInputId} />
        </>
    )
}