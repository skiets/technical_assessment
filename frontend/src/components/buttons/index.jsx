export function PrimaryButton({
  click,
  children,
  className = "",
  type = "button",
}) {
  return (
    <button
      type={type}
      onClick={click}
      className={`bg-red-500 hover:bg-red-700 text-white font-semibold cursor-pointer px-5 py-3 rounded-[15px] shadow-md transition duration-300 ${className}`}
    >
      {children}
    </button>
  );
}

export function TextButton({
  click,
  children,
  className = "",
  padding = false,
}) {
  return (
    <button
      onClick={click}
      className={`font-semibold cursor-pointer rounded-[15px] hover:text-red-500 transition duration-300 ${className} ${
        !padding ? `px-5 py-3` : "!p-0 "
      } `}
    >
      {children}
    </button>
  );
}
