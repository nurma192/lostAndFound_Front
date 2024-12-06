import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useGetLostItemById} from "../api/getLostItemApi";
import ImageViewer from "../components/ImageViewer";
import ItemAllInfo from "../components/ItemAllInfo";

function LostItemPage() {
    const {id} = useParams();
    const navigate = useNavigate();

    const lostItemQuery = useGetLostItemById(id)
    if (lostItemQuery.error || lostItemQuery.isError) {
        navigate('/')
        return <h3>Error</h3>
    }

    return (
        <div className="flex gap-4 w-full">
            <div className="w-1/2 flex gap-7.5">
                {lostItemQuery.isSuccess && <ImageViewer images={lostItemQuery.data.images}/>}
            </div>
            <div className="w-1/2">
                <h1 className={`text-md text-primary font-bold`}>#LOST</h1>
                <ItemAllInfo itemQuery={lostItemQuery} />
            </div>
        </div>
    )
}

export default LostItemPage;
