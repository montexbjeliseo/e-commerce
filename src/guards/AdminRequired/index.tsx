import styled from "styled-components";
import { APP_ROUTES } from "../../constants";
import { useAuth } from "../../contexts/AuthProvider"

const Main = styled.main`
    padding: 3rem;
    text-align: center;
    font-size: 1.5rem;
`;

type Props = {
    children: React.ReactNode
}

export const AdminRequired: React.FC<Props> = ({ children }) => {

    const { isAdmin } = useAuth();

    if (!isAdmin) {
        return (
            <Main>
                <h1>Unauthorized</h1>
                <p>You are not authorized to view this page</p>
                <p>Go back to <a href={APP_ROUTES.HOME}>Home</a></p>
            </Main>
        )
    }

    return isAdmin ? children : null
}