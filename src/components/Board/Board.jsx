import Square from '../Square/Square';
import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../Button/Button';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 50px);
  grid-template-rows: repeat(3, 50px);
`;

export const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (index) => {
    if (calculateWinner[squares] || squares[index]) {
      return;
    }
    const nextSquares = [...squares];
    if (xIsNext) {
      nextSquares[index] = 'X';
    } else {
      nextSquares[index] = 'O';
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  };

  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const calculateWinner = (squares) => {
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[b] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(squares);

  let status;

  if (winner) {
    status = 'Winner ' + winner;
  } else {
    status = 'Next Player: ' + (xIsNext ? 'X' : 'O');
  }

  const handleResetGame = () => {
    const nextSquares = [...squares];
    if (nextSquares) {
      setSquares([]);
    }
  };

  return (
    <>
      <h3>{status}</h3>
      <Container>
        <Square onSquareClick={() => handleClick(0)} value={squares[0]} />
        <Square onSquareClick={() => handleClick(1)} value={squares[1]} />
        <Square onSquareClick={() => handleClick(2)} value={squares[2]} />
        <Square onSquareClick={() => handleClick(3)} value={squares[3]} />
        <Square onSquareClick={() => handleClick(4)} value={squares[4]} />
        <Square onSquareClick={() => handleClick(5)} value={squares[5]} />
        <Square onSquareClick={() => handleClick(6)} value={squares[6]} />
        <Square onSquareClick={() => handleClick(7)} value={squares[7]} />
        <Square onSquareClick={() => handleClick(8)} value={squares[8]} />
      </Container>
      <div>
        <Button type='button' onClick={handleResetGame}>
          Reset Game
        </Button>
      </div>
    </>
  );
};
