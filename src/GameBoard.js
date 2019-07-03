import React, { Component } from "react";

export default class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canvasWidth: "300",
      canvasHeight: "300",
      snakeCoords: [[0, 0], [10, 0], [20, 0]],
      direction: "RIGHT"
    };
  }

  componentDidMount() {
    const canvas = this.refs.canvas;
    const context = canvas.getContext("2d");
    setInterval(() => this.moveSnake(context), 500);
    document.addEventListener("keydown", this.handleKeyDown);
  }

  moveSnake = context => {
    const snakeCoords = [...this.state.snakeCoords];
    const head = snakeCoords[snakeCoords.length - 1];
    const updatedXandY = this.updateXandYusingDirection(head);
    const [x, y] = updatedXandY;
    snakeCoords.push([x, y]);
    const coordsToRemove = snakeCoords.shift();
    this.setState({
      snakeCoords: snakeCoords
    });
    this.drawSnake(context, coordsToRemove);
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

  drawSnake = (context, [xToRemove]) => {
    context.clearRect(0, 0, this.state.canvasWidth, this.state.canvasHeight);
    this.state.snakeCoords.forEach(([x, y]) => {
      context.fillRect(x, y, 10, 10);
    });
  };

  render() {
    const style = {
      border: "1px solid #777"
    };
    return (
      <div>
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
