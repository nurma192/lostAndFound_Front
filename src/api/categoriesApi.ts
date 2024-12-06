import {useQuery} from "react-query";
import {Categories} from "../types/categories";
import {useCustomParams} from "../hooks/useCustomParams";

export const getCategories = async (query: string = ''): Promise<Categories[]> => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/categories${!!query ? '?query='+query : ''}`);

    if (!response.ok) {
        throw new Error('Failed to fetch Categories data');
    }

    return response.json();
}

export const useCategoriesData = () => {
    const customParams = useCustomParams()
    return useQuery<Categories[]>('categories', () => getCategories(customParams.getQueryFromParam()));
};
