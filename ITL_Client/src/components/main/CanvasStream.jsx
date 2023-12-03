import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../css/index.css";
import { addCoord, setWebSocket } from "../../redux/reducers/canvasReducer";
import CustomCanvas from "./CustomCanvas";
import SettingsModal from "../modals/SettingsModal";

function CanvasStream({ isSetting }) {
  const dispatch = useDispatch();
  const { lights, isComplete } = useSelector((state) => state.canvasReducer);
  const canvasRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const webSocket = useRef(null);
  const [showSettings, setShowSettings] = useState(false);

  const [isStreamStarted, setIsStreamStarted] = useState(true);

  const closeSettings = () => {
    setShowSettings(false);
  };
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    drawPoint();
  }, [lights]);

  useEffect(() => {
    canvasRefs.forEach((ref) => {
      const canvas = ref.current;
      const context = canvas.getContext("2d");
      context.fillStyle = "black";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.font = "30px Arial";
      context.fillStyle = "white";
      context.fillText("Yayin beklenmektedir!", 100, 250);
    });
    webSocket.current = new WebSocket("ws://localhost:3000");
    webSocket.current.onopen = () => {
      console.log("WebSocket connected");
    };
    webSocket.current.onclose = () => {
      console.log("WebSocket disconnected");
    };
    dispatch(setWebSocket(webSocket));
    return () => {
      webSocket.current.close();
    };
  }, []);

  useEffect(() => {
    webSocket.current.onmessage = (event) => {
      setIsStreamStarted(true);
      if (!isPaused) renderImage(event);
    };
  }, [isPaused]);

  const drawPoint = () => {
    if (isPaused) {
      lights.forEach((light) => {
        const canvas = light.canvasRef.current;
        const context = canvas.getContext("2d");
        light.coords.map((point, index) => {
          context.beginPath();
          context.arc(
            point[`x${index + 1}`],
            point[`y${index + 1}`],
            2,
            0,
            2 * Math.PI
          );
          context.fillStyle = "red";
          context.fill();
        });
      });
    }
  };
  const getCanvasCoordinates = (canvas, x, y) => {
    const canvasRect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / canvasRect.width;
    const scaleY = canvas.height / canvasRect.height;
    const canvasX = (x - canvasRect.left) * scaleX;
    const canvasY = (y - canvasRect.top) * scaleY;
    return { x: canvasX, y: canvasY };
  };
  const handleCanvasClick = async (event, canvasRef) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d", {
      willReadFrequently: true,
    });
    const id = canvas.id;
    const canvasCoordinates = getCanvasCoordinates(
      canvas,
      event.clientX,
      event.clientY
    );

    const { x, y } = canvasCoordinates;
    const radius = 2;
    var imageData = context.getImageData(
      x - radius,
      y - radius,
      2 * radius,
      2 * radius
    );
    if (isPaused) dispatch(addCoord({ canvasRef, id, x, y, imageData }));
  };

  const renderImage = (event) => {
    const arrayBuffer = event.data;
    const blob = new Blob([arrayBuffer], { type: "image/jpeg" });
    const imageUrl = URL.createObjectURL(blob);
    const image = new Image();
    image.onload = () => {
      const pieceWidth = image.width / 2;
      const pieceHeight = image.height / 2;
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
          const x = i * pieceWidth;
          const y = j * pieceHeight;
          const index = i * 2 + j;
          const pieceCanvas = canvasRefs[index].current;
          const pieceContext = pieceCanvas.getContext("2d");
          pieceContext.clearRect(0, 0, pieceCanvas.width, pieceCanvas.height);
          pieceContext.drawImage(
            image,
            x,
            y,
            pieceWidth,
            pieceHeight,
            0,
            0,
            pieceCanvas.width,
            pieceCanvas.height
          );
        }
      }
    };

    image.src = imageUrl;
  };

  return (
    <div className="max-w-screen-xl mx-auto">
      {isStreamStarted && (
        <button
          className="px-4 py-2 ml-10 text-white bg-blue-500 rounded hover:bg-blue-600"
          onClick={() => {
            setIsPaused(!isPaused);
          }}
        >
          {isPaused ? "Yayini Baslat" : "Yayini Durdur"}
        </button>
      )}
      <div className="grid grid-cols-2 gap-4 p-12">
        {canvasRefs.slice(0, 4).map((ref, index) => (
          <CustomCanvas
            key={index}
            canvasRef={ref}
            index={index}
            handleCanvasClick={handleCanvasClick}
            isSetting={isSetting}
          />
        ))}
      </div>
      {showSettings && <SettingsModal />}
    </div>
  );
}

export default CanvasStream;
