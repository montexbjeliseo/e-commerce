import { LoginForm } from "../../../shared/components/LoginForm"
import "./styles.css"

export const LoginPage = () => {
    return (
        <div className="container">
            <div className="form-container">
                <h1 className="title center">Welcome back!</h1>
                <LoginForm />
            </div>
        </div>
    )
}