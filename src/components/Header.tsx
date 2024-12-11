import React, {useEffect, useRef, useState} from 'react';
import MyLink from "./ui/MyLink";
import MyButton from "./ui/MyButton";
import {useUserData} from "../api/userDataApi";
import {CircularProgress} from "@nextui-org/react";
import {useCustomParams} from "../hooks/useCustomParams";
import {useNavigate} from "react-router-dom";

function Header() {
    const inputRef = useRef<HTMLInputElement>(null);
    const userData = useUserData()
    const customParam = useCustomParams()
    const navigate = useNavigate()
    const [isInputOpen, setIsInputOpen] = useState<boolean>(!!customParam.getQueryFromParam())
    const [searchText, setSearchText] = useState<string>(customParam.getQueryFromParam())

    const toggleOpenInput = (): void => {
        if (!(isInputOpen && searchText !== '')) {
            setIsInputOpen(!isInputOpen)
        }
            submitSearch()
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const submitSearch = () => {
        customParam.setQueryToParam(searchText)
    }

    const goToHome = () => {
        customParam.resetAllParams()
        navigate("/")
    }

    useEffect(() => {
        setSearchText(customParam.getQueryFromParam())
    }, [customParam.searchParams]);

    return (
        <header className="w-full flex justify-around items-center gap-5 py-5 text-white">
            <div className="cursor-pointer" onClick={() => goToHome()}>
                <img className="w-[205px]" src="/icons/logosCombo.svg" alt="logo"/>
            </div>
            <nav>
                <ul className="hidden sm:flex gap-4">
                    <li>
                        <MyLink className="text-black" to="/">
                            Home
                        </MyLink>
                    </li>
                    <li>
                        <MyLink className="text-black" to="/add-item">
                            Add Item
                        </MyLink>
                    </li>
                    <li>
                        <MyLink className="text-black" to="/support">
                            Support
                        </MyLink>
                    </li>
                </ul>
            </nav>
            <div className="flex gap-2">
                <input ref={inputRef} type="text"
                       value={searchText}
                       onChange={e => setSearchText(e.target.value)}
                       onKeyDown={e => e.key === "Enter" && submitSearch()}
                       className={` px-2 border transition-all text-md w-[0px]  text-black ${isInputOpen ? 'border-black w-[300px] ' : 'border-transparent'}`}/>
                <button className="flex relative p-2 rounded-3xl transition hover:bg-neutral-200 cursor-pointer"
                        onClick={() => toggleOpenInput()}>
                    <img src="/icons/search.svg" alt="search"/>
                </button>
                <div className="relative p-2 rounded-3xl transition hover:bg-neutral-200 cursor-pointer">
                    <div
                        className="absolute bg-[#1560BD] rounded-3xl w-3 h-3 text-[10px] content-center flex justify-center items-center">6
                    </div>
                    <img className="w-5" src="/icons/notification.svg" alt="notification"/>
                </div>
                <MyButton color="primary" className="flex justify-center items-center h-8 px-5"
                    onClick={() => navigate("/profile")}>
                    <img className="w-4" src="/icons/profileIcon.svg" alt="profile"/>
                    <p className="">{userData.data?.name} {userData.data?.surname}</p>
                    {userData.isLoading && <CircularProgress color="secondary" size={'sm'} aria-label="Loading..."/>}
                </MyButton>
            </div>
        </header>
    );
}

export default Header;
