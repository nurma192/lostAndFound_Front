import React, {useEffect} from 'react';
import {Item} from "../types/itemTypes";
import {Skeleton} from "@nextui-org/react";
import {FaAngleLeft, FaAngleRight} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import {format} from "date-fns/format";

interface Props {
    item: Item;
    type: "lost" | "found"
}

function ItemCard({item, type}: Props) {
    const [mainImage, setMainImage] = React.useState(0)
    const navigate = useNavigate();


    const goToItemPage = () => {
        console.log(`Go to ${item.id}`)
        navigate(`/item/${type}/${item.id}`)
    }
    const handleButtonClick = (event: React.MouseEvent) => {
        event.stopPropagation(); // Prevent the click event from bubbling up
    };
    return (
        <div className={`flex flex-col h-full cursor-pointer rounded hover:bg-neutral-100 transition p-2 w-full`}
             onClick={() => {
                 goToItemPage()
             }}>
            <div className="w-full h-full mb-8  flex justify-center items-center relative">
                <div className="relative w-full aspect-square">
                    <img
                        className="w-full h-full object-cover z-0"
                        src={`${process.env.REACT_APP_API_URL}/${item.images[mainImage]}`}
                        alt=""
                    />
                </div>
                <div className="absolute top-0 right-0 bg-white bg-opacity-50 p-0.5 text-sm">
                    {mainImage + 1}/{item.images.length}
                </div>
                <button
                    className={`absolute m-auto cursor-pointer left-0 pr-2 py-2 rounded-r z-10 transition hover:scale-110 text-primary bg-white bg-opacity-50 disabled:opacity-0`}
                    onClick={(event) => {
                        handleButtonClick(event)
                        setMainImage(mainImage - 1)
                    }}
                    disabled={mainImage === 0}>
                    <FaAngleLeft/>
                </button>
                <button
                    className={`absolute m-auto cursor-pointer right-0 pl-2 py-2 rounded-s z-10 transition hover:scale-110 text-primary bg-white bg-opacity-50 disabled:opacity-0`}
                    onClick={(event) => {
                        handleButtonClick(event)
                        setMainImage(mainImage + 1)
                    }}
                    disabled={mainImage === item.images.length - 1}>
                    <FaAngleRight/>
                </button>
            </div>
            <p className={`font-bold text-xl mt-auto`}>{item.name}</p>
            <p className={`text-sm`}>{item.category.name}</p>
            {'lostDate' in item && <p className={`text-sm`}>Lost date: {format(new Date(item.lostDate), "dd.MM.yyyy")}</p>}
            {'foundDate' in item && <p className={`text-sm`}>Found date:  {format(new Date(item.foundDate), "dd.MM.yyyy")}</p>}
        </div>
    );
}

function SkeletonCard() {
    return (
        <div className="w-full space-y-5 p-4 rounded-lg">
            <Skeleton className="rounded-lg">
                <div className="h-[200px] w-full rounded-lg bg-secondary"></div>
            </Skeleton>
            <div className="space-y-3">
                <Skeleton className="w-4/5 rounded-lg">
                    <div className="h-3 w-full rounded-lg bg-secondary-300"></div>
                </Skeleton>
                <Skeleton className="w-2/5 rounded-lg">
                    <div className="h-3 w-full rounded-lg bg-secondary-200"></div>
                </Skeleton>
                <Skeleton className="w-3/5 rounded-lg">
                    <div className="h-3 w-full rounded-lg bg-secondary-200"></div>
                </Skeleton>
            </div>
        </div>
    )
}

export {ItemCard, SkeletonCard};
