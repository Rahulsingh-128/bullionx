import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export const Card = ({ children, className = "", ...props }: CardProps) => (
  <div
    className={`bg-surface-card border border-surface-border rounded-xl p-4 ${className}`}
    {...props}
  >
    {children}
  </div>
);
