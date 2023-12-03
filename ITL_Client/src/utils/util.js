export const removePoint = (canvas, x, y, imageData) => {
  const context = canvas.getContext("2d");
  const radius = 2;
  context.putImageData(imageData, x - radius, y - radius);
};
