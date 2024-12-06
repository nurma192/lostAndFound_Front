import React from 'react';
import {Link, useLocation} from "react-router-dom";
interface Props {
    children?: React.ReactNode;
    to: string;
    className?: string;
}
function MyLink({children, to, className}:Props) {
    const location = useLocation();
    if (location.pathname === to) {
        className +=  ` text-[#1560BD] border-[#1560BD] font-bold`
    }else{
        className +=  ` border-transparent`
    }
    return (
        <Link to={to} className={`${className} py-4 px-2 border-b-2 transition hover:text-[#1560BD] hover:font-bold`}>
            {children}
        </Link>
    );
}

export default MyLink;
