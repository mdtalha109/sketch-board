export const drawRectangle = ({
    coordinate,
    canvas,
  }) => {
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