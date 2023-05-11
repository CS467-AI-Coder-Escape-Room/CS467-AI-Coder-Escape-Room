import React, { useState, useEffect, useRef, Component } from 'react';
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three';

class Breakout extends Component {
    constructor(props) {
      super(props);
      this.canvasRef = React.createRef();
    }
  
    componentDidMount() {
      const canvas = this.canvasRef.current;
      const ctx = canvas.getContext('2d');
      this.setupGame(ctx);
    }
  
    setupGame(ctx) {
        // Paddle properties
        this.paddleWidth = 100;
        this.paddleHeight = 20;
        this.paddleX = (ctx.canvas.width - this.paddleWidth) / 2;
        this.paddleSpeed = 7;
        this.leftPressed = false;
        this.rightPressed = false;

        // Ball properties
        this.ballRadius = 10;
        this.ballX = ctx.canvas.width / 2;
        this.ballY = ctx.canvas.height - this.paddleHeight - this.ballRadius;
        this.ballSpeedX = 2;
        this.ballSpeedY = -2;

        // Bricks properties
        this.brickRows = 5;
        this.brickColumns = 9;
        this.brickWidth = 75;
        this.brickHeight = 20;
        this.brickPadding = 10;
        this.brickOffsetTop = 30;
        this.brickOffsetLeft = 30;
        this.bricks = [];

        for (let c = 0; c < this.brickColumns; c++) {
          this.bricks[c] = [];
          for (let r = 0; r < this.brickRows; r++) {
            this.bricks[c][r] = { x: 0, y: 0, status: 1 };
          }
        }

        // Event listeners
        document.addEventListener("keydown", this.handleKeyDown.bind(this));
        document.addEventListener("keyup", this.handleKeyUp.bind(this));

        this.updateGame(ctx);

    }

    handleKeyDown(e) {
      if (e.key === "ArrowLeft") {
        this.leftPressed = true;
      } else if (e.key === "ArrowRight") {
        this.rightPressed = true;
      }
    }

    handleKeyUp(e) {
      if (e.key === "ArrowLeft") {
        this.leftPressed = false;
      } else if (e.key === "ArrowRight") {
        this.rightPressed = false;
      }
    }
  
    updateGame(ctx) {
        // Clear canvas
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        // Draw bricks
        this.drawBricks(ctx);

        // Draw paddle
        this.drawPaddle(ctx);

        // Draw ball
        this.drawBall(ctx);

        // Update ball position and check for collisions
        this.updateBallPosition(ctx);

        // Update paddle position
        this.updatePaddlePosition(ctx);
  
        requestAnimationFrame(() => this.updateGame(ctx));
    }

    drawBricks(ctx) {
        for (let c = 0; c < this.brickColumns; c++) {
          for (let r = 0; r < this.brickRows; r++) {
            if (this.bricks[c][r].status === 1) {
              const brickX = c * (this.brickWidth + this.brickPadding) + this.brickOffsetLeft;
              const brickY = r * (this.brickHeight + this.brickPadding) + this.brickOffsetTop;
              this.bricks[c][r].x = brickX;
              this.bricks[c][r].y = brickY;
              ctx.beginPath();
              ctx.rect(brickX, brickY, this.brickWidth, this.brickHeight);
              ctx.fillStyle = "#ffffff";
              ctx.fill();
              ctx.closePath();
            }
          }
        }
    }
      
    drawPaddle(ctx) {
        ctx.beginPath();
        ctx.rect(this.paddleX, ctx.canvas.height - this.paddleHeight, this.paddleWidth, this.paddleHeight);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
        ctx.closePath();
    }
      
    drawBall(ctx) {
        ctx.beginPath();
        ctx.arc(this.ballX, this.ballY, this.ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
        ctx.closePath();
    }
      
    updateBallPosition(ctx) {
        // Check for collisions with bricks
        for (let c = 0; c < this.brickColumns; c++) {
          for (let r = 0; r < this.brickRows; r++) {
            const brick = this.bricks[c][r];
            if (brick.status === 1 && this.ballX > brick.x && this.ballX < brick.x + this.brickWidth && this.ballY > brick.y && this.ballY < brick.y + this.brickHeight) {
              this.ballSpeedY = -this.ballSpeedY;
              brick.status = 0;
            }
          }
        }

        // Check for collisions with walls and paddle
        if (this.ballX + this.ballSpeedX < this.ballRadius || this.ballX + this.ballSpeedX > ctx.canvas.width - this.ballRadius) {
            this.ballSpeedX = -this.ballSpeedX;
        }
        if (this.ballY + this.ballSpeedY < this.ballRadius) {
            this.ballSpeedY = -this.ballSpeedY;
        } else if (this.ballY + this.ballSpeedY + this.ballRadius > ctx.canvas.height - this.paddleHeight) {
            if (this.ballX > this.paddleX - this.ballRadius && this.ballX < this.paddleX + this.paddleWidth + this.ballRadius) {
                // Calculate the hit position (0 = left edge, 1 = right edge)
                const hitPosition = (this.ballX - this.paddleX) / this.paddleWidth;

                // Calculate the new angle based on the hit position (between -60 and 60 degrees)
                const angle = (hitPosition * 120 - 60) * (Math.PI / 180);

                // Update the ball speeds
                this.ballSpeedX = 2 * Math.cos(angle);
                this.ballSpeedY = -2 * Math.sin(angle);
            } else {
            // Game over
            // alert("Game Over");
            // document.location.reload();
            }
        }

        this.ballX += this.ballSpeedX;
        this.ballY += this.ballSpeedY;
    }

    updatePaddlePosition(ctx) {
        if (this.rightPressed && this.paddleX < ctx.canvas.width - this.paddleWidth) {
            this.paddleX += this.paddleSpeed;
        } else if (this.leftPressed && this.paddleX > 0) {
            this.paddleX -= this.paddleSpeed;
        }
    }
  
    render() {
      return (
        <canvas
          ref={this.canvasRef}
          width={800}
          height={600}
          style={{ border: '1px solid black', background: "black" }}
        />
      );
    }
  }
  
  export default Breakout;