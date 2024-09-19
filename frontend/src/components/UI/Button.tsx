import React from "react";

type ButtonType = {
  type: "button" | "submit" | "reset";
  children: React.ReactNode;
  onClickHandler?: (event: React.MouseEvent<HTMLButtonElement>) => void; // Explicit void return type
  classname?:string;
};

function Button({ type, children, classname = "", onClickHandler = () => {} }: ButtonType) {
  return (
    <button
      onClick={onClickHandler}
      className={`text-white bg-gray-600 border-0 p-2 mt-2 w-full focus:outline-none hover:bg-gray-700 rounded text-lg ${classname}`}
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;
