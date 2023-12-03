import React, { useEffect, useState } from "react";
import Input from "./Input";
import Label from "./Label";

const PointInput = ({ index, point }) => {
  const [coord, setCoord] = useState(point);
  useEffect(() => {
    setCoord(point);
  }, [point]);
  return (
    <div className="flex gap-4 ">
      <div className="flex items-center justify-center">
        <Label name={`x${index}:`} />
        <Input value={coord.x} readOnly onChange={() => {}} />
      </div>
      <div className="flex items-center justify-center">
        <Label name={`y${index}:`} />
        <Input value={coord.y} onChange={() => {}} />
      </div>
    </div>
  );
};

export default PointInput;
