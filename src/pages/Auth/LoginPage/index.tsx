import { Link, useLocation, useNavigate } from "react-router-dom"
import { LoginForm } from "../../../shared/components/LoginForm"
import { Loading } from "../../../shared/components/Loading"
import { useEffect, useState } from "react"
import { useAuth } from "../../../contexts/AuthProvider"
import { APP_ROUTES, ERROR } from "../../../constants"
import { FullContainer } from "../../../shared/components/FullContainer"
import { Overlay } from "../../../shared/components/Overlay"
import { FormContainer } from "../FormContainer"
import styled from "styled-components"
import { DangerText } from "../../../shared/components/DangerText"

const DontHaveAnAccountText = styled.p`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    margin-top: 30px;
    color: #A9ABBD;

    a {
        text-decoration: none;
        color: #A9ABBD;
        font-weight: bold;
    }
`;

export const LoginPage = () => {

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
        <FullContainer>
            <FormContainer>
                <h2>Welcome back!</h2>
                <DangerText>
                    {isError ? `${error}` : ""}
                </DangerText>
                <LoginForm handleFormSubmit={handleLoginFormSubmit} />
                <Overlay active={isLoading}>
                    <Loading />
                </Overlay>
            </FormContainer>

            <DontHaveAnAccountText>Don't have an account?
                <Link to={APP_ROUTES.REGISTER}>Register</Link>
            </DontHaveAnAccountText>

        </FullContainer>
    )
}