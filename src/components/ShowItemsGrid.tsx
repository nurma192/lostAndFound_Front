import React, {useState} from 'react';
import {Item, ItemType} from "../types/itemTypes";
import {ItemCard} from "./ItemCard";
import {TbMoodEmpty} from "react-icons/tb";

type Props = {
    items: Item[],
    type: ItemType,
    isMyItems?: boolean,
    updateUserData?: () => void
}

function ShowItemsGrid({items, type, isMyItems = false, updateUserData}: Props) {
    const [showItems, setShowItems] = useState(items)
    const deleteItem = (id: string) => {
        setShowItems(showItems.filter(item => item.id !== id))
    }
    if (items.length === 0) {
        return <div className={`w-full flex items-center gap-2 justify-center my-4`}>
            <TbMoodEmpty size={30}/>
            <h3><span className={`capitalize`}>{type}</span> items Not Found</h3>
        </div>
    }
    return (
        <div className="grid grid-cols-1 gap-8 mt-5 md:grid-cols-2 xl:grid-cols-3 xl2:grid-cols-4">
            {showItems.map((item, index) => (
                <>
                    <ItemCard item={item} key={index} type={type} isMyItem={isMyItems} deleteItem={deleteItem} updateUserData={updateUserData}/>
                </>
            ))}
        </div>
    );
}

export default ShowItemsGrid;
