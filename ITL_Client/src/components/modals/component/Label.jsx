import React from "react";

const Label = ({ name }) => {
  return (
    <label className="block text-gray-700 text-sm font-bold mb-2 mx-2">
      {name}
    </label>
  );
};

export default Label;
