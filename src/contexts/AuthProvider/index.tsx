import { createContext, useContext, useEffect, useState } from "react";
import { validateToken as requestValidateToken, login as requestLogin, register as requestRegister } from "../../api";
import { AUTH_LOCAL_STORAGE, ERROR, USER_ROLES } from "../../constants";
import { UserData } from "../../types";

type AuthContextType = {
    isAuthenticated: boolean,
    accessToken: string,
    login: (email: string, password: string, next: () => void, error: (error: any) => void) => void,
    register: (name: string, email: string, password: string, next: () => void, error: (error: any) => void) => void,
    logout: () => void,
    isAdmin: boolean,
    currentUser: UserData;
}

const AuthContext: React.Context<AuthContextType> = createContext({} as AuthContextType);

type AuthProviderProps = {
    children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

    const [accessToken, setAccessToken] = useState('');

    const [isAuthenticated, setAuthenticated] = useState(false);

    const [isAdmin, setIsAdmin] = useState(false);

    const [currentUser, setCurrentUser] = useState({} as UserData);

    const saveToken = (token: string) => {
        localStorage.setItem(AUTH_LOCAL_STORAGE.ACCESS_TOKEN, token);
    }

    const getAccessToken = () => {
        return localStorage.getItem(AUTH_LOCAL_STORAGE.ACCESS_TOKEN) || "";
    }

    const clearAccessToken = () => {
        localStorage.removeItem(AUTH_LOCAL_STORAGE.ACCESS_TOKEN);
    }

    const login = (email: string, password: string, next: () => void, error: (error: any) => void) => {
        requestLogin(email, password).then((response) => {
            if (response.statusCode >= 400) {
                error(response);
            } else {
                saveToken(response.access_token);
                setAuthenticated(true);
                checkIsAdmin(response.access_token);
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
        setCurrentUser({} as UserData);
    }

    const readStoredAccessToken = () => {
        const token = getAccessToken();
        if (token) {
            setAccessToken(token);
        }
    }

    const checkIsAdmin = (token: string) => {
        requestValidateToken(token).then((data) => {
            setCurrentUser(data);
            if (data.role === USER_ROLES.ADMIN) {
                setIsAdmin(true);
            }
        })
    }

    const validateLocalAccessToken = async () => {
        requestValidateToken(accessToken).then((data) => {
            if (data.role === USER_ROLES.ADMIN) {
                setIsAdmin(true);
            }
            setAuthenticated(true);
            setCurrentUser(data);
        }).catch(() => {
            clearAccessToken();
            new Error("Could not refresh token, network error");
        });
    }

    useEffect(() => {
        readStoredAccessToken();
    }, []);

    useEffect(() => {
        if(accessToken){
            validateLocalAccessToken();
        }
    }, [accessToken]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout, accessToken, register, currentUser }}>
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