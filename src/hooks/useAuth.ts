import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export const useAuth = () => {
    const [token, setToken] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken);
        }
    }, []);

    const login = (newToken: string) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
        navigate('/')
    }

    const logout = () => {
        localStorage.removeItem('token');
        setToken('');
        navigate('/login')
    }


    return {
        token,
        login,
        logout,
        isAuthenticated: !!token,
    }
}