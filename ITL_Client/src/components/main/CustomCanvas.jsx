import { FaUndo, FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteCoord, clearCoords } from "../../redux/reducers/canvasReducer";

const CustomCanvas = ({ index, handleCanvasClick, canvasRef, isSetting }) => {
  const dispatch = useDispatch();

  return (
    <div
      className="relative flex flex-col items-center justify-center my-4"
      key={index}
    >
      <canvas
        id={`light_${index + 1}`}
        className="border-2 border-gray-300"
        ref={canvasRef}
        width={500}
        height={500}
        onClick={(event) => {
          if (isSetting) {
            handleCanvasClick(event, canvasRef);
          }
        }}
      ></canvas>
      {isSetting && (
        <div className="absolute px-5 top-2 left-2 flex mt-4">
          <div className="p-2 mr-2 text-gray-600 rounded-full hover:bg-gray-200 cursor-pointer">
            <FaUndo
              onClick={() => {
                dispatch(deleteCoord(`light_${index + 1}`));
              }}
            />
          </div>
          <div className="p-2 text-gray-600 rounded-full hover:bg-gray-200 cursor-pointer">
            <FaTrash
              onClick={() => {
                dispatch(clearCoords(`light_${index + 1}`));
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomCanvas;
