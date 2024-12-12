import {FoundItem} from "../types/itemTypes";
import {useQuery} from "react-query";


export const getFoundItemById = async (id: string): Promise<FoundItem> => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/found/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch getFoundItemById data');
    }
    return response.json();
}

export const useGetFoundItemById = (id: string | undefined) => {
    return useQuery<FoundItem>(['item', id], () => getFoundItemById(id!), {
        enabled: !!id ,
    });
}
