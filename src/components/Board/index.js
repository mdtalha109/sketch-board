import { actionItemClick } from '@/Redux/slice/menuSlice';
import { MENU_ITEMS } from '@/constants';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { socket } from '@/socket';
import { drawCircle, drawSquare } from '@/utilities/shapes/drawShape';
import { getSnapShot } from '@/utilities/snapShot';


const Board = () => {
  const dispatch = useDispatch()
  const canvasRef = useRef(null)
  const shouldDraw = useRef(false)
  const drawHistory = useRef([])
  const historyPointer = useRef(0)
  const { activeMenuItem, actionMenuItem } = useSelector((state) => state.menu)
  
  const { color, size } = useSelector((state) => state.toolbox[activeMenuItem])

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d')

    if (actionMenuItem === MENU_ITEMS.DOWNLOAD) {
      const URL = canvas.toDataURL()
      const anchor = document.createElement('a')
      anchor.href = URL
      anchor.download = 'sketch.jpg'
      anchor.click()
    }
    else if (actionMenuItem === MENU_ITEMS.UNDO || actionMenuItem === MENU_ITEMS.REDO) {

      if (historyPointer.current > 0 && actionMenuItem === MENU_ITEMS.UNDO) historyPointer.current -= 1
      if (historyPointer.current < drawHistory.current.length - 1 && actionMenuItem === MENU_ITEMS.REDO) historyPointer.current += 1
      const imageData = drawHistory.current[historyPointer.current]
      imageData && context.putImageData(imageData, 0, 0)
    }
    dispatch(actionItemClick(null))
  }, [actionMenuItem])

  // config change
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d')

    const changeConfig = (color, size) => {
      context.strokeStyle = color;
      context.lineWidth = size;
    }

    const handleChangeConfig = (config) => {
      changeConfig(config.color, config.size)
    }

    changeConfig(color, size)

    socket.on('changeConfig', handleChangeConfig)

    return () => {
      socket.off('changeConfig', handleChangeConfig)
    }

  }, [color, size])

  // initial width of canvas board
  useEffect(() => {
    const myCanvas = canvasRef.current;
    if (myCanvas) {
      myCanvas.width = window.innerWidth;
      myCanvas.height = window.innerHeight;
    }
  }, []);

  // to draw shapes
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.scale(1, 1)
    
    if(activeMenuItem == 'PENCIL' || activeMenuItem == 'ERASER'){
     
      const beginPath = (x, y) => {
        context.beginPath()
        context.moveTo(x, y)
      }
  
      const drawLine = (x, y) => {
        context.lineTo(x, y)
        context.stroke()
      }
  
  
      const handleMouseDown = (e) => {
        shouldDraw.current = true
        beginPath(e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY)
        context.moveTo(e.clientX, e.clientY)
        socket.emit('beginPath', {x: e.clientX, y: e.clientY})
      }
  
      const handleMouseMove = (e) => {
        if (!shouldDraw.current) {
          return
        }
        drawLine(e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY)
        socket.emit('drawLine', {x: e.clientX, y: e.clientY})
      }
  
      const handleMouseUp = (e) => {
  
        shouldDraw.current = false
        const imageData = getSnapShot(canvas);
        drawHistory.current.push(imageData)
        historyPointer.current = drawHistory.current.length - 1
      }

  
      canvas.addEventListener('mousedown', handleMouseDown)
      canvas.addEventListener('mousemove', handleMouseMove)
      canvas.addEventListener('mouseup', handleMouseUp)

      const handleBeginPath = (path) => {
        beginPath(path.x, path.y)
      }

      const handleDrawLine = (path) => {
        drawLine(path.x, path.y)
      }

      socket.on('beginPath', handleBeginPath)
      socket.on('drawLine', handleDrawLine)
  
  
      return () => {
        canvas.removeEventListener('mousedown', handleMouseDown)
        canvas.removeEventListener('mousemove', handleMouseMove)
        canvas.removeEventListener('mouseup', handleMouseUp)

        socket.off('beginPath', handleBeginPath)
        socket.off('drawLine', handleBeginPath)
  
    
      }
    }
    else if(activeMenuItem == 'SQUARE'){

      let snapshot;
      
      const coordinate = {
        startCoordinate: { x: 0, y: 0 },
        endCoordinate: { x: 0, y: 0 },
      };

      const handleMouseDown = (e) => {
        shouldDraw.current = true
        coordinate.startCoordinate = { x: e.clientX, y: e.clientY };
        snapshot = getSnapShot(canvas)
        socket.emit('beginSquare')
      }

      const handleMouseMove = (e) => {

        if (!shouldDraw.current) {
          return
        }

        context.putImageData(snapshot, 0, 0)
        coordinate.endCoordinate = { x: e.clientX, y: e.clientY };
        drawSquare(canvas, coordinate)
        socket.emit('drawSquare', coordinate)
      }

      const handleMouseUp = (e) => {
        shouldDraw.current = false
        const imageData = getSnapShot(canvas)
        drawHistory.current.push(imageData)
        historyPointer.current = drawHistory.current.length - 1
      }

      const handleDrawSquare = (coordinate) => {
        context.putImageData(snapshot, 0, 0)
        drawSquare(canvas, coordinate)
      }

      const handleBeginSquare = () => {
        snapshot = getSnapShot(canvas)
      }

      canvas.addEventListener('mousedown', handleMouseDown)
      canvas.addEventListener('mousemove', handleMouseMove)
      canvas.addEventListener('mouseup', handleMouseUp)

      socket.on('beginSquare', handleBeginSquare)
      socket.on('drawSquare', handleDrawSquare)

      return () => {
        canvas.removeEventListener('mousedown', handleMouseDown)
        canvas.removeEventListener('mousemove', handleMouseMove)
        canvas.removeEventListener('mouseup', handleMouseUp)

        socket.off('beginSquare', handleBeginSquare)
        socket.off('drawSquare', handleDrawSquare)
    
      }
    }
    else if (activeMenuItem == 'CIRCLE') {

      let snapshot;

      const coordinate = {
        startCoordinate: { x: 0, y: 0 },
        endCoordinate: { x: 0, y: 0 },
      };


      const handleMouseDown = (e) => {
        shouldDraw.current = true
        coordinate.startCoordinate = { x: e.clientX, y: e.clientY };
        snapshot = getSnapShot(canvas)
        socket.emit('beginCircle')
      }

      const handleMouseMove = (e) => {
        if (!shouldDraw.current) {
          return
        }

        context.putImageData(snapshot, 0, 0)
        coordinate.endCoordinate = { x: e.clientX, y: e.clientY };
        drawCircle(canvas, coordinate)
        socket.emit('drawCircle', coordinate)
        
      }

      const handleMouseUp = (e) => {
        shouldDraw.current = false
        const imageData = getSnapShot(canvas);
        drawHistory.current.push(imageData);
        historyPointer.current = drawHistory.current.length - 1;
      }

      canvas.addEventListener('mousedown', handleMouseDown)
      canvas.addEventListener('mousemove', handleMouseMove)
      canvas.addEventListener('mouseup', handleMouseUp)

      const handleBeginCircle = () => {
        snapshot = getSnapShot(canvas)
      }

      const handleDrawCircle = (coordinate) => {
        context.putImageData(snapshot, 0, 0)
        drawCircle(canvas, coordinate)
      }

      socket.on('beginCircle', handleBeginCircle);
      socket.on('drawCircle', handleDrawCircle);
      

      return () => {
        canvas.removeEventListener('mousedown', handleMouseDown)
        canvas.removeEventListener('mousemove', handleMouseMove)
        canvas.removeEventListener('mouseup', handleMouseUp)

        socket.off('beginCircle', handleDrawCircle);
        socket.off('drawCircle', handleDrawCircle);
      }
    }
    else if(activeMenuItem == 'ARROW'){
      
     
      const coordinate = {
        startCoordinate: { x: 0, y: 0 },
        endCoordinate: { x: 0, y: 0 },
      };

      const handleMouseDown = (event) => {
        shouldDraw.current  = true;
        coordinate.startCoordinate = {
          x: event.clientX,
          y: event.clientY,
        };
      };

      const handleMouseMove = (e) => {
        if (!shouldDraw.current) return;

        coordinate.endCoordinate = { x: e.clientX, y: e.clientY };

        const { x: startX, y: startY } = coordinate.startCoordinate;
        const { x: endX, y: endY } = coordinate.endCoordinate;

        // context.beginPath();
        // context.moveTo(startX, startY);
        // context.lineTo(endX, endY);
        // context.stroke();
      };

      const handleMouseUp = () => {
        shouldDraw.current  = false;

        const { x: startX, y: startY } = coordinate.startCoordinate;
        const { x: endX, y: endY } = coordinate.endCoordinate;

        // Draw the arrow
        

        var arrowSize = 10;

        context.moveTo(startX, startY);
        const angle = Math.atan2(endY - startY, endX - startX);

        context.beginPath();
        context.moveTo(startX, startY);
        context.lineTo(endX, endY);
        context.lineWidth = size;
        
        context.stroke();

        const arrowLeftX = endX - arrowSize * Math.cos(angle + Math.PI / 6);
        const arrowLeftY = endY - arrowSize * Math.sin(angle + Math.PI / 6);
        const arrowRightX = endX - arrowSize * Math.cos(angle - Math.PI / 6);
        const arrowRightY = endY - arrowSize * Math.sin(angle - Math.PI / 6);

        // Draw the arrowhead
        context.beginPath();
        context.lineWidth = size;
        
        context.moveTo(arrowLeftX, arrowLeftY);
        context.lineTo(endX, endY);
        context.stroke();
        context.lineTo(arrowRightX, arrowRightY);
        context.stroke();
        context.closePath();
        
       
      };

      canvas.addEventListener("mousedown", handleMouseDown);
      canvas.addEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("mouseup", handleMouseUp);

      return () => {
        canvas.removeEventListener("mousedown", handleMouseDown);
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseup", handleMouseUp);
      };
    }
    else if (activeMenuItem == 'PARALLELOGRAM') {
      const coordinate = {
        startCoordinate: { x: 0, y: 0 },
        endCoordinate: { x: 0, y: 0 },
      };
      let snapshot;
      let isDrawingParallelogram = {current: null};
      const handleStartParallelogram = (e) => {
        shouldDraw.current = true;
        isDrawingParallelogram.current = true;
        coordinate.startCoordinate = { x: e.clientX, y: e.clientY };
        snapshot = getSnapShot(canvas);
        socket.emit('beginParallelogram');
      };

      const handleMoveParallelogram = (e) => {
        if (!shouldDraw.current || !isDrawingParallelogram.current) {
          return;
        }

        context.putImageData(snapshot, 0, 0);
        coordinate.endCoordinate = { x: e.clientX, y: e.clientY };

        // Calculate the width and height of the parallelogram
        const width = coordinate.endCoordinate.x - coordinate.startCoordinate.x;
        const height = coordinate.endCoordinate.y - coordinate.startCoordinate.y;

        // Draw the parallelogram using a transformation matrix
        context.beginPath();
        context.setTransform(
          1, // Horizontal scaling
          0, // Horizontal skewing
          (coordinate.endCoordinate.x - coordinate.startCoordinate.x) / height, // Vertical skewing
          1, // Vertical scaling
          coordinate.startCoordinate.x, // Horizontal translation
          coordinate.startCoordinate.y // Vertical translation
        );
        context.rect(0, 0, width, height);
        context.stroke();
        context.setTransform(1, 0, 0, 1, 0, 0); // Reset the transformation matrix

        socket.emit('drawParallelogram', coordinate);
      };

      const handleEndParallelogram = (e) => {
        shouldDraw.current = false;
        isDrawingParallelogram.current = false;
        const imageData = getSnapShot(canvas);
        drawHistory.current.push(imageData);
        historyPointer.current = drawHistory.current.length - 1;
      };

      canvas.addEventListener('mousedown', handleStartParallelogram);
      canvas.addEventListener('mousemove', handleMoveParallelogram);
      canvas.addEventListener('mouseup', handleEndParallelogram);

      const handleBeginParallelogram = () => {
        snapshot = getSnapShot(canvas);
      };

      const handleDrawParallelogram = (coordinate) => {
       
        context.putImageData(snapshot, 0, 0);

        const width = coordinate.endCoordinate.x - coordinate.startCoordinate.x;
        const height = coordinate.endCoordinate.y - coordinate.startCoordinate.y;

        

        context.beginPath();
        context.setTransform(
          1,
          0,
          (coordinate.endCoordinate.x - coordinate.startCoordinate.x) / height,
          1,
          coordinate.startCoordinate.x,
          coordinate.startCoordinate.y
        );
        context.rect(0, 0, width, height);
        context.stroke();
        context.setTransform(1, 0, 0, 1, 0, 0);
      };

      socket.on('beginParallelogram', handleBeginParallelogram);
      socket.on('drawParallelogram', handleDrawParallelogram);

      return () => {
        canvas.removeEventListener('mousedown', handleStartParallelogram);
        canvas.removeEventListener('mousemove', handleMoveParallelogram);
        canvas.removeEventListener('mouseup', handleEndParallelogram);

        socket.off('beginParallelogram', handleBeginParallelogram);
        socket.off('drawParallelogram', handleDrawParallelogram);
      };
    }
    else if (activeMenuItem == 'HEXAGON') {
      let snapshot;
      
      const coordinate = {
        center: { x: 0, y: 0 },
        radius: 0,
      };
    
      const handleMouseDown = (e) => {
        shouldDraw.current = true;
        coordinate.center = { x: e.clientX, y: e.clientY };
        snapshot = context?.getImageData(0, 0, canvas.width, canvas.height);
      };
    
      const handleMouseMove = (e) => {
        if (!shouldDraw.current) {
          return;
        }
    
        context.putImageData(snapshot, 0, 0);
        
        coordinate.radius = Math.sqrt(
          Math.pow(e.clientX - coordinate.center.x, 2) + 
          Math.pow(e.clientY - coordinate.center.y, 2)
        );
    
        // Draw the hexagon based on center and radius
        drawHexagon(context, coordinate.center.x, coordinate.center.y, coordinate.radius);
      };
    
      const handleMouseUp = () => {
        shouldDraw.current = false;
    
        // Save the hexagon drawing state if needed
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        drawHistory.current.push(imageData);
        historyPointer.current = drawHistory.current.length - 1;
      };
    
      const drawHexagon = (ctx, x, y, radius) => {
        const sides = 6;
        ctx.beginPath();
        for (let i = 0; i < sides; i++) {
          const angle = (i * 2 * Math.PI) / sides;
          const newX = x + radius * Math.cos(angle);
          const newY = y + radius * Math.sin(angle);
          ctx.lineTo(newX, newY);
        }
        ctx.closePath();
        ctx.stroke();
      };
    
      canvas.addEventListener('mousedown', handleMouseDown);
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseup', handleMouseUp);
    
      return () => {
        canvas.removeEventListener('mousedown', handleMouseDown);
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseup', handleMouseUp);
      };
    }

  }, [activeMenuItem])

  return (
    <>
      <canvas ref={canvasRef}></canvas>
    </>
  )
}

export default Board