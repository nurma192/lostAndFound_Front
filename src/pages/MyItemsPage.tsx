import React from "react";
import {useUserData} from "../api/userDataApi";
import ShowItemsGrid from "../components/ShowItemsGrid";
import {CircularProgress} from "@nextui-org/react";
import {ItemType} from "../types/itemTypes";

type Props = {
    activeSection: ItemType
}
function MyItemsPage({activeSection}:Props) {
    const {data, isSuccess, isLoading, isError} = useUserData()

    return (
        <div className={`w-full`}>
            <h3 className={`font-bold text-2xl`}>My {activeSection} Items</h3>
            {isLoading && <CircularProgress />}
            {isError && <h3>Error :(((</h3>}
            {isSuccess && <div>
                {activeSection === 'found' && <ShowItemsGrid items={data.findItems} type={activeSection} />}
                {activeSection === 'lost' && <ShowItemsGrid items={data.lostItems} type={activeSection} />}
            </div>}
        </div>
    )
}

export default MyItemsPage;