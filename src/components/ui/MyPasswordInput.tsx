import React from 'react';
import {Input} from "@nextui-org/react";
import {InputProps} from "@nextui-org/input/dist/input";
import {FaEye, FaEyeSlash} from "react-icons/fa";

interface Props extends InputProps {
    isInvalid: boolean,

}

function MyPasswordInput(props: Props) {
    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <Input {...props}
               radius="sm"
               size="sm"
               type={isVisible ? "text" : "password"}
               className={``}
               variant="bordered"
               classNames={{
                   inputWrapper: "border border-neutral-200 bg-white rounded",
                   input: `${!isVisible && 'tracking-widest'}`
               }}
               endContent={
                   <button
                       aria-label="toggle password visibility"
                       className="focus:outline-none"
                       type="button"
                       onClick={toggleVisibility}
                   >
                       {isVisible ? (
                           <FaEyeSlash className="text-2xl text-default-400 pointer-events-none"/>
                       ) : (
                           <FaEye className="text-2xl text-default-400 pointer-events-none"/>
                       )}
                   </button>
               }
        />
    );
}

export default MyPasswordInput;
