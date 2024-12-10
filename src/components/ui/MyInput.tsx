import React from 'react';
import {Input} from "@nextui-org/react";
import {Control, useController} from "react-hook-form";

interface Props {
    name: string;
    label: string;
    placeholder?: string;
    type?: string;
    control: Control<any>;
    required?: string;
    validate?: (value: any) => string | boolean;
    endContent?: JSX.Element;
}

export const MyInput: React.FC<Props> = ({
                                             name,
                                             label,
                                             placeholder,
                                             type = "text",
                                             control,
                                             required = '',
                                             endContent,
                                             validate
                                         }
) => {

    const {field, fieldState: {invalid}, formState:{errors}} = useController({
        name,
        control,
        rules: {
            required,
            validate
        }
    })

    return (
        <Input
            id={name}
            label={label}
            type={type}
            isRequired={!!required}
            placeholder={placeholder}
            value={field.value}
            name={field.name}
            isInvalid={invalid}
            onChange={field.onChange}
            onBlur={field.onBlur}
            errorMessage={`${errors[name]?.message ?? ''}`}
            classNames={{
                inputWrapper: 'rounded border border-neural-700 bg-white'
            }}
            className={''}
            endContent={endContent}
        />
    );
}
