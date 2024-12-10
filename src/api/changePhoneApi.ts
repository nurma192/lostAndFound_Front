import {useMutation} from "react-query";
import {useAuth} from "../hooks/useAuth";

const changePhone = async (phoneNumber: string, token: string) => {
    const url = `${process.env.REACT_APP_API_URL}/api/profile/changephone`;

    const response = await fetch(url, {
        method: 'PUT',
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            phone: phoneNumber,
        })
    })
    const json = await response.json();

    if (!response.ok) {
        throw new Error(`Failed to fetch update phone data, ${json.message ?? response.statusText}`);
    }

    return json
}
export const useChangePhone = () => {
    const {token} = useAuth()
    return useMutation((phone: string) => changePhone(phone, token))
}