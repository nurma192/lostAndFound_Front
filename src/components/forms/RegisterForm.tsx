import React, {useState} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import MyButton from "../ui/MyButton";
import {useRegister} from "../../api/registerApi";
import {useSendCode} from "../../api/sendCodeApi";
import {MyInput} from "../ui/MyInput";
import {MyPasswordInput} from "../ui/MyPasswordInput";

export type RegisterFormBody = {
    email: string;
    password: string;
    passwordConfirm: string;
    code: string;
    name: string;
    surname: string;
}

function RegisterForm() {
    const [registerFormError, setRegisterFormError] = useState<string>('');
    const {handleSubmit, control, trigger, watch} = useForm<RegisterFormBody>()

    const {mutate: register, isLoading: registerLoading, ...registerQuery} = useRegister()
    const {mutate: sendCode, isLoading: sendCodeLoading, ...sendCodeQuery} = useSendCode()

    const onSubmitRegister: SubmitHandler<RegisterFormBody> = async (data) => {
        register(data, {
            onError: (error) => {
                if (error instanceof Error) {
                    setRegisterFormError(error.message || 'An error occurred during registration.');
                } else {
                    setRegisterFormError('An unknown error occurred.');
                }
            },
        });
    }

    const onClickSendCode = async () => {
        const isValid = await trigger("email");
        if (!isValid) {
            console.log("Invalid email. Please enter a valid email address.");
            return;
        }
        const email = watch("email")
        sendCode(email, {
            onError: (error) => {
                if (error instanceof Error) {
                    setRegisterFormError(error.message || 'An error occurred while sending the code.');
                } else {
                    setRegisterFormError('An error occurred while sending the code.');
                }
            },
        });
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmitRegister)} className="flex flex-col gap-2">
                <MyInput
                    name={'email'}
                    label={'Email'}
                    type="email"
                    control={control}
                />
                <div className="flex gap-2">
                    <MyButton
                        className="w-full h-full text-white py-3"
                        color="primary"
                        onClick={() => onClickSendCode()}
                        disabled={sendCodeLoading}
                    >
                        Send code
                    </MyButton>
                    <MyInput
                        name={'code'}
                        type="text"
                        label={'Code'}
                        control={control}
                        required="Code is required"
                    />
                </div>
                <MyInput
                    name={'name'}
                    type="text"
                    label={'Name'}
                    required="Name is required"
                    control={control}
                />
                <MyInput
                    name={'surname'}
                    type="text"
                    label={'Surname'}
                    required="Surname is required"
                    control={control}
                />
                <MyPasswordInput
                    name={'password'}
                    label={'Password'}
                    required="Password is required"
                    control={control}
                />
                <MyPasswordInput
                    name={'passwordConfirm'}
                    label={'Confirm Password'}
                    required="Password is required"
                    control={control}
                    validate={(value) =>
                        value === watch('password') || 'Passwords do not match'
                    }
                />
                {registerFormError && <span className="text-red-500 text-sm">{registerFormError}</span>}
                {registerQuery.isError && (registerQuery.error instanceof Error) && <span className="text-red-500 text-sm">{registerQuery.error.message}</span>}
                {sendCodeQuery.isError && (sendCodeQuery.error instanceof Error) && <span className="text-red-500 text-sm">{sendCodeQuery.error.message}</span>}
                <MyButton
                    className="w-full mb-4 py-2"
                    color="primary"
                    type="submit"
                    disabled={registerLoading}
                >
                    Register
                </MyButton>
            </form>
        </>
    );
}

export default RegisterForm;
