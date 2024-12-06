import React, {useEffect} from "react";
import {Button} from "@nextui-org/react";
import {Link, useLocation} from "react-router-dom";
import MyButton from "../components/ui/MyButton";
import LoginForm from "../components/forms/LoginForm";
import RegisterForm from "../components/forms/RegisterForm";

function Auth() {
    const location = useLocation();

    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 w-full pt-20">
            <Link to="/">
                <MyButton color="primary" className="">Home</MyButton>
            </Link>
            <div className=" w-[500px] bg-white py-5 px-24 rounded-t-lg shadow-lg flex flex-col gap-2 ">
                <div className="w-full flex justify-center items-center gap-5 my-5">
                    <Link to="/login"
                          className={`text-xl ${location.pathname === "/login" ? " text-blue-500" : " text-black"}`}>Login</Link>
                    |
                    <Link to="/register"
                          className={`text-xl ${location.pathname === "/register" ? " text-blue-500" : " text-black"}`}>Register</Link>
                </div>
                <p className="text-gray-600 text-xs">
                    {location.pathname === "/register" ? "Enter your email and password to register." : "Enter your username and password to login."}
                </p>

                {location.pathname === "/login" && <LoginForm />}
                {location.pathname === "/register" && <RegisterForm />}


                <div className="flex flex-col items-center gap-2 mt-4 justify-center">
                    <div className="flex w-full items-center gap-2">
                        <div className="border-t h-[1px] flex-auto"></div>
                        <p className="text-sm text-gray-600">
                            {location.pathname === "/register" ? "Or register with" : "Or login with"}
                        </p>
                        <div className="border-t h-[1px] flex-auto"></div>
                    </div>
                    <Button className="border rounded w-10/12 px-5 flex items-center">
                        <img className="" src="/icons/google.svg" alt=""/>
                        <p className="">
                            Continue with Google
                        </p>
                    </Button>
                    <Button className="border rounded w-10/12 px-5 overflow-hidden flex items-center">
                        <img className="" src="/icons/facebook.svg" alt="#"/>
                        Continue with Facebook
                    </Button>
                </div>
            </div>
            <div className="w-[500px] h-3 bg-blue-500"></div>

        </div>
    );
}

export default Auth;
