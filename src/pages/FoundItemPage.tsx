import React from 'react';
import {useParams} from "react-router-dom";
import {useGetFoundItemById} from "../api/getFoundItemApi";
import ImageViewer from "../components/ImageViewer";
import ItemAllInfo from "../components/ItemAllInfo";

function FoundItemPage() {
    const {id} = useParams();

    const foundItemQuery = useGetFoundItemById(id)

    return (
        <div className="flex gap-4 w-full">
            <div className="w-1/2 flex gap-7.5">
                {foundItemQuery.isSuccess && <ImageViewer images={foundItemQuery.data.images}/>}
            </div>
            <div className="w-1/2">
                <h1 className={`text-md text-primary font-bold`}>#FOUND</h1>
                <ItemAllInfo itemQuery={foundItemQuery}/>
            </div>
        </div>
    );
}

export default FoundItemPage;
