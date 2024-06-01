import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile, faGrin, faMeh, faFrown, faSadTear, faAnxious } from '@fortawesome/free-solid-svg-icons';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

import Circles from '../../components/Circles'
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';

const Animo = () => {

  const [mood, setMood] = useState('');
  const [reason, setReason] = useState('');
  const [allMoods, setAllMoods] = useState([]);
  const [showMoodsList, setShowMoodsList] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [moodsPerPage] = useState(3);

  const indexOfLastMood = currentPage * moodsPerPage;
  const indexOfFirstMood = indexOfLastMood - moodsPerPage;
  const currentMoods = allMoods.slice(indexOfFirstMood, indexOfLastMood);

  useEffect(() => {
    fetchAllMoods();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const today = new Date().toISOString().slice(0, 10);
    try {
      const response = await axios.post('http://localhost:8080/api/mood/save', {
        mood,
        reason,
        date: today
      });
      if (response.status === 201) {
        alert('Estado registrado con éxito');
        const newEntry = { mood, reason, date: today };
        setAllMoods([...allMoods, newEntry]);  // Añadir la nueva entrada al estado
        setMood('');
        setReason('');
      }
    } catch (error) {
      console.error('Error al registrar el estado:', error);
      alert('Hubo un error al registrar el estado. Inténtelo de nuevo.');
    }
  };

  const fetchAllMoods = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/mood/findAll');
      setAllMoods(response.data);
    } catch (error) {
      console.error('Error al obtener los estados:', error);
      alert('Hubo un error al obtener los estados de ánimo. Inténtelo de nuevo.');
    }
  };

  const updateChart = () => {
    const labels = allMoods.map(data => data.date);
    const moodLevels = {
      "Muy feliz": 10,
      "Feliz": 8,
      "Neutral": 6,
      "Triste": 5,
      "Muy triste": 3,
      "Ansioso": 2
    };
    const data = allMoods.map(data => ({
      x: data.date,
      y: moodLevels[data.mood]
    }));

    return {
      labels,
      datasets: [{
        label: 'Estado de Ánimo',
        data: data.map(item => item.y),
        fill: false,
        backgroundColor: 'rgba(153, 102, 255, 0.6)', // Color violeta semi-transparente
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 1
      }]
    };
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top'
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false
      }
    },
    responsive: true,
    maintainAspectRatio: false
  };

  const deleteMood = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:8080/api/mood/delete/${id}`);
        if (response.status === 200) {
            alert('Estado eliminado correctamente');
            // Filtra el estado de ánimo eliminado del estado local
            const updatedMoods = allMoods.filter(mood => mood.id !== id);
            setAllMoods(updatedMoods);
        } else {
            alert('Test Error al eliminar el estado de ánimo');
        }
    } catch (error) {
        console.error('Error al eliminar el estado de ánimo:', error);
        alert('Error al eliminar el estado de ánimo. Inténtelo de nuevo.');
    }
};


  const nextPage = () => {
    if (currentPage * moodsPerPage < allMoods.length) {
        setCurrentPage(prevPage => prevPage + 1);
    }
};

  const prevPage = () => {
      if (currentPage > 1) {
          setCurrentPage(prevPage => prevPage - 1);
      }
  };

  const IconOption = ({ icon, label, value }) => (
    <button type="button" onClick={() => setMood(value)} className={`p-2 rounded-full ${mood === value ? 'text-blue-500' : 'text-gray-400'} hover:text-blue-600`}>
      <FontAwesomeIcon icon={icon} className="w-10 h-10" />
    </button>
  );


  return (
    <div className='h-full bg-primary/30 py-32 text-center xl:text-left'>
      <Circles />
      <div className='container mx-auto h-full flex flex-col items-center xl:flex-row gap-x-6'>
        {/* PARTE IZQUIERDA */}
        <div className='flex-1 flex flex-col justify-center mb-10 pb-4'>
          <h1 className="text-center text-3xl font-bold mb-4">Seguimiento del Estado de Ánimo</h1>
          {!showMoodsList ? (
            <form className="mt-8" onSubmit={handleSubmit}>
              <div className="flex justify-between mb-6">
                <IconOption icon={faGrin} label="Muy feliz" value="Muy feliz" />
                <IconOption icon={faSmile} label="Feliz" value="Feliz" />
                <IconOption icon={faMeh} label="Neutral" value="Neutral" />
                <IconOption icon={faFrown} label="Triste" value="Triste" />
                <IconOption icon={faSadTear} label="Muy triste" value="Muy triste" />
                <IconOption icon={faSadTear} label="Ansioso" value="Ansioso" />
              </div>
              <textarea
                id="reason"
                className="text-white form-control text-2xl p-2 border border-gray-300 rounded-md w-full bg-pink-800/15"
                //style={{ background: "linear-gradient(to right, #9D50BB, #F797F9)" }} // purple a pink
                placeholder="Describe el motivo de tu estado de ánimo."
                value={reason}
                onChange={e => setReason(e.target.value)}
                rows="8"
              ></textarea>
              <div className='flex gap-4'>
                <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition-colors mt-4">
                  Registrar Estado
                </button>
                <button onClick={() => setShowMoodsList(true)} className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md transition-colors mt-4">
                  Ver Registros
                </button>
              </div>
            </form>
          ) : (
            <div>
            <button onClick={() => setShowMoodsList(false)} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition-colors">
                Volver al Formulario
            </button>
            {currentMoods.map((mood, index) => (
                <div key={index} className="text-white font-bold text-xl p-2 my-2 rounded-md" style={{ background: "linear-gradient(to right, #9D50BB, #9D50BB)" }}>
                    <p className='text-white'>{mood.mood} - {mood.reason}</p>
                    <p className='text-white text-sm py-1' >{mood.date}</p>
                    <button onClick={() => deleteMood(mood.id)} className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded-lg">
                        Eliminar
                     </button>
                </div>
            ))}
            <div className='flex justify-between gap-x-8'>
                <button onClick={prevPage} className={`w-1/2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-md transition-colors ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    Anterior
                </button>
                <button onClick={nextPage} className={`w-1/2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-md transition-colors ${currentPage * moodsPerPage >= allMoods.length ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    Siguiente
                </button>
            </div>
        </div>
    )}
        </div>
        {/* PARTE DERECHA */}
        <div className='flex flex-col w-full xl:max-w-[48%] h-[500px] bg-pink-800/15 ml-9'>
          <h1 className="text-2xl font-bold p-2">Temp de eeaa</h1>
          <Bar data={updateChart()} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Animo;
