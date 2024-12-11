import {toast} from "sonner";

export const useToast = () => {
    function successToast(text: string) {
        toast.success(text)
    }
}