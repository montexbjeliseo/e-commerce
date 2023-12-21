import { useAuth } from "../../contexts/AuthProvider";

type Props = {
    children: React.ReactNode
}

export const AdminComponent: React.FC<Props> = ({ children }) => {

    const { isAdmin } = useAuth();

    return isAdmin ? children : null
}