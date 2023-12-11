import { PasswordInput } from "../PasswordInput";
import { EmailInput } from "../EmailInput";
import "./styles.css";

type LoginFormProps = {
    handleFormSubmit?: (email: string, password: string) => void
}

export const LoginForm: React.FC<LoginFormProps> = ({ handleFormSubmit }) => {

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.target as HTMLFormElement));
        if(handleFormSubmit) {
            handleFormSubmit(formData['email'] as string, formData['password'] as string);
        }
    }

    return (
        <form className="form login-form" onSubmit={handleSubmit}>
            <p className="form-title">Login with email</p>
            <EmailInput />
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