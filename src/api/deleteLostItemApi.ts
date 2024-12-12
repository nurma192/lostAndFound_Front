import {useMutation} from "react-query";
import {useAuth} from "../hooks/useAuth";

const deleteLostItem = async (id: string, token:string)=>  {
    console.log(id, token)
    const url = `${process.env.REACT_APP_API_URL}/api/lost/delete/${id}`

    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })

    if (!response.ok) {
        throw new Error('Failed to Delete Item');
    }

    return response.json()
}

export const useDeleteLostItem = () => {
    const {token} = useAuth()
    return useMutation((id: string) => deleteLostItem(id, token))
}