import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthProvider";
import styled from "styled-components";
import { APP_ROUTES } from "../../../constants";
import { Button } from "../../../shared/components/Button";
import { FullContainer } from "../../../shared/components/FullContainer";

const Box = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 10px auto;
    max-width: 400px;
    text-align: center;
    items-align: center;
    gap: 18px;
    border-radius: 7px;
    border: 2px solid rgb(43, 43, 43);
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
        <FullContainer>
            <main>
                <Box>
                    <h1 className="title">Logout</h1>
                    <p>Are you sure you want to logout?</p>
                    <ButtonsContainer>
                        <Button color="danger" onClick={handleClickLogout}>Confirm Logout</Button>
                        <Button onClick={() => navigate(-1)}>Cancel</Button>
                    </ButtonsContainer>
                </Box>
            </main>
        </FullContainer>
    )
}