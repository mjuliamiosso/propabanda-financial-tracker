import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  variant?: "filled" | "outlined";
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  variant = "filled",
  className = "",
  ...props
}: ButtonProps) {
  const baseClasses =
    "text-base px-4 py-2 rounded-full cursor-pointer font-semibold transition-all flex gap-2 items-center justify-center";

  const variants = {
    filled: "bg-[#FFA322] text-white",
    outlined: "bg-transparent border border-[#FFA322] text-[#FFA322]",
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
