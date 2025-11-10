import toast from "react-hot-toast";

const useToast = () => {
  const showSuccess = (message) => {
    toast.success(message);
  };

  const showError = (message) => {
    toast.error(message);
  };

  const showLoading = (message) => {
    return toast.loading(message);
  };

  const showInfo = (message) => {
    toast(message, {
      icon: "ℹ️",
      style: {
        background: "#3b82f6",
        color: "#fff",
      },
    });
  };

  const showWarning = (message) => {
    toast(message, {
      icon: "⚠️",
      style: {
        background: "#f59e0b",
        color: "#fff",
      },
    });
  };

  const dismissToast = (toastId) => {
    toast.dismiss(toastId);
  };

  const dismissAll = () => {
    toast.dismiss();
  };

  // Promise toast - useful for async operations
  const showPromise = (promise, messages) => {
    return toast.promise(promise, {
      loading: messages.loading || "Loading...",
      success: messages.success || "Success!",
      error: messages.error || "Error occurred",
    });
  };

  return {
    showSuccess,
    showError,
    showLoading,
    showInfo,
    showWarning,
    dismissToast,
    dismissAll,
    showPromise,
  };
};

export default useToast;