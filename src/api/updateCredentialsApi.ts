import {useAuth} from "../hooks/useAuth";
import {useMutation} from "react-query";

export type UpdateCredentialsBody = {
    name: string,
    surname: string
}

const updateCredentials = async (data: UpdateCredentialsBody,token: string):Promise<any> => {
    const url = `${process.env.REACT_APP_API_URL}/api/profile/changecredentials`;

    const response = await fetch(url, {
        method: 'PUT',
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            name: data.name,
            surname: data.surname,
        })
    })
    const json = await response.json();

    if (!response.ok) {
        throw new Error(`Failed to fetch update Credentials data ${json.message ?? response.statusText}`);
    }

    return json

}

export const useUpdateCredentials = () => {
    const {token} = useAuth()

    return useMutation((data: UpdateCredentialsBody) => updateCredentials(data,  token))
}