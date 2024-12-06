import {useEffect, useState} from "react";

export const useAuth = () => {
    const [token, setToken] = useState<string>('');

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken);
        }
    }, []);

    const login = (newToken: string) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
    }

    const logout = () => {
        localStorage.removeItem('token');
        setToken('');
    }


    return {
        token,
        login,
        logout,
        isAuthenticated: !!token,
    }
}