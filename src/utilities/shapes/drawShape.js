const drawSquare = (canvas, coordinate) => {

  if (!canvas) return;
  const context = canvas.getContext("2d");
  if (!context) return;

  const { x: startX, y: startY } = coordinate.startCoordinate;
  const { x: endX, y: endY } = coordinate.endCoordinate;

  context.strokeRect(
    Math.min(startX, endX),
    Math.min(startY, endY),
    Math.abs(endX - startX),
    Math.abs(endY - startY)
  );

};

const drawCircle = (canvas, coordinate) => {
  if (!canvas) return;
  const context = canvas.getContext("2d");
  if (!context) return;

  const { x: startX, y: startY } = coordinate.startCoordinate;
  const { x: endX, y: endY } = coordinate.endCoordinate;

  context.beginPath();
  const radius = Math.sqrt(
    Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)
  );
  
  context.arc(startX, startY, radius, 0, 2 * Math.PI)
  context.stroke()
}

module.exports = {
  drawSquare,
  drawCircle
}