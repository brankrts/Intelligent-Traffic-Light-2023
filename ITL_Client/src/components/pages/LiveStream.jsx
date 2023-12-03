import React, { useEffect, useRef, useState } from "react";
import CustomCanvas from "../main/CustomCanvas";

function LiveStream() {
  const canvasRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const webSocket = useRef(null);

  useEffect(() => {
    canvasRefs.forEach((ref) => {
      const canvas = ref.current;
      const context = canvas.getContext("2d");

      context.fillStyle = "black"; // Splash rengi
      context.fillRect(0, 0, canvas.width, canvas.height); // Canvas boyutunda bir dikdörtgen çiz
      context.font = "30px Arial"; // Metin özellikleri
      context.fillStyle = "white"; // Metin rengi
      context.fillText("Yayin beklenmektedir!", 100, 250); // Metni belirli bir konuma yazdır
    });

    webSocket.current = new WebSocket("ws://localhost:3000");

    webSocket.current.onopen = () => {
      console.log("WebSocket connected");
    };
    webSocket.current.onclose = () => {
      console.log("WebSocket disconnected");
    };
    webSocket.current.onmessage = (event) => {
      renderImage(event);
    };

    return () => {
      webSocket.current.close();
    };
  }, []);

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
    <div className="w-full min-h-screen  ">
      <div className="max-w-screen-xl ">
        <div className="grid grid-cols-2 gap-4">
          {canvasRefs.slice(0, 4).map((ref, index) => (
            <CustomCanvas
              key={index}
              canvasRef={ref}
              index={index}
              isSetting={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default LiveStream;
