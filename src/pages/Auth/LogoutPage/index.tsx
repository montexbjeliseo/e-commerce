import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthProvider";
import styled from "styled-components";
import { APP_ROUTES } from "../../../constants";
import { useEffect } from "react";

const ButtonsContainer = styled.div`
    display: flex;
    gap: 10px;
    padding: 10px 0;
`

export const LogoutPage = () => {
    const auth = useAuth();

    const navigate = useNavigate();

    const handleClickLogout = () => {
        auth.logout();
        navigate(APP_ROUTES.HOME);
    }

    useEffect(() => {
        if(!auth.isAuthenticated()){
            navigate(APP_ROUTES.HOME);
        }
    }, []);

    return (
        <div className="container">
            <h1 className="title">Logout</h1>
            <p>Are you sure you want to logout?</p>
            <ButtonsContainer>
                <button className="btn btn-primary " onClick={handleClickLogout}>Confirm Logout</button>
                <button className="btn btn-primary " onClick={() => navigate(-1)}>Cancel</button>
            </ButtonsContainer>
        </div>
    )
}