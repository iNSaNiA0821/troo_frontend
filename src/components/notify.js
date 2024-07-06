
import toast, { Toaster } from 'react-hot-toast';
export const notifysuccess = (msg) => toast.success(msg,{
    id:"success",
    style: {
    background: '#31a262',
    color: '#fff',
    },
});
export const notifyerror = (msg) => toast.error(msg,{
    id:"error",
    style: {
    background: '#e74342',
    color: '#fff',
    },
});
export const notifywarning = (msg) => toast.error(msg,{
    id:"warning",
    style: {
    background: '#e89c6e',
    color: '#fff',
    },
});