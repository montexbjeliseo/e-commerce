import { createContext, useContext } from "react";
import { login as request_login, register as request_register } from "../../api";
import { AUTH_LOCAL_STORAGE, ERROR } from "../../constants";

type AuthContextType = {
    isAuthenticated: () => boolean,
    getAccessToken: () => string,
    login: (email: string, password: string, next: () => void, error: (error: any) => void) => void,
    register: (name: string, email: string, password: string, next: () => void, error: (error: any) => void) => void,
    logout: () => void
}

const AuthContext: React.Context<AuthContextType> = createContext({} as AuthContextType);

type AuthProviderProps = {
    children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

    const getAccessToken = () => {
        return localStorage.getItem(AUTH_LOCAL_STORAGE.ACCESS_TOKEN) || "";
    }

    const isAuthenticated = () => {
        return getAccessToken() !== "";
    }

    const login = (email: string, password: string, next: () => void, error: (error: any) => void) => {
        request_login(email, password).then((response) => {
            if (response.statusCode >= 400) {
                error(response);
            } else {
                localStorage.setItem(AUTH_LOCAL_STORAGE.ACCESS_TOKEN, response.access_token);
                next();
            }
        }).catch(() => {
            error(ERROR.NETWORK_ERROR);
        })
    }

    const register = (name: string, email: string, password: string, next: () => void, error: (error: any) => void) => {
        request_register(name, email, password).then((response) => {
            if (response.statusCode >= 400) {
                error(response);
            } else {
                next();
            }
        }).catch(() => {
            error(ERROR.NETWORK_ERROR);
        })
    }

    const logout = () => {
        localStorage.removeItem(AUTH_LOCAL_STORAGE.ACCESS_TOKEN);
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, getAccessToken, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
}