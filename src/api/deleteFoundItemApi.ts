import {useMutation} from "react-query";
import {useAuth} from "../hooks/useAuth";

const deleteFoundItem = async (id: string, token:string)=>  {
    console.log(id, token)
    const url = `${process.env.REACT_APP_API_URL}/api/found/delete/${id}`

    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })

    if (!response.ok) {
        throw new Error('Failed to Delete found Item');
    }

    return response.json()
}

export const useDeleteFoundItem = () => {
    const {token} = useAuth()
    return useMutation((id: string) => deleteFoundItem(id, token))
}