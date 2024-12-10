import React, {useEffect} from 'react';
import {useFoundItems} from "../api/foundItemsApi";
import {ItemCard, SkeletonCard} from "./ItemCard";
import {useCustomParams} from "../hooks/useCustomParams";
import {Pagination} from "@nextui-org/react";
import ShowItemsGrid from "./ShowItemsGrid";

function FoundItems() {
    const customParams = useCustomParams();
    const {data, error, isLoading, isSuccess, isFetching, refetch} = useFoundItems()


    useEffect(() => {
        refetch().catch(error => {
            console.log(error);
        })
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
            {isSuccess && data.foundItems.length === 0 && <h3>No items on this Category</h3>}
            {isSuccess && <ShowItemsGrid items={data.foundItems} type={'found'}/>}
            {isSuccess && <Pagination showControls
			                          total={data.totalPages}
			                          initialPage={data.page}
			                          onChange={(e) => {
                                          customParams.setPageToParam(e)
                                      }}/>}
        </div>
    )
        ;
}

export default FoundItems;
