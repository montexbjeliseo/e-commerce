import { Link, useNavigate } from "react-router-dom"
import { LoginForm } from "../../../shared/components/LoginForm"
import "./styles.css"
import { Loading } from "../../../shared/components/Loading"
import { useEffect, useState } from "react"
import { useAuth } from "../../../contexts/AuthProvider"
import { ERROR } from "../../../constants"

export const LoginPage = () => {

    // !May be better to use reducer here

    const [isLoading, setIsLoading] = useState(false);

    const [isError, setIsError] = useState(false);

    const [error, setError] = useState("");

    const navigate = useNavigate();

    const auth = useAuth();

    const handleLoginFormSubmit = (email: string, password: string) => {

        setIsLoading(true);
        setIsError(false);
        setError("");

        auth.login(email, password, () => {
            navigate("/");
            setIsLoading(false);
        }, (error) => {
            if (error === ERROR.NETWORK_ERROR) {
                setIsError(true);
                setError("Network error");
            } else {
                setIsError(true);
                setError("Email or password wrong");
            }
            setIsLoading(false);
        });
    }

    useEffect(() => {
        if (auth.isAuthenticated) {
            navigate("/");
        }
    }, []);

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