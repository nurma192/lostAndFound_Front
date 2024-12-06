import { LostItem} from "../types/itemTypes";
import {useQuery} from "react-query";


export const getLostItemById = async (id: string): Promise<LostItem> => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/lost/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch getItemById data');
    }
    return response.json();
}

export const useGetLostItemById = (id: string | undefined) => {
    return useQuery<LostItem>(['item', id], () => getLostItemById(id!), {
        enabled: !!id ,
    });
}
