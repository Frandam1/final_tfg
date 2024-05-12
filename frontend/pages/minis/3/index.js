import React, { useState, useEffect } from 'react';

const Arkanoid = () => {
    const [isGameRunning, setIsGameRunning] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
  
    const startGame = () => {
      if (!isGameRunning) {
        setIsGameRunning(true);
      }
    };
  
    const resetGame = () => {
        setIsGameRunning(false);
        setTimeout(() => setIsGameRunning(true), 500); // un pequeño delay antes de reiniciar
      };
  
    useEffect(() => {
      if (isGameRunning) {
        const canvas = document.getElementById('mycanvas');
        const ctx = canvas.getContext('2d');
        let ballRadius = 10;
        let x = canvas.width / 2;
        let y = canvas.height - 30;
        let dx = 4; // Incrementar la velocidad
        let dy = -4; // Incrementar la velocidad
  
        let paddleHeight = 20;
        let paddleWidth = 100;
        let paddleX = (canvas.width - paddleWidth) / 2;
  
        let rightPressed = false;
        let leftPressed = false;
  
        let brickRowCount = 7; // Aumentar el número de filas
        let brickColumnCount = 8; // Aumentar el número de columnas
        let brickWidth = 72;
        let brickHeight = 24;
        let brickPadding = 12;
        let brickOffsetTop = 32;
        let brickOffsetLeft = 32;
  
        let score = 0;
  
        let bricks = [];
        for (let c = 0; c < brickColumnCount; c++) {
          bricks[c] = [];
          for (let r = 0; r < brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1 };
          }
        }
  
        const keyDownHandler = (e) => {
          if (e.keyCode === 39) rightPressed = true;
          else if (e.keyCode === 37) leftPressed = true;
        };
  
        const keyUpHandler = (e) => {
          if (e.keyCode === 39) rightPressed = false;
          else if (e.keyCode === 37) leftPressed = false;
        };
  
        const mouseMoveHandler = (e) => {
          let relativeX = e.clientX - canvas.offsetLeft;
          if (relativeX > 0 && relativeX < canvas.width) paddleX = relativeX - paddleWidth / 2;
        };
  
        const drawBall = () => {
          ctx.beginPath();
          ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
          ctx.fillStyle = 'lawngreen';
          ctx.fill();
          ctx.closePath();
        };
  
        const drawPaddle = () => {
          ctx.beginPath();
          ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
          ctx.fillStyle = 'lawngreen';
          ctx.fill();
          ctx.closePath();
        };
  
        const drawBricks = () => {
          for (let c = 0; c < brickColumnCount; c++) {
            for (let r = 0; r < brickRowCount; r++) {
              if (bricks[c][r].status === 1) {
                let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                // Dibujar ladrillos con bordes redondeados
                const radius = 8;
                ctx.moveTo(brickX + radius, brickY);
                ctx.lineTo(brickX + brickWidth - radius, brickY);
                ctx.arcTo(brickX + brickWidth, brickY, brickX + brickWidth, brickY + radius, radius);
                ctx.lineTo(brickX + brickWidth, brickY + brickHeight - radius);
                ctx.arcTo(brickX + brickWidth, brickY + brickHeight, brickX + brickWidth - radius, brickY + brickHeight, radius);
                ctx.lineTo(brickX + radius, brickY + brickHeight);
                ctx.arcTo(brickX, brickY + brickHeight, brickX, brickY + brickHeight - radius, radius);
                ctx.lineTo(brickX, brickY + radius);
                ctx.arcTo(brickX, brickY, brickX + radius, brickY, radius);
                ctx.fillStyle = '#6600cc';
                ctx.fill();
                ctx.closePath();
              }
            }
          }
        };
  
        const drawScore = () => {
          ctx.font = '18px Arial';
          ctx.fillStyle = 'white';
          ctx.fillText('score: ' + score, 8, 20);
        };
  
        const collisionDetection = () => {
          for (let c = 0; c < brickColumnCount; c++) {
            for (let r = 0; r < brickRowCount; r++) {
              let b = bricks[c][r];
              if (b.status === 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                  dy = -dy;
                  b.status = 0;
                  score++;
                  if (score === brickRowCount * brickColumnCount) {
                    alert('¡Felicidades! Has ganado.');
                    document.location.reload();
                  }
                }
              }
            }
          }
        };
  
        const draw = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          drawScore();
          drawBricks();
          drawBall();
          drawPaddle();
          collisionDetection();
  
          if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) dx = -dx;
          if (y + dy < ballRadius) dy = -dy;
          else if (y + dy > canvas.height - ballRadius) {
            if (x > paddleX && x < paddleX + paddleWidth) dy = -dy;
            else {
                resetGame()
            }
          }
  
          if (rightPressed && paddleX < canvas.width - paddleWidth) paddleX += 7;
          else if (leftPressed && paddleX > 0) paddleX -= 7;
  
          x += dx;
          y += dy;
        };
  
        document.addEventListener('keydown', keyDownHandler);
        document.addEventListener('keyup', keyUpHandler);
        document.addEventListener('mousemove', mouseMoveHandler);
  
        const id = setInterval(draw, 10);
        setIntervalId(id);
  
        return () => {
          clearInterval(id);
          document.removeEventListener('keydown', keyDownHandler);
          document.removeEventListener('keyup', keyUpHandler);
          document.removeEventListener('mousemove', mouseMoveHandler);
        };
      }
    }, [isGameRunning]);

  return (
    <div className='h-full transparent py-32 text-center xl:text-left'>
      <div className='container mx-auto h-full flex flex-col items-center xl:flex-row gap-x-6'>
        <canvas id="mycanvas" width="750" height="550" style={{ backgroundColor: 'black' }}></canvas>
        <div className='gap-x-3'>
          <h1 className='text-white text-3xl mb-3 bottom-12'>Arkanoid</h1>
          <p className='py-3 text-white text-lg'>Maneja la Vaus, tu plataforma deslizante, para mantener la bola en juego mientras destruyes
           ladrillos en la parte superior de la pantalla. El objetivo es simple: limpiar todos los ladrillos para avanzar a la siguiente ronda.
           Asegúrate de mantener la bola en movimiento; si la dejas caer, perderás una vida. Con cada ladrillo que rompas, aumentarás tu puntuación</p>
          <button onClick={startGame} className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4">Iniciar Juego</button>
          <button onClick={resetGame} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> Restear Juego </button>
        </div>
      </div>
    </div>
  );
};

export default Arkanoid;
