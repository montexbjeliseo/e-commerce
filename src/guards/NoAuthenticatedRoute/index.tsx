import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../constants";

type Props = {
    children: React.ReactNode
}

export const NoAuthenticatedRouteGuard: React.FC<Props> = ({ children }) => {

    const { isAuthenticated } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate(APP_ROUTES.HOME);
        }
    }, [isAuthenticated, navigate]);

    return !isAuthenticated ? children : null
}