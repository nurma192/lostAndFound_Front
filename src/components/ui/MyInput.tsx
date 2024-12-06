import React from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {

}

function MyInput(props: Props) {
    return (
        <input {...props}></input>
    );
}

export default MyInput;
