import React, { useState, useEffect } from 'react';

const TicTacToe = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isPlayerTurn, setIsPlayerTurn] = useState(true);
    const [winner, setWinner] = useState(null);

    useEffect(() => {
        // Comprobar si es turno de la computadora y el juego sigue activo
        if (!isPlayerTurn && !winner) {
            setTimeout(computerMove, 500); // Da un pequeño delay antes del movimiento de la computadora
        }
    }, [isPlayerTurn, board, winner]);

    const checkWinner = (board) => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        for (let line of lines) {
            const [a, b, c] = line;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                setWinner(board[a]);
                return;
            }
        }
        if (board.every(cell => cell !== null)) {
            setWinner('Empate');
        }
    };

    const handleCellClick = (index) => {
        if (board[index] || winner || !isPlayerTurn) return;
        makeMove(index, 'X');
        setIsPlayerTurn(false);
    };

    const computerMove = () => {
        const availablePositions = board.map((cell, index) => cell === null ? index : null).filter(val => val !== null);
        const randomPosition = availablePositions[Math.floor(Math.random() * availablePositions.length)];
        if (randomPosition !== undefined) {
            makeMove(randomPosition, 'O');
            setIsPlayerTurn(true);
        }
    };

    const makeMove = (index, symbol) => {
        const newBoard = [...board];
        newBoard[index] = symbol;
        setBoard(newBoard);
        checkWinner(newBoard);
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setIsPlayerTurn(true);
        setWinner(null);
    };

    return (
        <div className='flex flex-col items-center justify-center h-full'>
          <h1 className='text-white text-3xl p-2 m-4 relative bottom-12'>Bienvenido al clásico juego de Tic-Tac-Toe</h1>
          <p className='relative bottom-8 text-white text-md w-[800px]'>En este juego, tu objetivo es alinear tres de tus símbolos, que pueden ser 'X' o 'O', en una línea ya sea horizontal, vertical o diagonalmente. Jugarás contra la computadora alternando turnos.
            
           Elige una celda vacía en cada turno para colocar tu símbolo y trata de vencer a la computadora antes 
           de que ella complete su línea de tres.  </p>
            <div className='grid grid-cols-3 gap-3 my-4 bg-indigo-600/10 rounded-2xl p-10'>
                {board.map((cell, index) => (
                    <div key={index} 
                         className={`flex  rounded-lg h1 my-1 mx-2 items-center justify-center w-24 h-24 cursor-pointer ${cell ? (cell === 'X' ? 'text-red-500' : 'text-blue-500') : 'bg-green-500'} transition duration-300 ease-in-out hover:bg-gray-200`}
                         onClick={() => handleCellClick(index)}>
                        {cell}
                    </div>
                ))}
            </div>
            {winner && <p className='text-3xl mt-4 font-bold'>{`Ganador: ${winner}`}</p>}
            <button onClick={resetGame} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Reiniciar juego
            </button>
        </div>
    );
};

export default TicTacToe;
