import { useAuth } from "../../contexts/AuthProvider";

type Props = {
    children: React.ReactNode
}

export const NoAuthenticatedComponentGuard: React.FC<Props> = ({ children }) => {

    const { isAuthenticated } = useAuth();
 
    return isAuthenticated ? null : children
}