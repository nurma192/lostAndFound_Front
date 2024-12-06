import {useSearchParams} from "react-router-dom";

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
        setTypeToParam
    }
}