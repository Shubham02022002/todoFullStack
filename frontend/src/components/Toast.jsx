// toast.js
import { toast, Bounce } from "react-toastify";

toast.configure?.();

const success = (msg) => {
  console.log("contorl here");
  toast.success(msg, {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
};
export default success;
