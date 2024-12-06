import React, {useState} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import MyButton from "../ui/MyButton";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";

type LoginFormBody = {
    email: string;
    password: string;
}

function LoginForm() {
    const navigate = useNavigate();
    const auth = useAuth()

    const [error, setError] = useState<string>('');
    const loginForm = useForm<LoginFormBody>()
    const onSubmitLogin = async (data: LoginFormBody) => {
        console.log(data);
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email: data.email, password: data.password}),
        })
        const json = await res.json();
        if (!res.ok) {
            setError(json.message);
        } else {
            auth.login(json.token)
            navigate('/')
        }
        console.log("onSubmitLogin:", json)
    }

    const inputClass = "w-full border rounded p-2"
    return (
        <>
            <form onSubmit={loginForm.handleSubmit(onSubmitLogin)} className="flex flex-col gap-2">
                <input
                    placeholder="Email"
                    type="text"
                    className={inputClass}
                    {...loginForm.register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message: "Invalid email address"
                        }
                    })}
                />
                {loginForm.formState.errors.email &&
					<span className="text-red-500 text-sm">{loginForm.formState.errors.email.message}</span>}
                <input
                    placeholder="Password"
                    type="password"
                    className={`${inputClass} tracking-widest`}
                    {...loginForm.register("password", {
                        required: "Password is required"
                    })}
                />
                {loginForm.formState.errors.password &&
					<span className="text-red-500 text-sm">{loginForm.formState.errors.password.message}</span>}
                {error && <span className="text-red-500 text-sm">{error}</span>}
                <MyButton
                    className="w-full mb-4 text-white bg-red-500"
                    color="primary"
                    type="submit">
                    Login
                </MyButton>
            </form>
        </>
    );
}

export default LoginForm;
