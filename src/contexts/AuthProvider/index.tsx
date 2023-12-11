import { createContext, useContext, useEffect, useState } from "react";
import { login as request_login, register as request_register } from "../../api";
import { AUTH_LOCAL_STORAGE, ERROR } from "../../constants";

type AuthContextType = {
    isAuthenticated: boolean,
    accessToken: string,
    login: (email: string, password: string, next: () => void, error: (error: any) => void) => void,
    register: (name: string, email: string, password: string, next: () => void, error: (error: any) => void) => void,
    logout: () => void
}

const AuthContext: React.Context<AuthContextType> = createContext({} as AuthContextType);

type AuthProviderProps = {
    children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [accessToken, setAccessToken] = useState("");

    useEffect(() => {
        const localToken = localStorage.getItem(AUTH_LOCAL_STORAGE.ACCESS_TOKEN) || "";
        if (localToken !== "") {
            setIsAuthenticated(true);
            setAccessToken(localToken);
        }
        
    }, []);

    const login = (email: string, password: string, next: () => void, error: (error: any) => void) => {
        request_login(email, password).then((response) => {
            if (response.statusCode >= 400) {
                setIsAuthenticated(false);
                error(response);
            } else {
                setIsAuthenticated(true);
                setAccessToken(response.access_token);
                localStorage.setItem(AUTH_LOCAL_STORAGE.ACCESS_TOKEN, response.access_token);
                next();
            }
        }).catch(() => {
            setIsAuthenticated(false);
            error(ERROR.NETWORK_ERROR);
        })
    }

    const register = (name: string, email: string, password: string, next: () => void, error: (error: any) => void) => {
        request_register(name, email, password).then((response) => {
            if (response.statusCode >= 400) {
                setIsAuthenticated(false);
                error(response);
            } else {
                next();
            }
        }).catch(() => {
            setIsAuthenticated(false);
            error(ERROR.NETWORK_ERROR);
        })
    }

    const logout = () => {
        setIsAuthenticated(false);
        setAccessToken("");
        localStorage.removeItem(AUTH_LOCAL_STORAGE.ACCESS_TOKEN);
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, accessToken, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
}