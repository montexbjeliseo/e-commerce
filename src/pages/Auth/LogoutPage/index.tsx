import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthProvider";
import styled from "styled-components";
import { APP_ROUTES } from "../../../constants";

const Box = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: auto;
    max-width: 400px;
    text-align: center;
    items-align: center;
    gap: 18px;
`;

const ButtonsContainer = styled.div`
    display: flex;
    gap: 10px;
    padding: 10px 0;
    justify-content: center;
`

export const LogoutPage = () => {
    const { logout } = useAuth();

    const navigate = useNavigate();

    const handleClickLogout = () => {
        logout();
        navigate(APP_ROUTES.HOME);
    }

    return (
        <div className="container">
            <Box>
                <h1 className="title">Logout</h1>
                <p>Are you sure you want to logout?</p>
                <ButtonsContainer>
                    <button className="btn btn-primary " onClick={handleClickLogout}>Confirm Logout</button>
                    <button className="btn btn-primary " onClick={() => navigate(-1)}>Cancel</button>
                </ButtonsContainer>
            </Box>
        </div>
    )
}