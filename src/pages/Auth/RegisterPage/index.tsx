import { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthProvider";
import { RegisterForm } from "../../../shared/components/RegisterForm"
import { ERROR } from "../../../constants";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../../shared/components/Loading";

export const RegisterPage = () => {

    const [ isLoading, setIsLoading ] = useState(false);

    const [ isError, setIsError ] = useState(false);

    const [ error, setError ] = useState("");

    const auth = useAuth();

    const navigate = useNavigate();

    const handleRegisterFormSubmit = (name: string, email: string, password: string) => {

        setIsLoading(true);
        setIsError(false);
        setError("");

        const handleError = (error: any) => {

            if (error === ERROR.NETWORK_ERROR) {
                setError("Network error");
            } else {
                setError(error.message);
            }
            setIsLoading(false);
            setIsError(true);
        }

        auth.register(name, email, password, () => {
            auth.login(email, password, () => {
                navigate("/");
                setIsLoading(false);
            }, handleError);
        }, handleError)
    }

    useEffect(() => {

        if (auth.isAuthenticated) {
            navigate("/");
        }

    }, []);

    return (
        <div className="container">
            <div className="form-container login-container">
                <h1 className="title center">Complete the form and Join us!</h1>
                <p className="error-message">{isError && `${error}`}</p>
                <RegisterForm handleFormSubmit={handleRegisterFormSubmit} />
                <div className={`loader-overlay ${isLoading ? 'active' : ''}`}>
                    <Loading />
                </div>
            </div>
        </div>
    )
}