import React from 'react';
import {Button} from "@nextui-org/react";

interface Props {
    children: React.ReactNode;
    color?: "primary" | "transparent" | "danger";
    className?: string;
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
    disabled?: boolean;
    icon?: JSX.Element;
}

function MyButton({children,color, className, type = "button", onClick, disabled, icon}: Props) {
    let colorClassName = ""
    if (color === "primary") {
        colorClassName = ` text-white bg-[#1560BD] hover:bg-[#0f488e]`
    }else if (color === "transparent") {
        colorClassName = ` text-black bg-transparent border border-transparent hover:border-[#1560BD] hover:text-[#1560BD]`
    }else if (color === "danger") {
        colorClassName = ` text-red-500 bg-transparent border border-transparent hover:border-red-500`
    }
    return (
        <Button className={`${className} h-auto w-auto rounded transition ${colorClassName} disabled:cursor-not-allowed`}
                type={type}
                onClick={() => onClick && onClick()}
                disabled={disabled}
        >
            <div className={`m-0 gap-2 flex items-center`}>
                {icon}
                {children}
            </div>
        </Button>
    );
}

export default MyButton;
