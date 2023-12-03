import React from "react";

const Input = ({ value, onChange, isDisabled = false, name = "x" }) => {
  return (
    <input
      className="shadow appearance-none border rounded w-20 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id="x"
      name={name}
      type="text"
      value={value}
      onChange={onChange}
      disabled={isDisabled ? "disabled" : ""}
    />
  );
};

export default Input;
