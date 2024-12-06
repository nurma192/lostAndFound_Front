import React, {useEffect} from 'react';
import {useCategoriesData} from "../api/categoriesApi";
import {Skeleton} from "@nextui-org/react";
import {useCustomParams} from "../hooks/useCustomParams";
import {Categories} from "../types/categories";


interface Props {
    pageNameState: ('lost' | 'found');
    setItemsCount: (count: { lostItemsCount: number, foundItemsCount: number }) => void;
}

function CategoriesList({pageNameState, setItemsCount}: Props) {
    const {data, error, isLoading, isFetching, isSuccess, refetch} = useCategoriesData();
    const customParams = useCustomParams()

    const changeCategory = (categoryId: string) => {
        const currentParams = new URLSearchParams(customParams.searchParams);
        if (customParams.getCategoryFromParam() === categoryId) {
            currentParams.delete('category');
            currentParams.delete('page');
        } else {
            currentParams.set('category', categoryId);
            currentParams.delete('page');
        }
        customParams.setSearchParams(currentParams);
    }
    const calculateItemsCount = () => {
        if (isSuccess) {
            let lostCount = 0
            let foundCount = 0
            data.forEach((item: Categories) => {
                lostCount += item.lostItemsCount
                foundCount += item.foundItemsCount
            })
            setItemsCount({
                lostItemsCount: lostCount,
                foundItemsCount: foundCount
            })
        }
    }
    useEffect(() => {
        if (isSuccess || isFetching || isLoading) {
            calculateItemsCount();
        }
    }, [data, isSuccess, isFetching, isLoading]);

    useEffect(() => {
        refetch().catch(error => {
            console.log(error)
        })
    }, [customParams.searchParams, pageNameState]);

    return (
        <div className="flex flex-col">
            <h3 className="font-bold text-lg text-neutral-700">Categories</h3>
            <div className="flex flex-col justify-start gap-2 ml-4 mt-2">
                <>
                    {(isLoading || isFetching) &&
						<>
                            {Array.from({length: 4}).map((_, index) => (
                                <Skeleton key={index} className="rounded-lg">
                                    <div className="h-8 rounded-lg bg-default-300"></div>
                                </Skeleton>
                            ))}
						</>
                    }
                    {error && <h3>Error when get Categories</h3>}
                    {isSuccess && !isFetching && data.map(category => (
                        <div
                            className={`cursor-pointer flex justify-between ${customParams.getCategoryFromParam() === category.id && 'text-blue-500 font-bold'}`}
                            onClick={() => changeCategory(category.id)}
                            key={category.id}>
                            <p>{category.name}</p>
                            {pageNameState === 'lost' && <p>({category.lostItemsCount})</p>}
                            {pageNameState === 'found' && <p>({category.foundItemsCount})</p>}
                        </div>
                    ))}
                </>
            </div>
        </div>
    );
}

export default CategoriesList;
