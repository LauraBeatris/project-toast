import React from "react";

export const ToastContext = React.createContext([]);

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const push = React.useCallback(({ message, variant }) => {
    setToasts((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        message,
        variant,
      },
    ]);
  }, []);

  const dismiss = React.useCallback((toastId) => {
    setToasts((prev) => prev.filter(({ id }) => id !== toastId));
  }, []);

  const value = React.useMemo(
    () => ({
      toasts,
      push,
      dismiss,
    }),
    [toasts, push, dismiss]
  );

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}

export default ToastProvider;
