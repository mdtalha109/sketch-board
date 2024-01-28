export const getSnapShot = (canvas) => {
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    let snapShot = context?.getImageData(0,0, canvas.width, canvas.height);
    return snapShot;
}
