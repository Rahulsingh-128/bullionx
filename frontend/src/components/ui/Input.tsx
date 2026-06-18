import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = ({
  label,
  error,
  className = "",
  ...props
}: InputProps) => (
  <div className="flex flex-col gap-1">
    {label && <label className="text-sm text-gray-400">{label}</label>}
    <input
      className={`bg-surface-elevated border rounded-lg px-3 py-2 text-white text-sm outline-none
        focus:border-gold transition-colors
        ${error ? "border-red-500" : "border-surface-border"}
        ${className}`}
      {...props}
    />
    {error && <p className="text-xs text-red-400">{error}</p>}
  </div>
);
