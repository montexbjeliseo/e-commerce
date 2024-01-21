import { PasswordInput } from "../PasswordInput";
import { EmailInput } from "../EmailInput";
import { Button } from "../Button";
import { StyledForm } from "../StyledForm";


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
        <StyledForm onSubmit={handleSubmit}>
            <h3>Login with email</h3>
            <EmailInput />
            <PasswordInput />
            {/* <div className="form-options">
                <div>
                    <input type="checkbox" name="" id="" /> Remember me
                </div>
                <div>
                    <a href="#">Forgot password?</a>
                </div>
            </div> */}
            <Button type="submit">Login</Button>
        </StyledForm>
    )
}