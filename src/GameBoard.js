import React, { Component } from "react";
import Score from "./Score";
import "./GameBoard.css";

const getRandomCoords = () => {
  const max = 490;
  const min = 10;
  const x = Math.floor((Math.random() * (max - min + 1) + min) / 10) * 10;
  const y = Math.floor((Math.random() * (max - min + 1) + min) / 10) * 10;
  return [x, y];
};

export default class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canvasWidth: "500",
      canvasHeight: "500",
      snakeCoords: [[0, 0], [10, 0], [20, 0], [30, 0], [40, 0]],
      direction: "RIGHT",
      foodCoords: getRandomCoords(),
      score: 0
    };
  }

  componentDidMount() {
    const canvas = this.refs.canvas;
    const context = canvas.getContext("2d");
    this.interval = setInterval(() => this.moveSnake(context), 35);
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentDidUpdate() {
    if (this.gameover()) {
      clearInterval(this.interval);
    } else {
      if (this.checkIfFoodIsEaten()) {
        const score = this.state.score;
        const updatedScore = score + 10;
        const snakeCoords = [...this.state.snakeCoords];
        snakeCoords.push(this.state.foodCoords);
        this.setState({
          score: updatedScore,
          foodCoords: getRandomCoords(),
          snakeCoords: snakeCoords
        });
      }
    }
  }

  checkIfFoodIsEaten = () => {
    const snakeCoords = [...this.state.snakeCoords];
    const head = snakeCoords[snakeCoords.length - 1];
    const [snakeX, snakeY] = head;
    const [foodX, foodY] = this.state.foodCoords;
    if (snakeX === foodX && snakeY === foodY) {
      return true;
    } else {
      return false;
    }
  };

  gameover = () => {
    const snakeCoords = [...this.state.snakeCoords];
    const head = snakeCoords[snakeCoords.length - 1];
    const [x, y] = head;
    // boundary collision
    if (x >= this.state.canvasWidth || x < 0) {
      this.stopGame();
      return;
    }
    if (y >= this.state.canvasHeight || y < 0) {
      this.stopGame();
      return;
    }

    // check for body collision
    snakeCoords.pop();
    snakeCoords.pop();
    for (let i = 0; i < snakeCoords.length; i++) {
      const [xToCheck, yToCheck] = snakeCoords[i];
      if (xToCheck === x && yToCheck === y) {
        this.stopGame();
      }
    }
  };

  stopGame = () => {
    clearInterval(this.interval);
  };

  moveSnake = context => {
    const snakeCoords = [...this.state.snakeCoords];
    const head = snakeCoords[snakeCoords.length - 1];
    const updatedXandY = this.updateXandYusingDirection(head);
    const [x, y] = updatedXandY;
    snakeCoords.push([x, y]);
    snakeCoords.shift();
    this.setState({
      snakeCoords: snakeCoords
    });
    this.drawSnake(context);
    this.drawFood(context);
  };

  handleKeyDown = e => {
    let updatedDirection;
    const keyCode = e.keyCode;
    switch (keyCode) {
      case 37:
        if (this.state.direction !== "RIGHT") {
          updatedDirection = "LEFT";
        }
        break;

      case 38:
        if (this.state.direction !== "DOWN") {
          updatedDirection = "UP";
        }
        break;

      case 39:
        if (this.state.direction !== "LEFT") {
          updatedDirection = "RIGHT";
        }
        break;

      case 40:
        if (this.state.direction !== "UP") {
          updatedDirection = "DOWN";
        }
        break;

      default:
        updatedDirection = null;
        break;
    }
    if (updatedDirection) {
      this.setState({
        direction: updatedDirection
      });
    }
  };

  updateXandYusingDirection = ([x, y]) => {
    switch (this.state.direction) {
      case "RIGHT":
        return [x + 10, y];

      case "LEFT":
        return [x - 10, y];

      case "UP":
        return [x, y - 10];

      case "DOWN":
        return [x, y + 10];

      default:
        return [(0, 0)];
    }
  };

  drawSnake = context => {
    context.clearRect(0, 0, this.state.canvasWidth, this.state.canvasHeight);
    this.state.snakeCoords.forEach(([x, y]) => {
      context.fillRect(x, y, 10, 10);
    });
  };

  drawFood = context => {
    const [x, y] = this.state.foodCoords;
    context.fillRect(x, y, 10, 10);
  };

  render() {
    const style = {
      border: "5px solid #777"
    };
    return (
      <div className="game">
        <Score currentScore={this.state.score} />
        <canvas
          width={this.state.canvasWidth}
          height={this.state.canvasHeight}
          style={style}
          ref="canvas"
        />
      </div>
    );
  }
}
