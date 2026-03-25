interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, id, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`border rounded-xl px-4 py-2.5 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#e8820c]/30 focus:border-[#e8820c] ${
          error ? "border-red-300 bg-red-50/50" : "border-gray-200 bg-gray-50/50 hover:border-gray-300"
        }`}
        {...props}
      />
      {error && <span className="text-xs text-red-600 font-medium">{error}</span>}
    </div>
  );
}
