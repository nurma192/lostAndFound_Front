import {useMutation} from "react-query";
import {AddItemFormBody} from "../pages/AddItem";
import {useAuth} from "../hooks/useAuth";
import {useNavigate} from "react-router-dom";
import {toast} from "sonner";

export const addItem = async (data: AddItemFormBody, token: string): Promise<any> => {
    const formData = new FormData();

    formData.append('name', data.itemName);
    formData.append('description', data.description);
    formData.append('categoryId', data.categoryId);
    formData.append('type', data.type);

    let response;
    if (data.type === 'lost') {
        data.images.forEach(image => {
            formData.append('lostItemImages', image);
        })
        formData.append('lostDate', `${data.date.year}-${data.date.month}-${data.date.day}`);
        response = await fetch(`${process.env.REACT_APP_API_URL}/api/lost/add`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData,
        });
    } else {
        data.images.forEach(image => {
            formData.append('foundItemImages', image);
        })
        formData.append('foundDate', `${data.date.year}-${data.date.month}-${data.date.day}`);
        response = await fetch(`${process.env.REACT_APP_API_URL}/api/found/add`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData,
        });
    }

    if (!response.ok) {
        throw new Error('Failed to add Item');
    }

    const json = response.json();

    toast.promise(json, {
        loading: 'Loading...',
        success: (data) => {
            return `Item "${data.name}" has been added successfully.`;
        },
        error: (error) => {
            return error.message || 'Failed to add item';
        },
    });

    return json;
}

export const useAddItem = () => {
    const navigate = useNavigate();
    const {token} = useAuth();

    return useMutation((data: AddItemFormBody) => addItem(data, token), {
        onSuccess: () => {
            navigate('/')
        },
    });
};
