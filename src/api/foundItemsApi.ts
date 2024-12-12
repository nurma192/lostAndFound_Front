import {useQuery} from 'react-query';
import {Item} from "../types/itemTypes";
import {useCustomParams} from "../hooks/useCustomParams";

export interface FoundItemsRequest {
    foundItems: Item[],
    page: number;
    totalItems: number;
    totalPages: number;
}

export const getFoundItems = async (category: string = '', query: string = '', page: number = -1, startDate: string, endDate: string, sortType: string): Promise<FoundItemsRequest> => {
    const url = new URL(`${process.env.REACT_APP_API_URL}/api/found`);
    const params = new URLSearchParams();

    if (category) params.append('categoryId', category);
    if (sortType) params.append('sort', sortType);
    if (query) params.append('query', query);
    if (page > 0) params.append('page', page.toString());
    if (startDate !== '') {
        params.set('dateFrom', startDate);
    }
    if (endDate !== '') {
        params.set('dateTo', endDate);
    }
    url.search = params.toString();

    const response = await fetch(url.toString());


    if (!response.ok) {
        throw new Error('Failed to fetch getFoundItems');
    }

    return response.json();
};

export const useFoundItems = () => {
    const customParams = useCustomParams()

    return useQuery<FoundItemsRequest>('foundItems', () => getFoundItems(customParams.getCategoryFromParam(), customParams.getQueryFromParam(), customParams.getPageFromParam(), customParams.getStartDateFromParam(), customParams.getEndDateFromParam(), customParams.getSortTypeFromParam()));
};
