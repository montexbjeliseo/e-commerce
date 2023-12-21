import { createContext, useContext, useEffect, useState } from "react";
import { validateToken as requestValidateToken, login as requestLogin, register as requestRegister } from "../../api";
import { AUTH_LOCAL_STORAGE, ERROR } from "../../constants";

type AuthContextType = {
    isAuthenticated: boolean,
    accessToken: string,
    login: (email: string, password: string, next: () => void, error: (error: any) => void) => void,
    register: (name: string, email: string, password: string, next: () => void, error: (error: any) => void) => void,
    logout: () => void,
    loginAsAdmin: (pin: string) => void,
    isAdmin: boolean
}

const AuthContext: React.Context<AuthContextType> = createContext({} as AuthContextType);

type AuthProviderProps = {
    children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

    const [accessToken, setAccessToken] = useState('');

    const [isAuthenticated, setAuthenticated] = useState(false);

    const [isAdmin, setIsAdmin] = useState(false);

    const saveToken = (token: string) => {
        localStorage.setItem(AUTH_LOCAL_STORAGE.ACCESS_TOKEN, token);
    }

    const getAccessToken = () => {
        return localStorage.getItem(AUTH_LOCAL_STORAGE.ACCESS_TOKEN) || "";
    }

    const clearAccessToken = () => {
        localStorage.removeItem(AUTH_LOCAL_STORAGE.ACCESS_TOKEN);
    }

    const loginAsAdmin = (pin: string) => {
        const ADMIN_PIN = import.meta.env.VITE_ADMIN_PIN;
        setIsAdmin(pin === ADMIN_PIN as string);
    }

    const login = (email: string, password: string, next: () => void, error: (error: any) => void) => {
        requestLogin(email, password).then((response) => {
            if (response.statusCode >= 400) {
                error(response);
            } else {
                saveToken(response.access_token);
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
        setIsAdmin(false);
    }

    const readAndCheckTokenFromLocalStorage = async () => {
        const token = getAccessToken();
        requestValidateToken(token).then(() => {
            setAuthenticated(true);
            setAccessToken(token);
        }).catch(() => {
            clearAccessToken();
            new Error("Could not refresh token, network error");
        });
    }

    useEffect(() => {
        readAndCheckTokenFromLocalStorage();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout, accessToken, register, loginAsAdmin }}>
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