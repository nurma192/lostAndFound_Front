import {useMutation} from "react-query";
import {LoginFormBody} from "../components/forms/LoginForm";
import {useAuth} from "../hooks/useAuth";

type LoginResponse = {
    token: string;
}

const login = async (data: LoginFormBody): Promise<LoginResponse> => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/signin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email: data.email, password: data.password}),
    })

    const json = await res.json();
    if (!res.ok) {
        throw new Error(json.message ?? res.statusText);
    }
    return json;
}

export const useLogin = () => {
    const {login: registerToken} = useAuth()
    return useMutation((data: LoginFormBody) => login(data), {
        onSuccess: (data) => {
            registerToken(data.token)
        }
    })
}