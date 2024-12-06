import {QueryClient} from "react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5 минут
            cacheTime: 1000 * 60 * 10, // 10 минут
            refetchOnWindowFocus: false, // Не перезапрашивать при фокусе на окне
            refetchOnReconnect: false, // Не перезапрашивать при восстановлении соединения
            retry: 0,
        },
    },
})

export default queryClient