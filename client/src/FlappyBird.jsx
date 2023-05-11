import React, { Component } from 'react';

class FlappyBird extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intervalId: null,
    };
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    this.setupGame();
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  setupGame() {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');
    this.setState({
      bird: {
        x: canvas.width / 2,
        y: canvas.height / 2,
        size: 20,
        dy: 1,
      },
      pipes: [],
      pipeWidth: 80,
      pipeGap: 200,
      distanceBetweenPipes: 300,
      score: 0,
      intervalId: setInterval(() => this.updateGame(ctx), 20),
    });
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Space') {
        this.flap();
      }
    });
  }

  flap() {
    this.setState((prevState) => ({
      bird: {
        ...prevState.bird,
        dy: -5,
      },
    }));
  }

  updateGame(ctx) {
    const { bird, pipes, pipeWidth, pipeGap, distanceBetweenPipes } = this.state;

    // Clear the canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Update bird position
    this.setState((prevState) => ({
      bird: {
        ...prevState.bird,
        y: prevState.bird.y + prevState.bird.dy,
        dy: prevState.bird.dy + 0.18,
      },
    }));

    // Check for collisions
    if (bird.y < 0 || bird.y + bird.size > ctx.canvas.height) {
      this.gameOver();
      return;
    }

    // Update pipes
    if (pipes.length === 0 || pipes[pipes.length - 1].x + pipeWidth + distanceBetweenPipes < ctx.canvas.width) {
      const pipeHeight = Math.random() * (ctx.canvas.height - pipeGap - 100) + 50;
      pipes.push({ x: ctx.canvas.width, height: pipeHeight });
    }

    pipes.forEach((pipe, index) => {
      pipe.x -= 2;
      if (pipe.x + pipeWidth < 0) {
        pipes.splice(index, 1);
        this.setState((prevState) => ({ score: prevState.score + 1 }));
      }

      // Check for collisions
      if (
        (bird.x + bird.size > pipe.x && bird.x < pipe.x + pipeWidth) &&
        (bird.y < pipe.height || bird.y + bird.size > pipe.height + pipeGap)
      ) {
        this.gameOver();
        return;
      }
    });

    this.setState({ pipes });

    // Draw bird
    ctx.fillStyle = 'red';
    ctx.fillRect(bird.x, bird.y, bird.size, bird.size);

    // Draw pipes
    ctx.fillStyle = 'green';
    pipes.forEach((pipe) => {
      ctx.fillRect(pipe.x, 0, pipeWidth, pipe.height);
      ctx.fillRect(pipe.x, pipe.height + pipeGap, pipeWidth, ctx.canvas.height - pipe.height - pipeGap);
    });

    // Draw score
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${this.state.score}`, 10, 30);
  }

  gameOver() {
    clearInterval(this.state.intervalId);
    alert(`Game Over! Your score is ${this.state.score}`);
    this.setupGame();
  }

  render() {
    return <canvas ref={this.canvasRef} width="800" height="400" />;
  }
}

export default FlappyBird;