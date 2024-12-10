import React from 'react';
import {Item, ItemType} from "../types/itemTypes";
import {ItemCard} from "./ItemCard";
import {TbMoodEmpty} from "react-icons/tb";

type Props = {
    items: Item[],
    type: ItemType
}

function ShowItemsGrid({items, type}: Props) {
    if (items.length === 0) {
        return <div className={`w-full flex items-center gap-2 justify-center my-4`}>
            <TbMoodEmpty size={30}/>
            <h3><span className={`capitalize`}>{type}</span> items Not Found</h3>
        </div>
    }
    return (
        <div className="grid grid-cols-4 gap-8 mt-5">
            { items.map((item, index) => (
                <ItemCard item={item} key={index} type={type}/>
            ))}
        </div>
    );
}

export default ShowItemsGrid;
