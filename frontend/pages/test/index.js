import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Circles from '../../components/Circles'
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';

const Test = () => {

  const [selectedTest, setSelectedTest] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [testCompleted, setTestCompleted] = useState(false);
  const [adviceIndex, setAdviceIndex] = useState(0);


  const testTypes = {
    depression: {
      name: "Inventario de Depresión de Beck (BDI)",
      questions: [
        {
          question: "Elección sobre el estado de ánimo:",
          options: [
            "No me siento triste.",
            "Me siento triste.",
            "Estoy triste todo el tiempo y no puedo dejar de estarlo.",
            "Estoy tan triste o infeliz que no puedo soportarlo."
          ],
        },
        {
          question: "Pérdida de placer:",
          options: [
            "No he perdido el interés en otras actividades o personas.",
            "Estoy menos interesado que antes en otras personas o cosas.",
            "He perdido casi todo interés en otras personas o cosas.",
            "Me es difícil cualquier interés o placer en cualquier cosa."
          ],
        },
        {
          question: "Cambio en el patrón de sueño:",
          options: [
            "No he experimentado ningún cambio en mi patrón de sueño.",
            "Duermo un poco más o menos que lo habitual.",
            "Duermo mucho más o mucho menos que antes.",
            "Duermo casi todo el día o apenas duermo."
          ],
        }
      ],
      // Function to calculate results
    },
    selfEsteem: {
      name: "Inventario de Autoestima de Rosenberg",
      questions: [
        {
          question: "Siento que soy una persona digna de aprecio, al menos en igual medida que los demás.",
          options: ["Totalmente de acuerdo", "De acuerdo", "En desacuerdo", "Totalmente en desacuerdo"]
        }
      ],
      // Function to calculate results
    },
    anxiety: {
      name: "Inventario de Ansiedad de Beck (BAI)",
      questions: [
        {
          question: "Nivel de nerviosismo:",
          options: [
            "No me sentí nervioso.",
            "Me sentí nervioso ocasionalmente.",
            "Me sentí frecuentemente nervioso.",
            "Me sentí nervioso todo el tiempo."
          ]
        }
      ],
      // Function to calculate results
    }
  };

  const evaluateResult = (score, testKey) => {
    let message = "";
    if (testKey === "depression") {
      if (score <= 10) {
        message = "Tu nivel de depresión es bajo. Mantén un estilo de vida saludable y rodeate de personas positivas.";
      } else if (score <= 20) {
        message = "Es posible que estés experimentando signos moderados de depresión. Considera hablar con un profesional.";
      } else {
        message = "Los signos de depresión son significativos. Es importante buscar ayuda profesional lo antes posible.";
      }
    } else if (testKey === "selfEsteem") {
      if (score > 15) {
        message = "Tienes un nivel alto de autoestima. Continúa valorándote y aceptándote.";
      } else if (score > 8) {
        message = "Tu autoestima es moderada, pero podría mejorar. Recuerda reconocer tus logros y cualidades.";
      } else {
        message = "Podrías estar enfrentando problemas de baja autoestima. Hablar con un consejero podría ayudar.";
      }
    } else if (testKey === "anxiety") {
      if (score < 10) {
        message = "Tu nivel de ansiedad es bajo. Sigue gestionando bien el estrés.";
      } else if (score < 20) {
        message = "Muestras signos de ansiedad moderada. Técnicas de relajación y meditación pueden ser útiles.";
      } else {
        message = "Tu ansiedad parece ser alta. Considera buscar apoyo profesional para manejarla.";
      }
    }
    return message;
  };

  const advices = [
    "Mantén una rutina diaria para ayudarte a sentirte más estructurado.",
    "Habla de tus sentimientos con amigos, familiares o un terapeuta.",
    "Intenta hacer ejercicio regularmente, incluso si es solo una caminata corta.",
    "Establece metas realistas y celebra los pequeños logros.",
    "Recuerda que está bien pedir ayuda cuando la necesites."
  ];

  const handleNextAdvice = () => {
    setAdviceIndex((current) => (current + 1) % advices.length);
  };

  const handlePrevAdvice = () => {
    setAdviceIndex((current) => (current - 1 + advices.length) % advices.length);
  };


  const handleSelectTest = testKey => {
    setSelectedTest(testKey);
    setAnswers([]);
    setCurrentQuestionIndex(0);
    setResult(null);
  };

  const handleAnswer = (option) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < testTypes[selectedTest].questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      const score = calculateResult(newAnswers); // Suponemos que retorna un entero
      const resultMessage = evaluateResult(score, selectedTest);
      setResult({ score: score, message: resultMessage });
      setTestCompleted(true); // Indica que el test ha sido completado
    }
  };

  const resetTest = () => {
    setSelectedTest(null);  // Vuelve al selector
    setCurrentQuestionIndex(0);
    setAnswers([]);
    //setResult(null);
  };

  // Ejemplo de función para calcular los resultados
  const calculateResult = (answers) => {
    // Lógica simple: sumar puntos por respuesta (esto es solo un ejemplo)
    const points = answers.reduce((total, answer) => total + testTypes[selectedTest].questions[0].options.indexOf(answer), 0);
    return points;
  };

  const handleBackToSelect = () => {
    setSelectedTest(null);  // Regresa al selector
  };

  return (

    <div className='h-full bg-primary/30 py-32 text-center xl:text-left'>
      <Circles />
      <div className='container mx-auto h-full flex flex-col items-center xl:flex-row gap-x-6'>
        {/* PARTE IZQUIERDA */}
        <div className='flex-1 flex flex-col justify-center mb-10 pb-4'>
          {testCompleted ? (
            <>
              <h1 className='flex justify-center text-3xl mb-2 p-2'>Gracias por completar el test</h1>
              <p className='text-white text-center text-2xl mt-12 py-12 px-4 bg-pink-700/10 rounded mb-2  border-2 border-blue-500'>{result.message}</p>
              <p>Puntuación: {result.score}</p>
              <button onClick={() => { setTestCompleted(false); setSelectedTest(null); }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2">
                Volver al Selector de Tests
              </button>
            </>
          ) : selectedTest ? (
            <>
              <h1 className='text-white text-center text-xl bg-pink-700/10 rounded px-2 py-6 mb-3 '>{testTypes[selectedTest].name}</h1>
              <h2 className='text-white text-center text-3xl rounded px-2 py-6 mb-3'>{testTypes[selectedTest].questions[currentQuestionIndex].question}</h2>
              {testTypes[selectedTest].questions[currentQuestionIndex].options.map((option, index) => (
                <button key={index} onClick={() => handleAnswer(option)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2">
                  {option}
                </button>
              ))}
              <button onClick={() => setSelectedTest(null)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-2">
                Volver al Selector
              </button>
            </>
          ) : (
            <>
              <h1 className='text-white text-center text-3xl  rounded px-2 py-6 mb-6'>¿Que test te gustaría intentar?</h1>
              {Object.keys(testTypes).map(testKey => (
                <button key={testKey} onClick={() => handleSelectTest(testKey)} className="bg-blue-500 hover:bg-blue-700 text-white text-xl font-bold py-4 px-4 rounded mb-6">
                  {testTypes[testKey].name}
                </button>
              ))}
            </>
          )}
        </div>
        {/* PARTE DERECHA */}
        <div className='flex flex-col w-full xl:max-w-[48%] h-[500px] '>
          {/* Detalles del resultado para leer tranquilamente */}
          <h1 className='text-white text-center text-3xl bg-pink-700/10 rounded px-2 py-6 mb-3 border border-sky-500 '>Consejos Generales</h1>
          <p className='text-white text-center text-2xl mt-12 py-12 px-4 bg-pink-700/10 rounded mb-2  border-2 border-blue-500'>{advices[adviceIndex]}</p>
          <div className="flex justify-between mt-4">
            <button onClick={handlePrevAdvice} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Anterior
            </button>
            <button onClick={handleNextAdvice} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
