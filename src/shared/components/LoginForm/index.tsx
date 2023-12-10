import { PasswordInput } from "../PasswordInput";
import { UsernameInput } from "../UsernameInput";
import "./styles.css";

export const LoginForm = () => {
    return (
        <form className="form login-form" action="">
            <p className="form-title">Login with username and password</p>
            <UsernameInput />
            <PasswordInput />
            <div className="form-options">
                <div>
                    <input type="checkbox" name="" id="" /> Remember me
                </div>
                <div>
                    <a href="">Forgot password?</a>
                </div>
            </div>
            <input className="btn btn-primary" type="submit" value="Login" />
        </form>
    )
}