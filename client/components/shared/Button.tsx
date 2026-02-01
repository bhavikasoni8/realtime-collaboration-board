type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export default function Button({
  variant = "primary",
  className = "",
  ...props
}: Props) {
  const base = "px-4 py-2.5 rounded-xl text-sm font-semibold transition-all";

  const variants = {
    primary:
      "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg",
    secondary: "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50",
  };

  return (
    <button
      {...props}
      className={`${base} ${variants[variant]} ${className}`}
    />
  );
}
