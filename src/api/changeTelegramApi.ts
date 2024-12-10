import {useMutation} from "react-query";
import {useAuth} from "../hooks/useAuth";

const changeTelegram = async (telegram: string, token:string) => {
    const url = `${process.env.REACT_APP_API_URL}/api/profile/changetelegram`;

    const response = await fetch(url, {
        method: 'PUT',
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            telegram: telegram,
        })
    })
    const json = await response.json();

    if (!response.ok) {
        throw new Error(`Failed to fetch update telegram data, ${json.message ?? response.statusText}`);
    }

    return json
}
export const useChangeTelegram = () => {
    const {token} = useAuth()
    return useMutation((telegram:string) => changeTelegram(telegram, token))
}