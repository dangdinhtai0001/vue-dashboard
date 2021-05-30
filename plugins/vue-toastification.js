import Vue from "vue";
import Toast from "vue-toastification";
// Import the CSS or use your own
import "vue-toastification/dist/index.css";

const options = {
    // You can set your default options here
    position: "top-right",
    timeout: 5000,
    transitionDuration: 800,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: true,
    hideProgressBar: false,
    closeButton: "button",
    icon: "fas fa-check",
    rtl: false,
    // ----------
    transition: "Vue-Toastification__bounce",
    maxToasts: 5,
    newestOnTop: true,
    // ----------
    // For the actual toast, including different toast types:
    // toastClassName: "my-custom-toast-class",
    // bodyClassName: ["my-custom-toast-class"],
}


Vue.use(Toast, options);