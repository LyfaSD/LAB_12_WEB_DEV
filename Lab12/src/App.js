import React, { useState } from 'react';
import './App.css';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  
  const [isXNext, setIsXNext] = useState(true);
  
  const [winner, setWinner] = useState(null);

  function checkWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  function handleClick(index) {
    if (board[index] || winner) {
      return;
    }

    const newBoard = board.slice();
    
    newBoard[index] = isXNext ? 'X' : 'O';
    
    setBoard(newBoard);
    
    setIsXNext(!isXNext);
    
    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    }
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  }

  function renderSquare(index) {
    return (
      <button 
        className="square" 
        onClick={() => handleClick(index)}
      >
        {board[index]}
      </button>
    );
  }

  let status;
  if (winner) {
    status = `Winner: ${winner}! 🎉`;
  } else {
    const isBoardFull = board.every(square => square !== null);
    if (isBoardFull) {
      status = "It's a tie! 😊";
    } else {
      status = `Next player: ${isXNext ? 'X' : 'O'}`;
    }
  }

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <div className="status">{status}</div>
      <div className="board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
}

export default App;

