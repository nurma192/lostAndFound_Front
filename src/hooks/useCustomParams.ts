import {useSearchParams} from "react-router-dom";
import { RangeValue} from "@nextui-org/react";
import {DateValue} from "@internationalized/date";

export const useCustomParams = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    function getQueryFromParam(): string {
        const query = searchParams.get('query');
        return query ? query : '';
    }

    function getPageFromParam(): number {
        const page = Number(searchParams.get("page"));
        return page ? page : 1;
    }

    function setPageToParam(page: number) {
        const currentParams = new URLSearchParams(searchParams);
        currentParams.set('page', page.toString());
        setSearchParams(currentParams);
    }

    function getTypeFromParam(): ('lost' | 'found') {
        const type = searchParams.get("type");
        return (type === 'lost' || type === 'found') ? type : 'lost';
    }

    function setTypeToParam(type: ('lost' | 'found')) {
        const currentParams = new URLSearchParams(searchParams);
        currentParams.set('type', type);
        setSearchParams(currentParams);
    }

    function setQueryToParam(query: string) {
        const currentParams = new URLSearchParams(searchParams);
        currentParams.set('query', query.toString());
        setSearchParams(currentParams);
    }

    function getCategoryFromParam(): string {
        const category = searchParams.get("category");
        return category ? category : '';
    }

    const setCategoryToParam = (id: string | null) => {
        const currentParams = new URLSearchParams(searchParams);

        if (id === null || currentParams.get("category") === id) {
            currentParams.delete("category");
        } else {
            currentParams.set("category", id);
        }

        setSearchParams(currentParams);
    }

    const setDateRangeToParam = (dateRange: RangeValue<DateValue>) => {
        const currentParams = new URLSearchParams(searchParams);
        const startDate = `${dateRange.start.year}-${String(dateRange.start.month).padStart(2, '0')}-${String(dateRange.start.day).padStart(2, '0')}`;
        const endDate = `${dateRange.end.year}-${String(dateRange.end.month).padStart(2, '0')}-${String(dateRange.end.day).padStart(2, '0')}`;
        currentParams.set('startDate', startDate);
        currentParams.set('endDate', endDate);
        setSearchParams(currentParams);
    }

    const getStartDateFromParam = (): string => {
        const startDate = searchParams.get('startDate');
        return startDate ? startDate : '';
    }
    const setStartDateToParam = (date: DateValue) => {
        const currentParams = new URLSearchParams(searchParams);
        const startDate = `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;
        currentParams.set('startDate', startDate);
        setSearchParams(currentParams);
    }
    const getEndDateFromParam = (): string => {
        const endDate = searchParams.get('endDate');
        return endDate ? endDate : '';
    }
    const setEndDateToParam = (date: DateValue) => {
        const currentParams = new URLSearchParams(searchParams);
        const endDate = `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;
        currentParams.set('endDate', endDate);
        setSearchParams(currentParams);
    }
    const getSortTypeFromParam = (): ('desc' | 'asc') => {
        const sortType = searchParams.get('sort');
        if(sortType === 'desc' || sortType === 'asc'){
            return sortType
        }
        return 'desc'
    }
    const setSortTypeToParam = (sortType: ('desc' | 'asc')) => {
        const currentParams = new URLSearchParams(searchParams);
        currentParams.set('sort', sortType);
        setSearchParams(currentParams);
    }



    const resetAllParams = () => {
        setSearchParams({});
    }

    return {
        searchParams,
        getCategoryFromParam,
        getQueryFromParam,
        getPageFromParam,
        setSearchParams,
        setPageToParam,
        setCategoryToParam,
        setQueryToParam,
        resetAllParams,
        getTypeFromParam,
        setTypeToParam,
        getStartDateFromParam,
        setStartDateToParam,
        getEndDateFromParam,
        setEndDateToParam,
        setDateRangeToParam,
        getSortTypeFromParam,
        setSortTypeToParam
    }
}