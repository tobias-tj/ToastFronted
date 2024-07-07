import { toast } from "react-toastify";

const ToastConfig = {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light"
};

export function ToastInfo(message) {
    toast.info(message, ToastConfig);
}

export function ToastSuccess(message) {
    toast.success(message, ToastConfig);
}

export function ToastWarning(message) {
    toast.warn(message, ToastConfig);
}

export function ToastError(message) {
    toast.error(message, ToastConfig);
}