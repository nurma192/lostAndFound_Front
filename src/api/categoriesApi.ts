import {useQuery} from "react-query";
import {Categories} from "../types/categories";
import {useCustomParams} from "../hooks/useCustomParams";

export const getCategories = async (query: string = '', startDate: string, endDate: string): Promise<Categories[]> => {
    const url = new URL(`${process.env.REACT_APP_API_URL}/api/categories`);

    const params = new URLSearchParams();
    if (query) params.append('query', query);

    if (startDate !== '') {
        params.set('dateFrom', startDate);
    }
    if (endDate !== '') {
        params.set('dateTo', endDate);
    }

    url.search = params.toString();

    const response = await fetch(url.toString());

    if (!response.ok) {
        throw new Error('Failed to fetch Categories data');
    }

    return response.json();
}

export const useCategoriesData = () => {
    const customParams = useCustomParams()
    return useQuery<Categories[]>('categories', () => getCategories(customParams.getQueryFromParam(),customParams.getStartDateFromParam(), customParams.getEndDateFromParam()));
};
