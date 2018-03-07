import React from 'react';
import Cell from './Cell.js'
import Reset from './Reset.js'

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    const initialState = {
      cells: Array(9).fill(null),
      xIsNext: true
    };
    return initialState
  }

  handleClick(i) {
    const cells = this.state.cells.slice();
    if (calculateWinner(cells) || cells[i]) {
      return;
    }
    cells[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      cells: cells,
      xIsNext: !this.state.xIsNext,
    });
  }

  handleResetClick() {
    this.setState(this.getInitialState());
  }

  renderCell(i) {
    const win = calculateWinner(this.state.cells);

    let winningCells
    let winningMove = false;

    if (win) {
      winningCells = win.winningCells;

      if (winningCells.includes(i)) {
        winningMove = true;
      }
    }

    return (
      <Cell
        key={i}
        value={this.state.cells[i]}
        highlight={winningMove}
        onClick={() => this.handleClick(i)}
      />
      );
  }

  renderResetButton() {
    return (
      <Reset
        onClick={() => this.handleResetClick()}
      />
      );
  }

  render() {
    const win = calculateWinner(this.state.cells);
    const reset = gameOver(this.state.cells);
    let status;
    let winningCells;

    if (win) {
      status = 'Winner: ' + win.winner;
      winningCells = win.winningCells;
    } else if (reset) {
      status = 'Tie';
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderCell(0)}
      {this.renderCell(1)}
      {this.renderCell(2)}
      </div>
      <div className="board-row">
        {this.renderCell(3)}
      {this.renderCell(4)}
      {this.renderCell(5)}
      </div>
      <div className="board-row">
        {this.renderCell(6)}
      {this.renderCell(7)}
      {this.renderCell(8)}
      </div>
      <div className="reset">{this.renderResetButton()}</div>
    </div>
    );
  }
}

function calculateWinner(cells) {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningCombos.length; i++) {
    const [a, b, c] = winningCombos[i];
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return {
        winner: cells[a],
        winningCells: winningCombos[i]
      }
    }
  }
  return null;
}

function gameOver(cells) {
  if (cells.every(cell => cell !== null)) {
    return true;
  }
  return null;
}
