interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles = "rounded-xl font-semibold transition-all duration-200 cursor-pointer inline-flex items-center justify-center";

  const variants = {
    primary: "bg-[#e8820c] text-white hover:bg-[#d0740a] shadow-md shadow-[#e8820c]/25 hover:shadow-lg hover:shadow-[#e8820c]/30 active:scale-[0.98]",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200 hover:border-gray-300 active:scale-[0.98]",
    danger: "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 active:scale-[0.98]",
  };

  const sizes = {
    sm: "px-3.5 py-1.5 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3 text-base",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
