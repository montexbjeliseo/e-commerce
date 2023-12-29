import { useAuth } from "../../contexts/AuthProvider"

type Props = {
    children: React.ReactNode
}

export const AuthenticatedComponentGuard: React.FC<Props> = ({ children }) => {

    const { isAuthenticated } = useAuth();

    return isAuthenticated ? children : null
}