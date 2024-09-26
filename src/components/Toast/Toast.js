import React from "react";
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
} from "react-feather";

import VisuallyHidden from "../VisuallyHidden";

import styles from "./Toast.module.css";
import { useEscapeKey } from "../../hooks/useEspaceKey";

const ICONS_BY_VARIANT = {
  notice: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertOctagon,
};

function Toast({ variant, children, handleDismiss }) {
  const Icon = ICONS_BY_VARIANT[variant];

  useEscapeKey(handleDismiss);

  if (!Icon) {
    throw new Error("Invalid variant: ", variant);
  }

  return (
    <div className={`${styles.toast} ${styles[variant]}`}>
      <div className={styles.iconContainer}>
        <Icon size={24} />
      </div>
      <p className={styles.content}>
        {(() => {
          switch (variant) {
            case "notice":
              return <VisuallyHidden>Notice - </VisuallyHidden>;
            case "warning":
              return <VisuallyHidden>Warning - </VisuallyHidden>;
            case "success":
              return <VisuallyHidden>Success - </VisuallyHidden>;
            case "error":
              return <VisuallyHidden>Error - </VisuallyHidden>;
            default:
              return null;
          }
        })()}

        {children}
      </p>
      <button
        className={styles.closeButton}
        onClick={handleDismiss}
        aria-label="Dismiss message"
        aria-live="off"
      >
        <X size={24} />
        <VisuallyHidden>Dismiss message</VisuallyHidden>
      </button>
    </div>
  );
}

export default Toast;
