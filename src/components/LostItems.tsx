import React, {useEffect} from 'react';
import {useLostItems} from "../api/lostItemsApi";
import {SkeletonCard, ItemCard} from "./ItemCard";
import {Pagination} from "@nextui-org/react";
import {useCustomParams} from "../hooks/useCustomParams";

function LostItems() {
    const customParams = useCustomParams()
    const {
        data,
        error,
        isLoading,
        isFetching,
        refetch,
        isSuccess
    } = useLostItems()

    useEffect(() => {
        refetch().catch(error => {
            console.log(error);})
    }, [customParams.searchParams]);

    if (isLoading || isFetching) {
        return <>
            <div className="grid grid-cols-4 gap-8 mt-5">
                {Array.from({length: 16}).map((_, index) => (
                    <SkeletonCard key={index}/>
                ))}
            </div>
        </>
    }
    if (error) return <h3>Error</h3>

    return (
        <div className={``}>
            {isSuccess && data.lostItems.length === 0 && <h3>No items on this Category</h3>}
            <div className="grid grid-cols-4 gap-8 mt-5">
                {isSuccess && data.lostItems.map((lostItem, index) => (
                    <ItemCard item={lostItem} key={index} type={"lost"}/>
                ))}
            </div>
            {isSuccess && <Pagination showControls
			                          total={data.totalPages}
			                          initialPage={data.page}
			                          onChange={(e) => {
                                          customParams.setPageToParam(e)
                                      }}/>}
        </div>
    );
}

export default LostItems;
