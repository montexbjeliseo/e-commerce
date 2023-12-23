import { Link, useLocation, useNavigate } from "react-router-dom"
import { LoginForm } from "../../../shared/components/LoginForm"
import "./styles.css"
import { Loading } from "../../../shared/components/Loading"
import { useEffect, useState } from "react"
import { useAuth } from "../../../contexts/AuthProvider"
import { APP_ROUTES, ERROR } from "../../../constants"

export const LoginPage = () => {

    // !May be better to use reducer here

    const [isLoading, setIsLoading] = useState(false);

    const [isError, setIsError] = useState(false);

    const [error, setError] = useState("");

    const navigate = useNavigate();

    const location = useLocation();

    const { isAuthenticated, login } = useAuth();

    const handleLoginFormSubmit = (email: string, password: string) => {

        setIsLoading(true);
        setIsError(false);
        setError("");

        login(email, password, () => {
            navigate(location.state?.from ? location.state.from : APP_ROUTES.HOME);
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
        if (isAuthenticated) {
            navigate(APP_ROUTES.HOME);
        }
    }, [isAuthenticated, navigate]);

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
            <p className="text-create-account">Don't have an account?
                <Link to={APP_ROUTES.REGISTER}>Register</Link>
            </p>
        </div>
    )
}