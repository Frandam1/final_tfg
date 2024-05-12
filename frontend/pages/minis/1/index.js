import React, { useState, useEffect } from 'react';

const colors = ['red', 'green', 'blue', 'black', 'purple', 'yellow'];

const Parejas = () => {
    const [sequence, setSequence] = useState([]);
    const [userSequence, setUserSequence] = useState([]);
    const [gameStatus, setGameStatus] = useState('waiting');
    const [showingSequence, setShowingSequence] = useState(false);
    const [sequenceIndex, setSequenceIndex] = useState(0);
    const [activeColor, setActiveColor] = useState(null);


    useEffect(() => {
        //startGame();
    }, []);

    useEffect(() => {
        if (showingSequence && sequenceIndex < sequence.length) {
            const timeout = setTimeout(() => {
                setSequenceIndex(sequenceIndex + 1);
            }, 1000);
            return () => clearTimeout(timeout);
        } else if (sequenceIndex === sequence.length) {
            setShowingSequence(false);
            setSequenceIndex(0);  // Prepararse para la entrada del usuario
        }
    }, [showingSequence, sequenceIndex, sequence]);



    const startGame = () => {
        const newSequence = [randomColor()];
        setSequence(newSequence);
        setUserSequence([]);
        setShowingSequence(true);
        setSequenceIndex(0);
        setGameStatus('playing');
    };

    const resetGame = () => {
        setSequence([]);
        setUserSequence([]);
        setShowingSequence(false);
        setSequenceIndex(0);
        setGameStatus('waiting');
    };

    const randomColor = () => {
        return colors[Math.floor(Math.random() * colors.length)];
    };

    const addColorToSequence = () => {
        const newColor = randomColor();
        setSequence(prevSequence => [...prevSequence, newColor]);
        setUserSequence([]);
        setShowingSequence(true);
        setSequenceIndex(0);
    };
    const handleColorClick = (color) => {
        if (showingSequence || gameStatus !== 'playing') return;

        setActiveColor(color); // Establece el color activo para la animación
        setTimeout(() => setActiveColor(null), 200); // Resetea el color activo después de 200 ms

        const updatedUserSequence = [...userSequence, color];
        setUserSequence(updatedUserSequence);

        // Verificar si el último color seleccionado coincide con la secuencia
        if (updatedUserSequence[updatedUserSequence.length - 1] !== sequence[updatedUserSequence.length - 1]) {
            setGameStatus('lost');
            return;
        }

        // Comprobar si el usuario ha completado la secuencia actual
        if (updatedUserSequence.length === sequence.length) {
            if (sequence.length === 20) {  // Condición de victoria, ajustable según sea necesario
                setGameStatus('won');
                return;
            }
            setTimeout(() => {
                setUserSequence([]);
                setShowingSequence(true);
                setSequenceIndex(0);
                addColorToSequence();
            }, 1000);
        }
    };


    return (
        <div className='h-full bg-primary/30 py-32 text-center xl:text-left'>

            <div className='container bg-indigo-600/10 mx-auto h-full flex flex-col items-center xl:flex-row gap-x-6'>


                <div className='flex-1 flex flex-col justify-center items-center'>
                    <h1 className='text-white text-4xl mb-4 py-4 relative bottom-16'>¿Recuerdas la secuencia?</h1>
                    <p className='relative bottom-16 text-center text-white mx-16'>El objetivo del juego es simple: memorizar y repetir una secuencia creciente de colores.
                        Cada ronda, se mostrará un nuevo color que se añade a la secuencia existente.
                        Tu tarea es repetir la secuencia en el mismo orden tocando los colores correspondientes.
                        Si aciertas, la secuencia se alargará; si fallas, tendrás que empezar de nuevo.
                        ¿Estás listo para poner a prueba tu memoria y alcanzar el máximo puntaje?</p>
                    <div className='flex bg-sky-400/10 rounded-lg gap-4 p-2'>

                        {colors.map((color, index) => (
                            <div key={index}
                                className={`relative rounded-lg cursor-pointer transform transition duration-300 ease-in-out hover:ring-8 ${showingSequence && sequence[sequenceIndex] === color ? 'ring-4 ring-offset-2 ring-yellow-500' : ''} ${activeColor === color ? 'scale-90' : 'scale-100'} hover:ring-yellow-300`}
                                onClick={() => handleColorClick(color)}
                                style={{
                                    backgroundColor: color,
                                    width: 100,
                                    height: 100,
                                    margin: 10,
                                    opacity: showingSequence ? 0.5 : 1,
                                }}
                            />
                        ))}
                    </div>
                    <div className='py-10'>
                        <button onClick={startGame} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-2">
                            Iniciar Juego
                        </button>
                        <button onClick={resetGame} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-2">
                            Reiniciar Juego
                        </button>
                    </div>
                    {gameStatus === 'lost' && (
                        <div className='bg-indigo-600 rounded-lg border-2 border-blue-300'>
                            <h1 className='text-white text-3xl rounded-lg m-2 p-6 '>You lost. Try again!</h1>

                        </div>
                    )}
                    {gameStatus === 'won' && (
                        <div>
                            <p>Congratulations! You won!</p>
                            <button onClick={startGame}>Restart</button>
                        </div>
                    )}
                </div>

            </div>

        </div>

    );
};


export default Parejas;
