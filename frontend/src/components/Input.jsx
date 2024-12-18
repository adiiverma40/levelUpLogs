
import React, { forwardRef } from "react";

const Input = forwardRef(function Input(
  { label = "", placeholder = "", type = "text", ...props },
  ref
) {
  return (
    <div className="mb-4 w-3/4">
      {label && (
        <label className="mb-2 font-bold text-gray-700" htmlFor={props.id}>
          {label}
        </label>
      )}
      <input
        ref={ref} // Forward the ref
        type={type}
        placeholder={placeholder}
        className="hover:cursor-pointer px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        style={{ width: "100%" }}
        {...props} // Spread all other props, including those from react-hook-form
      />
    </div>
  );
});

export default Input;

