interface BadgeProps {
  children: React.ReactNode;
  variant?: "green" | "red" | "gold" | "silver" | "neutral";
}

export const Badge = ({ children, variant = "neutral" }: BadgeProps) => {
  const variants = {
    green: "bg-green-900/40 text-green-400",
    red: "bg-red-900/40 text-red-400",
    gold: "bg-yellow-900/40 text-gold",
    silver: "bg-gray-700/40 text-silver",
    neutral: "bg-surface-elevated text-gray-400",
  };
  return (
    <span
      className={`text-xs font-medium px-2 py-0.5 rounded-full ${variants[variant]}`}
    >
      {children}
    </span>
  );
};

