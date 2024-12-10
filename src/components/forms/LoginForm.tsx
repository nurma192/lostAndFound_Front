import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import MyButton from "../ui/MyButton";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";
import {MyInput} from "../ui/MyInput";
import {useLogin} from "../../api/loginApi";

export type LoginFormBody = {
    email: string;
    password: string;
}

function LoginForm() {
    const {mutate: login, isLoading, isError} = useLogin()
    const [error, setError] = useState<string>('');

    const onSubmitLogin = async (data: LoginFormBody) => {
        console.log(data)
       login(data)
    }

    const {
        handleSubmit,
        formState: {errors},
        control
    } = useForm<LoginFormBody>({
        mode: "onChange",
        reValidateMode: "onBlur",
        defaultValues: {
            email: '',
            password: ''
        }
    })

    return (
        <>
            <form onSubmit={handleSubmit(onSubmitLogin)} className="flex flex-col gap-2">
                <MyInput
                    name={'email'}
                    label={'Email'}
                    type={'email'}
                    control={control}
                    required={"Email is required"}
                />
                <MyInput
                    name={'password'}
                    label={'Password'}
                    type={'password'}
                    control={control}
                    required={"Password is required"}
                />

                {error && <span className="text-red-500 text-sm">{error}</span>}
                <MyButton
                    className="w-full mb-4 text-white bg-red-500 py-2"
                    color="primary"
                    type="submit"
                    disabled={isLoading}
                >
                    Login
                </MyButton>
            </form>
        </>
    );
}

export default LoginForm;
