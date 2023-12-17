import { createContext, useContext, useState } from "react";
import { validateToken as requestValidateToken, login as requestLogin, register as requestRegister } from "../../api";
import { AUTH_LOCAL_STORAGE, ERROR } from "../../constants";

type AuthContextType = {
    isAuthenticated: boolean,
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

    const validateToken = (oldToken: string) => {
        requestValidateToken(oldToken).then((response) => {
            if (response.statusCode >= 400) {
                console.log("Could not refresh token", oldToken);
                logout();
            }
        }).catch(() => {
            console.log("Could not refresh token, network error");
        })
    }

    const getAccessToken = () => {
        let token = localStorage.getItem(AUTH_LOCAL_STORAGE.ACCESS_TOKEN) || "";
        if (token) {
            validateToken(token);
            token = localStorage.getItem(AUTH_LOCAL_STORAGE.ACCESS_TOKEN) || "";
        }
        return token;
    }

    const [isAuthenticated, setAuthenticated] = useState(getAccessToken() ? true : false);

    const login = (email: string, password: string, next: () => void, error: (error: any) => void) => {
        requestLogin(email, password).then((response) => {
            if (response.statusCode >= 400) {
                error(response);
            } else {
                localStorage.setItem(AUTH_LOCAL_STORAGE.ACCESS_TOKEN, response.access_token);
                setAuthenticated(true);
                next();
            }
        }).catch(() => {
            error(ERROR.NETWORK_ERROR);
        })
    }

    const register = (name: string, email: string, password: string, next: () => void, error: (error: any) => void) => {
        requestRegister(name, email, password).then((response) => {
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
        setAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, getAccessToken, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}