import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";
import { APP_ROUTES } from "../../constants";

type Props = {
    children: React.ReactNode
}

export const AuthenticatedRouteGuard: React.FC<Props> = ({ children }) => {
    
    const { isAuthenticated } = useAuth();

    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to={APP_ROUTES.LOGIN} replace state={{ from: location.pathname }} />;
    }

    return isAuthenticated ? children : null;
}