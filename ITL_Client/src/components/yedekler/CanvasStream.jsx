import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../css/index.css";
import { addCoord } from "../redux/reducers/canvasReducer";
import CustomCanvas from "./CustomCanvas";
import SettingsModal from "./modals/SettingsModal";

function CanvasStream({ isSetting }) {
  const dispatch = useDispatch();
  const { lights, isComplete } = useSelector((state) => state.canvasReducer);
  const canvasRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const webSocket = useRef(null);
  const [showSettings, setShowSettings] = useState(false);
  const [isDrawable, setIsDrawable] = useState(true);

  const [isStreamStarted, setIsStreamStarted] = useState(false);

  const openSettings = () => {
    setShowSettings(true);
  };

  const closeSettings = () => {
    setShowSettings(false);
  };
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    drawPoint();
  }, [lights]);

  useEffect(() => {
    // canvasRefs.forEach((ref) => {
    //   const canvas = ref.current;
    //   const context = canvas.getContext("2d");
    //
    //   context.fillStyle = "black"; // Splash rengi
    //   context.fillRect(0, 0, canvas.width, canvas.height); // Canvas boyutunda bir dikdörtgen çiz
    //   context.font = "30px Arial"; // Metin özellikleri
    //   context.fillStyle = "white"; // Metin rengi
    //   context.fillText("Yayin beklenmektedir!", 100, 250); // Metni belirli bir konuma yazdır
    // });
    webSocket.current = new WebSocket("ws://localhost:3000");

    webSocket.current.onopen = () => {
      console.log("WebSocket connected");
    };
    webSocket.current.onclose = () => {
      console.log("WebSocket disconnected");
    };

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

  const postCoords = async () => {
    if (!isComplete) {
      console.log("tum koordinatlar doldurulmalidir");
      return;
    }
    const data = [];

    lights.forEach((light) => {
      const { coords } = light;
      const canvasId = light.canvasRef.current.id;
      data.push({ coords, name: canvasId, isSetted: true });
    });
    webSocket.current.send(
      JSON.stringify({ event: "image_config", data: data }),
    );
  };

  const drawPoint = () => {
    if (isPaused) {
      lights.forEach((light) => {
        const canvas = light.canvasRef.current;
        const context = canvas.getContext("2d");
        light.coords.forEach((point) => {
          context.beginPath();
          context.arc(point[0], point[1], 2, 0, 2 * Math.PI);
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
      event.clientY,
    );

    const { x, y } = canvasCoordinates;
    const radius = 2;
    var imageData = context.getImageData(
      x - radius,
      y - radius,
      2 * radius,
      2 * radius,
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
            pieceCanvas.height,
          );
        }
      }
    };

    image.src = imageUrl;
  };

  return (
    <div className="max-w-screen-xl mx-auto">
      {
        //
        // <div className="flex justify-center my-4">
        //       <button
        //         className="px-4 py-2 mr-2 text-white bg-red-500 rounded hover:bg-red-600"
        //         onClick={openSettings}
        //       >
        //         Open Settings
        //       </button>
        //       <button
        //         className="px-4 mx-2 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        //         onClick={() => {
        //           postCoords();
        //         }}
        //       >
        //         Gonder
        //       </button>
        // <button
        //   className="px-4 py-2 ml-10 text-white bg-blue-500 rounded hover:bg-blue-600"
        //   onClick={() => {
        //     setIsDrawable(false);
        //     setIsPaused(!isPaused);
        //   }}
        // >
        //   {isPaused ? "Yayini Baslat" : "Durdur"}
        // </button>
        // //     // </div>
      }{" "}
      {isStreamStarted && (
        <button
          className="px-4 py-2 ml-10 text-white bg-blue-500 rounded hover:bg-blue-600"
          onClick={() => {
            setIsDrawable(false);
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
      {showSettings && (
        <SettingsModal
          closeSettings={closeSettings}
          postCoords={postCoords}
          configData={{
            x1: 991,
            y1: 660,
            x2: 1166,
            y2: 656,
            x3: 1678,
            y3: 1016,
            x4: 1601,
            y4: 1044,
            x5: 1067,
            y5: 1043,
            x6: 1007,
            y6: 725,
            window_sizes: {
              x: 969,
              y: 598,
              width: 700,
              height: 430,
            },
            name: "main_roi_1",
            config: {
              contour_threshold: 100,
              contour_distance: 0,
              contour_area_threshold: 50,
              min_y_threshold: 10,
              max_y_threshold: 50,
            },
          }}
        />
      )}
      <button
        className="text-black bg-red rounded"
        onClick={() => {
          postCoords();
        }}
      >
        Send
      </button>
    </div>
  );
}

export default CanvasStream;
