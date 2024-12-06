import {useQuery} from 'react-query';
import {User} from "../types/userTypes";
import {useNavigate} from "react-router-dom";

export const getUserData = async (token: string): Promise<User> => {
    if (!token) {
        throw new Error('token is required');
    }
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/profile`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        if (response.status === 401) {
            localStorage.removeItem('token');
            throw new Error(response.status.toString());
        }
        throw new Error('Failed to fetch user data');
    }

    return response.json();
};

export const useUserData = (token: string) => {
    const navigate = useNavigate();
    return useQuery<User>('userData', () => getUserData(token), {
        enabled: !!token,
        onError: (err: any) => {
            if (err.message === '401') {
                navigate('/login');
            }
        }
    });
};
