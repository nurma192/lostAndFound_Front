import {RegisterFormBody} from "../components/forms/RegisterForm";
import {useMutation} from "react-query";
import {useNavigate} from "react-router-dom";

const register = async (data: RegisterFormBody) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: data.email,
            password: data.password,
            code: data.code,
            name: data.name,
            surname: data.surname,
        }),
    })

    const json = await res.json();
    if (!res.ok) {
        throw new Error(json.message ?? json.verificationCode ??  res.statusText);
    }
    return json
}

export const useRegister = () => {
    const navigate = useNavigate();
    return useMutation((data: RegisterFormBody) => register(data), {
        onSuccess: () => {
            navigate('/login')
        }
    })
}