import React from 'react';
import {DatePicker, Skeleton, Textarea} from "@nextui-org/react";
import {FaTelegram, FaWhatsapp} from "react-icons/fa";
import {CgMail} from "react-icons/cg";
import {FoundItem, LostItem} from "../types/itemTypes";
import {UseQueryResult} from "react-query";
import {format} from "date-fns/format";
import {parseDate} from "@internationalized/date";

interface Props {
    itemQuery: UseQueryResult<LostItem> | UseQueryResult<FoundItem>
}

function ItemAllInfo({itemQuery}: Props) {

    return (
        <div className={`flex flex-col items-start gap-2`}>
            <Skeleton isLoaded={itemQuery.isSuccess} className={`w-full h-[24px] rounded`}>
                {itemQuery.isSuccess && <h3 className={`text-2xl`}>{itemQuery.data.name}</h3>}
            </Skeleton>
            <hr className="w-full h-[2px]"/>
            <Skeleton isLoaded={itemQuery.isSuccess} className={`w-full h-[24px] rounded`}>
                {itemQuery.isSuccess &&
					<h3 className={`text-md text-primary font-bold`}>{itemQuery.data.user.email}</h3>}
            </Skeleton>
            <Skeleton isLoaded={itemQuery.isSuccess} className={`w-full h-[50px] rounded`}>
                {itemQuery.isSuccess && 'lostDate' in itemQuery.data && (
                    <div>
                        <DatePicker
                                    value={parseDate(format(new Date(itemQuery.data.lostDate), "yyyy-MM-dd"))}
                                    label={`Lost Date: `}
                                    dateInputClassNames={{
                                        inputWrapper: "rounded bg-white border"
                                    }}
                        />
                    </div>
                )}
                {itemQuery.isSuccess && 'foundDate' in itemQuery.data && (
                    <div>
                        <DatePicker
                            value={parseDate(format(new Date(itemQuery.data.foundDate), "yyyy-MM-dd"))}
                            label={`Lost Date: `}
                            dateInputClassNames={{
                                inputWrapper: "rounded bg-white border"
                            }}
                        />
                    </div>
                )}
            </Skeleton>
            <Skeleton isLoaded={itemQuery.isSuccess} className={`w-full h-[100px] rounded mt-4`}>
                {itemQuery.isSuccess && <div>
			        <Textarea
				        label="Description"
				        value={itemQuery.data.description}
				        readOnly={true}
                        // className={`w-[60%]`}
				        classNames={{
                            inputWrapper: "border border-neutral-200 bg-white rounded",
                        }}
					/>
				</div>}
            </Skeleton>

            <div className="">
                <h3 className={`font-bold`}>Socials</h3>
                <div className="flex flex-col gap-2 mt-2">
                    <Skeleton isLoaded={itemQuery.isSuccess}
                              className={`w-full flex items-center h-[24px] font-bold rounded ${itemQuery.isSuccess && itemQuery.data.user.telegram === "" && 'hidden'}`}>
                        {itemQuery.isSuccess && <div className="flex items-center gap-1 ">
							<FaTelegram className={`text-2xl`}/>
							<h4 className={`text-neutral-600`}>Telegram: </h4>
							<h3 className='underline'><a href={`https://t.me/${itemQuery.data.user.telegram}`}>@{itemQuery.data.user.telegram}</a></h3>
						</div>}
                    </Skeleton>
                    <Skeleton isLoaded={itemQuery.isSuccess}
                              className={`w-full flex items-center h-[24px] font-bold rounded ${itemQuery.isSuccess && itemQuery.data.user.email === "" && 'hidden'}`}>
                        {itemQuery.isSuccess && <div className="flex items-center gap-1 ">
							<CgMail className={`text-2xl`}/>
							<h4 className={`text-neutral-600`}>Mail: </h4>
							<h3>{itemQuery.data.user.email}</h3>
						</div>}
                    </Skeleton>
                    <Skeleton isLoaded={itemQuery.isSuccess}
                              className={`w-full flex items-center h-[24px] font-bold rounded  ${itemQuery.isSuccess && itemQuery.data.user.phone === "" && 'hidden'}`}>
                        {itemQuery.isSuccess && <div className="flex items-center gap-1 ">
							<FaWhatsapp className={`text-2xl`}/>
							<h4 className={`text-neutral-600`}>Whatsapp: </h4>
							<h3>{itemQuery.data.user.phone}</h3>
						</div>}
                    </Skeleton>
                </div>
            </div>
        </div>
    );
}

export default ItemAllInfo;
