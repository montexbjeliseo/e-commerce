import { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthProvider";
import { RegisterForm } from "../../../shared/components/RegisterForm"
import { APP_ROUTES, ERROR } from "../../../constants";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../../shared/components/Loading";
import { FullContainer } from "../../../shared/components/FullContainer";
import { FormContainer } from "../FormContainer";
import { Overlay } from "../../../shared/components/Overlay";
import { DangerText } from "../../../shared/components/DangerText";

export const RegisterPage = () => {

    const [isLoading, setIsLoading] = useState(false);

    const [isError, setIsError] = useState(false);

    const [error, setError] = useState("");

    const { isAuthenticated, register, login } = useAuth();

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

        register(name, email, password, () => {
            login(email, password, () => {
                navigate(APP_ROUTES.HOME);
                setIsLoading(false);
            }, handleError);
        }, handleError)
    }

    useEffect(() => {

        if (isAuthenticated) {
            navigate(APP_ROUTES.HOME);
        }

    }, []);

    return (
        <FullContainer>
            <FormContainer>
                <h2>Complete the form and Join us!</h2>
                <DangerText>{isError && `${error}`}</DangerText>
                <RegisterForm handleFormSubmit={handleRegisterFormSubmit} />
                <Overlay active={isLoading}>
                    <Loading />
                </Overlay>
            </FormContainer>
        </FullContainer>
    )
}