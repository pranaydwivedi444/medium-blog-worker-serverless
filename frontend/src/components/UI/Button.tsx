import React from "react";
type ButtonType = {
  type: "button" | "submit" | "reset";
  children: React.ReactNode;
};
function Button({ type, children }: ButtonType) {
  return (
    <button
      className="text-white bg-gray-600 border-0 p-2 mt-2 w-full focus:outline-none hover:bg-gray-700 rounded text-lg"
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;
