import Cookies from 'js-cookie';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

type AuthGuardType = {
    isAuth: boolean;
    login: (token: string) => void;
    user: (user: any) => void;
    logout: () => void;
};

const AuthGuard = createContext<AuthGuardType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuth, setIsAuth] = useState<boolean>(false);

    useEffect(() => {
        const cookie = Cookies.get('auth_token');
        if (cookie) {
            setIsAuth(true);
        }
    }, []);

    const login = (token: string) => {
        Cookies.set('auth_token', token, { expires: 0.25 }); // 6 hours = 0.25 days
        (Cookies.get('auth_token') !== "") ? setIsAuth(true) : setIsAuth(false)
    };

    const user = (user: string) => {
        Cookies.set('auth_user', user, { expires: 0.25 });
    }

    const logout = () => {
        // Remove the cookie when the user logs out
        Cookies.remove('auth_token');
        setIsAuth(false);
    };

    return (
        <AuthGuard.Provider value={{ isAuth, login, logout, user }}>
            {children}
        </AuthGuard.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthGuard);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};
