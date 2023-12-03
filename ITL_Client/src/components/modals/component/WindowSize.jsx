import React from "react";
import Input from "./Input";
import Label from "./Label";

const WindowSize = ({ size, handleChange }) => {
  return (
    <div className="flex flex-col w-full p-2 ">
      <div className="w-[250px]">
        <div className="flex gap-4 w-full justify-between">
          <div className="flex items-center justify-center ">
            <Label name={"x:"} />
            <Input onChange={handleChange} value={size && size.x} />
          </div>
          <div className="flex items-center justify-center">
            <Label name={"y:"} />
            <Input
              onChange={handleChange}
              labelName={`y:`}
              value={size && size.y}
            />
          </div>
        </div>
        <div className="flex gap-4 items-center w-full justify-between">
          <div className="flex flex-col">
            <Label name={"Genislik"} />
            <Label name={"Yukseklik"} />
          </div>
          <div className="flex flex-col">
            <Input onChange={handleChange} value={size && size.width} />
            <Input onChange={handleChange} value={size && size.height} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WindowSize;
