import React from "react";
import { Outlet} from "react-router-dom";
import Header from "../components/Header";

function Layout() {
    return (
        <>
            <Header />
            <div className="w-full flex justify-center py-5">
                <div className="w-10/12 flex justify-center">
                    <Outlet />
                </div>
            </div>
        </>
    );
}

export default Layout;
