export function Button({
  children,
  loading,
  disabled,
  type = "button",
  onClick
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition ${
        disabled || loading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98]"
      } text-white`}
    >
      {loading && (
        <span className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></span>
      )}

      {children}
    </button>
  );
}