import { Link } from "react-router-dom"
import { LoginForm } from "../../../shared/components/LoginForm"
import "./styles.css"
import { Loading } from "../../../shared/components/Loading"
import { useState } from "react"
import { login } from "../../../api"

export const LoginPage = () => {

    const [ isLoading, setIsLoading ] = useState(false);

    const [ isError, setIsError ] = useState(false);

    const [ error, setError ] = useState("");

    const handleLoginFormSubmit = (email: string, password: string) => {

        setIsLoading(true);
        setIsError(false);
        setError("");
        login(email, password).then((response) => {
            if(response.statusCode >= 400) {
                console.log("Login error", response)
                setIsError(true);
                setError("Email or password wrong");
            } else {
                console.log("Login success", response)
            }
        }).catch(() => {
            console.log("Network error")
            setIsError(true);
            setError("Network error");
        }).finally(() => {
            setIsLoading(false);
        })
    }

    return (
        <div className="container">
            <div className="form-container login-container">
                <h1 className="title center">Welcome back!</h1>
                <div className="error-message">
                    {isError ? `${error}` : ""}
                </div>
                <LoginForm handleFormSubmit={handleLoginFormSubmit} />
                <div className={`loader-overlay ${isLoading ? 'active' : ''}`}>
                <Loading />
            </div>
            </div>
            <p className="text-create-account">Don't have an account? <Link to="/register">Register</Link></p>
            
        </div>

    )
}