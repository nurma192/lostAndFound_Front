import {useMutation} from "react-query";

const sendCode = async (email: string) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/sendcode`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email})
    })

    const json = await res.json();
    if (!res.ok) {
        throw new Error(json.message ?? res.statusText);
    }
    return json
}

export const useSendCode = () => {
    return useMutation((email: string) => sendCode(email), {
        onSuccess: data => {
            console.log(data)
        }
    });
}