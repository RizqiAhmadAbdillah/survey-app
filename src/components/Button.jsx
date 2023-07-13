import React from "react";

function Button(props) {
  const { variant, text, iconLeft, iconRight, className, ...otherProps } =
    props;
  const variants = {
    primary: "bg-indigo-800 rounded text-white font-semibold",
    secondary: "bg-gray-400 rounded text-white font-semibold",
  };
  let primary = variants[variant];
  return (
    <button
      {...otherProps}
      className={`px-4 py-2 flex justify-center items-center gap-2 ${primary} ${className}`}
    >
      {iconLeft}
      {text}
      {iconRight}
    </button>
  );
}

export default Button;
