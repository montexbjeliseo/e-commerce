import { RegisterForm } from "../../../shared/components/RegisterForm"

export const RegisterPage = () => {

    const handleRegisterFormSubmit = (name: string, email: string, password: string) => {

        console.log(name, email, password)
    }

    return (
        <div className="container">
            <div className="form-container login-container">
                <h1 className="title center">Complete the form and Join us!</h1>
                <RegisterForm handleFormSubmit={handleRegisterFormSubmit} />
            </div>
        </div>
    )
}