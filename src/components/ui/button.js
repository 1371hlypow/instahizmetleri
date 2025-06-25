export function Button({ children, onClick, className, variant = "default" }) {
  const base = "py-2 px-4 rounded text-white font-semibold";
  const styles = {
    default: "bg-blue-600 hover:bg-blue-700",
    outline: "bg-white border border-gray-400 text-black"
  };
  return (
    <button onClick={onClick} className={`${base} ${styles[variant]} ${className}`}>
      {children}
    </button>
  );
}