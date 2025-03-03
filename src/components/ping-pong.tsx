import React, { useRef, useEffect } from "react";

const PingPongGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Verifica se o canvas não é null

    const context = canvas.getContext("2d");
    if (!context) return; // Verifica se o contexto não é null

    const net = {
      x: canvas.width / 2 - 1,
      y: 0,
      width: 2,
      height: 10,
      color: "#FFF"
    };

    const user = {
      x: 0,
      y: canvas.height / 2 - 50,
      width: 10,
      height: 100,
      color: "#FFF",
      score: 0
    };

    const com = {
      x: canvas.width - 10,
      y: canvas.height / 2 - 50,
      width: 10,
      height: 100,
      color: "#FFF",
      score: 0
    };

    const ball = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      radius: 10,
      speed: 5,
      velocityX: 5,
      velocityY: 5,
      color: "#05EDFF"
    };

    const confettiParticles: any[] = [];

    const drawRect = (
      x: number,
      y: number,
      w: number,
      h: number,
      color: string
    ) => {
      context.fillStyle = color;
      context.fillRect(x, y, w, h);
    };

    const drawArc = (x: number, y: number, radius: number, color: string) => {
      context.fillStyle = color;
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2, false);
      context.closePath();
      context.fill();
    };

    const drawNet = () => {
      for (let i = 0; i <= canvas.height; i += 15) {
        drawRect(net.x, net.y + i, net.width, net.height, net.color);
      }
    };

    const drawText = (text: string, x: number, y: number) => {
      context.fillStyle = "#FFF";
      context.font = "75px fantasy";
      context.fillText(text, x, y);
    };

    const render = () => {
      drawRect(0, 0, canvas.width, canvas.height, "#000");
      drawText(user.score.toString(), canvas.width / 4, canvas.height / 5);
      drawText(com.score.toString(), (3 * canvas.width) / 4, canvas.height / 5);
      drawNet();
      drawRect(user.x, user.y, user.width, user.height, user.color);
      drawRect(com.x, com.y, com.width, com.height, com.color);
      drawArc(ball.x, ball.y, ball.radius, ball.color);
      drawConfetti();
    };

    const collision = (b: any, p: any) => {
      b.top = b.y - b.radius;
      b.bottom = b.y + b.radius;
      b.left = b.x - b.radius;
      b.right = b.x + b.radius;

      p.top = p.y;
      p.bottom = p.y + p.height;
      p.left = p.x;
      p.right = p.x + p.width;

      return (
        b.right > p.left &&
        b.bottom > p.top &&
        b.left < p.right &&
        b.top < p.bottom
      );
    };

    const resetBall = () => {
      ball.x = canvas.width / 2;
      ball.y = canvas.height / 2;
      ball.speed = 5;
      ball.velocityX = -ball.velocityX;
      confetti();
    };

    const confetti = () => {
      for (let i = 0; i < 50; i++) {
        confettiParticles.push({
          x: canvas.width / 2,
          y: canvas.height / 2,
          velocityX: Math.random() * 4 - 2,
          velocityY: Math.random() * 4 - 2,
          radius: Math.random() * 3 + 2,
          color: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
            Math.random() * 255
          )}, ${Math.floor(Math.random() * 255)})`
        });
      }
    };

    const drawConfetti = () => {
      confettiParticles.forEach((particle, index) => {
        drawArc(particle.x, particle.y, particle.radius, particle.color);
        particle.x += particle.velocityX;
        particle.y += particle.velocityY;
        particle.velocityY += 0.1; // Efeito de gravidade

        if (particle.y > canvas.height) {
          confettiParticles.splice(index, 1);
        }
      });
    };

    const update = () => {
      if (ball.x - ball.radius < 0) {
        com.score++;
        resetBall();
      } else if (ball.x + ball.radius > canvas.width) {
        user.score++;
        resetBall();
      }

      ball.x += ball.velocityX;
      ball.y += ball.velocityY;

      com.y += (ball.y - (com.y + com.height / 2)) * 0.1;

      if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.velocityY = -ball.velocityY;
      }

      const player = ball.x < canvas.width / 2 ? user : com;

      if (collision(ball, player)) {
        let collidePoint = ball.y - (player.y + player.height / 2);
        collidePoint = collidePoint / (player.height / 2);

        const angleRad = (Math.PI / 4) * collidePoint;
        const direction = ball.x < canvas.width / 2 ? 1 : -1;

        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = ball.speed * Math.sin(angleRad);

        ball.speed += 0.1;
      }
    };

    const game = () => {
      update();
      render();
    };

    const movePaddle = (evt: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      user.y = evt.clientY - rect.top - user.height / 2;
    };

    canvas.addEventListener("mousemove", movePaddle);

    const framePerSecond = 50;
    const loop = setInterval(game, 1000 / framePerSecond);

    return () => {
      clearInterval(loop);
      canvas.removeEventListener("mousemove", movePaddle);
    };
  }, []);

  return (
    <div>
      <canvas
        className="hidden md:flex"
        ref={canvasRef}
        width="800"
        height="400"
      ></canvas>
      <canvas
        className="flex md:hidden"
        ref={canvasRef}
        width="400"
        height="200"
      ></canvas>
    </div>
  );
};

export default PingPongGame;
