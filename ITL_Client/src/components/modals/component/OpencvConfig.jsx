import React from "react";
import Input from "./Input";
import Label from "./Label";

const OpencvConfig = ({ onChange, value }) => {
  return (
    <div className="p-3">
      <div className="flex flex-col w-[250px] gap-1">
        <div className="flex w-full items-center justify-between">
          <Label name={"Min_y_threshold:"} />
          <Input value={value} onChange={onChange} />
        </div>

        <div className="flex w-full items-center justify-between">
          <Label name={"Max_y_threshold:"} />
          <Input value={value} onChange={onChange} />
        </div>

        <div className="flex w-full items-center justify-between">
          <Label name={"Contour_threshold"} />
          <Input value={value} onChange={onChange} />
        </div>

        <div className="flex w-full items-center justify-between">
          <Label name={"Contour_distance:"} />

          <Input value={value} onChange={onChange} />
        </div>

        <div className="flex w-full items-center justify-between">
          <Label name={"Area_threshold"} />
          <Input value={value} onChange={onChange} />
        </div>
      </div>
    </div>
  );
};

export default OpencvConfig;
