import React, {useState} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import MyButton from "../ui/MyButton";
import {useLocation, useNavigate} from "react-router-dom";

type RegisterFormBody = {
    email: string;
    password: string;
    passwordConfirm: string;
    code: string
}

function RegisterForm() {
    const navigate = useNavigate();
    const [registerFormError, setRegisterFormError] = useState<string>('');

    const registerForm = useForm<RegisterFormBody>()
    const onSubmitRegister: SubmitHandler<RegisterFormBody> = async (data) => {
        console.log(data);
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email: data.email, password: data.password, code: data.code}),
        })
        const json = await res.json();
        if (!res.ok) {
            setRegisterFormError(json.message)
        }else{
            navigate('/login')
        }
        console.log("onSubmitRegister",json)
    }

    const sendCode = async () => {
        const isValid = await registerForm.trigger("email");
        if (!isValid) {
            console.log("Invalid email. Please enter a valid email address.");
            return;
        }
        const email = registerForm.watch("email")
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/sendcode`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email})
            })
            const json = await res.json();
            if (!res.ok) {
                setRegisterFormError(json.message)
            }
            console.log("sendCode", json)
        } catch (e) {
            console.log(e)
        }
    }

    const inputClass = "w-full border rounded p-2"

    return (
        <>
            <form onSubmit={registerForm.handleSubmit(onSubmitRegister)} className="flex flex-col gap-2">
                <input
                    placeholder="Email"
                    type="text"
                    className={inputClass}
                    {...registerForm.register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message: "Invalid email address"
                        }
                    })}
                />
                {registerForm.formState.errors.email &&
				    <span className="text-red-500 text-sm">{registerForm.formState.errors.email.message}</span>}
                <div className="flex gap-2">
                    <input
                        placeholder="Code"
                        type="text"
                        className={inputClass}
                        {...registerForm.register("code", {
                            required: "Code is required"
                        })}
                    />
                    <MyButton
                        className="w-full h-full text-white py-3"
                        color="primary"
                        onClick={() => sendCode()}>
                        Send code
                    </MyButton>
                </div>
                {registerForm.formState.errors.code &&
				    <span className="text-red-500 text-sm">{registerForm.formState.errors.code.message}</span>}
                <input
                    placeholder="Password"
                    type="password"
                    className={`${inputClass} tracking-widest`}
                    {...registerForm.register("password", {
                        required: "Password is required"
                    })}
                />
                <input
                    placeholder="Confirm Password"
                    type="password"
                    className={`${inputClass} tracking-widest`}
                    {...registerForm.register("passwordConfirm", {
                        required: "Password is required",
                        validate: (value) => {
                            if (value !== registerForm.getValues("password")) {
                                return "Passwords do not match";
                            }
                            return true;
                        }
                    })}
                />
                {registerForm.formState.errors.passwordConfirm && <span
				    className="text-red-500 text-sm">{registerForm.formState.errors.passwordConfirm.message}</span>}
                {registerFormError && <span className="text-red-500 text-sm">{registerFormError}</span>}

                <MyButton
                    className="w-full mb-4 py-2"
                    color="primary"
                    type="submit">
                    Register
                </MyButton>
            </form>
        </>
    );
}

export default RegisterForm;
