import React, { useEffect, useState } from "react";
import PointInput from "./PointInput";

const PointList = ({ coords }) => {
  const [lightCoords, setLightCoords] = useState([]);
  useEffect(() => {
    coords.map((coord, index) => {
      const actualIndex = index + 1;
      setLightCoords((oldStates) => ({
        ...oldStates,
        [`x${actualIndex}`]: coord[`x${actualIndex}`] ?? 0,
        [`y${actualIndex}`]: coord[`y${actualIndex}`] ?? 0,
      }));
    });
  }, [coords]);
  const handleChange = () => {};

  return (
    <div className="p-2">
      <PointInput
        index={1}
        point={{ x: lightCoords.x1 ?? 0, y: lightCoords.y1 ?? 0 }}
      />
      <PointInput
        index={2}
        point={{ x: lightCoords.x2 ?? 0, y: lightCoords.y2 ?? 0 }}
      />
      <PointInput
        index={3}
        point={{ x: lightCoords.x3 ?? 0, y: lightCoords.y3 ?? 0 }}
      />
      <PointInput
        index={4}
        point={{ x: lightCoords.x4 ?? 0, y: lightCoords.y4 ?? 0 }}
      />
      <PointInput
        index={5}
        point={{ x: lightCoords.x5 ?? 0, y: lightCoords.y5 ?? 0 }}
      />
      <PointInput
        index={6}
        point={{ x: lightCoords.x6 ?? 0, y: lightCoords.y6 ?? 0 }}
      />
    </div>
  );
};

export default PointList;
