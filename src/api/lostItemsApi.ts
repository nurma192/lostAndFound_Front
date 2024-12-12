import {useQuery} from 'react-query';
import {Item} from "../types/itemTypes";
import {useCustomParams} from "../hooks/useCustomParams";

export interface LostItemsRequest {
    lostItems: Item[],
    page: number;
    totalItems: number;
    totalPages: number;
}

const getLostItems = async (category: string = '', query: string = '', page: number = -1, startDate: string, endDate: string, sortType: ('desc' | 'asc')): Promise<LostItemsRequest> => {
    const url = new URL(`${process.env.REACT_APP_API_URL}/api/lost`);
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
        throw new Error('Failed to fetch getLostItems');
    }

    return response.json();
};


export const useSearchLostItems = () => {
    const customParams = useCustomParams()

    return useQuery<LostItemsRequest>('lostItems', () => getLostItems(customParams.getCategoryFromParam(), customParams.getQueryFromParam(), customParams.getPageFromParam(), customParams.getStartDateFromParam(), customParams.getEndDateFromParam(), customParams.getSortTypeFromParam()));
};
