import {Accordion, AccordionItem, cn} from "@nextui-org/react";

import {CgProfile} from "react-icons/cg";
import {CiBoxList, CiLogout} from "react-icons/ci";
import {ActiveSection} from "../pages/ProfilePage";
import React, {useEffect} from "react";
import {RiLockPasswordLine} from "react-icons/ri";
import {FaPeopleCarryBox} from "react-icons/fa6";
import {FaSearch} from "react-icons/fa";

interface Props {
    variant: string;
    setVariants: (key: ActiveSection) => void
}

export default function ListBox({variant, setVariants}: Props) {
    const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";

    useEffect(() => {
        console.log()
    }, [variant]);

    return (
        <div
            className="w-full flex flex-col gap-1 border-small rounded p-1 border-default-200 dark:border-default-100 bg-neutral-100">
            <h3 className={`font-extrabold px-1 my-2 text-xl text-neutral-700`}>My Account</h3>
            <button
                className={`flex items-center gap-2 p-2 hover:bg-white transition rounded ${variant === 'profile' && 'bg-white'}`}
                onClick={() => setVariants("profile")}>
                <CgProfile className={iconClasses}/>
                Profile
            </button>
            <div className={`rounded transition ${(variant === 'lost' || variant === 'found') && 'bg-neutral-200'}`}>
                <Accordion className={`p-0`}
                           itemClasses={{
                               title: "font-normal text-medium",
                               trigger: "w-full p-2 gap-2 h-auto data-[hover=true]:bg-white rounded flex items-center",
                           }}
                >
                    <AccordionItem key="1" aria-label="My items" title="My items"
                                   startContent={<CiBoxList className={iconClasses}/>}
                                   className={`flex flex-col w-full p-0 transition rounded `}
                    >
                        <div className="w-full flex flex-col gap-2 h-full">
                            <button
                                className={`flex items-center gap-2 p-2 hover:bg-white transition rounded ${variant === 'lost' && 'bg-white'}`}
                                onClick={() => setVariants("lost")}>
                                <FaSearch className={iconClasses}/>
                                Lost Items
                            </button>
                            <button
                                className={`flex items-center gap-2 p-2 hover:bg-white transition rounded ${variant === 'found' && 'bg-white'}`}
                                onClick={() => setVariants("found")}>
                                <FaPeopleCarryBox className={iconClasses}/>
                                Found Items
                            </button>
                        </div>
                    </AccordionItem>
                </Accordion>
            </div>
            <button
                className={`flex items-center gap-2 p-2 hover:bg-white transition rounded ${variant === 'changePassword' && 'bg-white'}`}
                onClick={() => setVariants("changePassword")}>
                <RiLockPasswordLine className={iconClasses}/>
                Change Password
            </button>
            <button className={`flex items-center gap-2 p-2 hover:bg-danger group hover:text-white transition rounded`}
                    onClick={() => setVariants("logout")}>
                <CiLogout className={cn(iconClasses, `transition text-danger group-hover:text-white`)}/>
                Logout
            </button>
        </div>
    );
}