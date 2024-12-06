import React, {useEffect, useState} from 'react';
import LostItems from "../components/LostItems";
import FoundItems from "../components/FoundItems";
import CategoriesList from "../components/CategoriesList";
import {useCustomParams} from "../hooks/useCustomParams";
import {useLostItems} from "../api/lostItemsApi";
import {useFoundItems} from "../api/foundItemsApi";

function HomePage() {
    const customParams = useCustomParams()
    const [subPage, setSubPage] = useState<('lost' | 'found')>(customParams.getTypeFromParam()) // lost || found
    const [itemsCount, setItemsCount] = useState({
        lostItemsCount: 0,
        foundItemsCount: 0,
    })

    const handleSetSubPage = (pageName: ('lost' | 'found')) => {
        const currentParams = new URLSearchParams(customParams.searchParams);
        currentParams.set('type', pageName);
        currentParams.delete('category');
        currentParams.delete('page');
        customParams.setSearchParams(currentParams);
    }

    useEffect(() => {
        setSubPage(customParams.getTypeFromParam())
    }, [customParams.searchParams])

    return (
        <>
            <div className=" w-full flex items-start">
                <div className="w-1/5 px-5">
                    {<CategoriesList pageNameState={subPage} setItemsCount={setItemsCount}/>}

                </div>
                <div className="w-4/5 pl-8 flex flex-col">
                    <div className="flex justify-between">
                        <div className="flex gap-2">
                            <button className="px-2 py-2 " onClick={() => handleSetSubPage("lost")}>
                                <h3 className={`border-b-3 flex items-center gap-1 px-1 ${subPage === 'lost' ? 'border-blue-500 text-blue-500 font-bold' : 'border-white'}`}>
                                    Lost Items
                                    <span className="bg-primary text-sm text-white px-1.5 rounded-2xl flex justify-center items-center">{itemsCount.lostItemsCount}</span>
                                </h3>

                            </button>
                            <button className="px-2 py-2" onClick={() => handleSetSubPage("found")}>
                                <h3 className={`border-b-3 flex items-center gap-1 px-1 ${subPage === 'found' ? 'border-blue-500 text-blue-500 font-bold' : 'border-white'}`}>
                                    Found Items
                                    <span className="bg-primary text-sm text-white px-1.5 rounded-2xl flex justify-center items-center">{itemsCount.foundItemsCount}</span>
                                </h3>

                            </button>
                        </div>
                        <div className="">
                            <h3>Sort by: Default sorting</h3>
                        </div>
                    </div>

                    <div className="pl-4 ">
                        {subPage === 'lost' && <LostItems/>}
                        {subPage === 'found' && <FoundItems/>}
                    </div>

                </div>
            </div>
        </>
    );
}

export default HomePage;
