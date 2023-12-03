import React from "react";
import { FaCaretDown } from "react-icons/fa";

export const SelectionBox = ({ options, value, handleChange }) => {
  return (
    <div className="relative">
      <select
        className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 transition"
        value={value}
        onChange={handleChange}
      >
        {options.map((opt, index) => {
          return (
            <option key={index} className="py-2" value={opt}>
              {opt}
            </option>
          );
        })}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <FaCaretDown />
      </div>
    </div>
  );
};
