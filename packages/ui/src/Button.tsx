import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode;
  variant?: ButtonVariant;
};

export const Button = ({
  children = "Run action",
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={[styles.btn, styles[variant], className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </button>
  );
};
