import React, {useEffect, useState} from 'react';
import LostItems from "../components/LostItems";
import FoundItems from "../components/FoundItems";
import CategoriesList from "../components/CategoriesList";
import {useCustomParams} from "../hooks/useCustomParams";
import {ItemType} from "../types/itemTypes";
import {DateValue, parseDate} from "@internationalized/date";
import {Autocomplete, AutocompleteItem, DatePicker, DateRangePicker, RangeValue} from "@nextui-org/react";

function HomePage() {
    const customParams = useCustomParams();

    const [subPage, setSubPage] = useState<ItemType>(customParams.getTypeFromParam());
    const [itemsCount, setItemsCount] = useState({
        lostItemsCount: 0,
        foundItemsCount: 0,
    });


    const handleSetSubPage = (pageName: 'lost' | 'found') => {
        const currentParams = new URLSearchParams(customParams.searchParams);
        currentParams.set('type', pageName);
        currentParams.delete('category');
        currentParams.delete('page');
        customParams.setSearchParams(currentParams);
        setSubPage(pageName);
    };

    const handleDateChange = (dateRange: RangeValue<DateValue>) => {
        console.log(dateRange)
        customParams.setDateRangeToParam(dateRange)
    }

    console.log(customParams.getStartDateFromParam())
    console.log(customParams.getEndDateFromParam())

    const sorts = [
        {label: "Newest", key: "asc"},
        {label: "Latest", key: "desc"},
    ]

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
                                    <span
                                        className="bg-primary text-sm text-white px-1.5 rounded-2xl flex justify-center items-center">{itemsCount.lostItemsCount}</span>
                                </h3>

                            </button>
                            <button className="px-2 py-2" onClick={() => handleSetSubPage("found")}>
                                <h3 className={`border-b-3 flex items-center gap-1 px-1 ${subPage === 'found' ? 'border-blue-500 text-blue-500 font-bold' : 'border-white'}`}>
                                    Found Items
                                    <span
                                        className="bg-primary text-sm text-white px-1.5 rounded-2xl flex justify-center items-center">{itemsCount.foundItemsCount}</span>
                                </h3>

                            </button>
                        </div>
                        <div className="flex gap-2">
                            <div className="">
                                <DateRangePicker
                                    defaultValue={(customParams.getStartDateFromParam() !== '' && customParams.getEndDateFromParam() !== '') ? {
                                        start: parseDate(customParams.getStartDateFromParam() || ''),
                                        end: parseDate(customParams.getEndDateFromParam() || '')
                                    } : undefined}
                                    classNames={{inputWrapper: "rounded bg-white border"}}
                                    onChange={handleDateChange}
                                />
                            </div>
                            <Autocomplete
                                className="max-w-xs"
                                defaultItems={sorts}
                                placeholder="Search an animal"
                                // onChange={}
                            >
                                {(animal) => <AutocompleteItem key={animal.key}>{animal.label}</AutocompleteItem>}
                            </Autocomplete>
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
