import React from "react";

export function useEscapeKey(listener) {
  if (!listener) {
    throw new Error("It's required to provide a listener argument");
  }

  React.useEffect(() => {
    function handleKeyDown(e) {
      if (e.code !== "Escape") return;

      listener();
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [listener]);
}
