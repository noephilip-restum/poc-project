import { toast } from "react-toastify";

export const showSuccessAlert = (message: string) => {
  return toast.success(message);
};

export const showErrorAlert = (message: string) => {
  return toast.error(message);
};

export const showInfoAlert = (message: string) => {
  return toast.info(message);
};
