import React, { useState, useEffect } from 'react';
import axios from 'axios';
// icons
import {
  FaHtml5,
  FaCss3,
  FaJs,
  FaReact,
  FaWordpress,
  FaFigma,
} from "react-icons/fa";

import {
  SiNextdotjs,
  SiFramer,
  SiAdobexd,
  SiAdobephotoshop,
} from "react-icons/si";


//  data
const aboutData = [
  {
    title: 'skills',
    info: [
      {
        title: 'Web Development',
        icons: [
          <FaHtml5 />,
          <FaCss3 />,
          <FaJs />,
          <FaReact />,
          <SiNextdotjs />,
          <SiFramer />,
          <FaWordpress />,
        ],
      },
      {
        title: 'UI/UX Design',
        icons: [<FaFigma />, <SiAdobexd />, <SiAdobephotoshop />],
      },
    ],
  },
  {
    title: 'awards',
    info: [
      {
        title: 'Webby Awards - Honoree',
        stage: '2011 - 2012',
      },
      {
        title: 'Adobe Design Achievement Awards - Finalist',
        stage: '2009 - 2010',
      },
    ],
  },
  {
    title: 'experience',
    info: [
      {
        title: 'UX/UI Designer - XYZ Company',
        stage: '2012 - 2023',
      },
      {
        title: 'Web Developer - ABC Agency',
        stage: '2010 - 2012',
      },
      {
        title: 'Intern - DEF Corporation',
        stage: '2008 - 2010',
      },
    ],
  },
  {
    title: 'credentials',
    info: [
      {
        title: 'Web Development - ABC University, LA, CA',
        stage: '2011',
      },
      {
        title: 'Computer Science Diploma - AV Technical Institute',
        stage: '2009',
      },
      {
        title: 'Certified Graphic Designer - ABC Institute, Los Angeles, CA',
        stage: '2006',
      },
    ],
  },
];

//Componentes 
import Avatar from '../../components/Avatar';
import Circles from '../../components/Circles'
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';

const Diario = () => {

  const [titulo, setTitulo] = useState('');
  const [fecha, setFecha] = useState('');
  const [desafios, setDesafios] = useState('');
  const [agradecimiento, setAgradecimiento] = useState('');
  const [diaries, setDiaries] = useState([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [diariesPerPage] = useState(2);
  const [editingDiary, setEditingDiary] = useState(null);

  useEffect(() => {
    fetchAllDiaries(); // Carga inicial de diarios al montar el componente
  }, []);

  const saveDiary = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    try {
      const response = await axios.post('http://localhost:8080/api/diario/save', {
        titulo,
        fecha,
        desafios,
        agradecimiento
      });
      if (response.status === 201) {
        alert('Diario guardado con éxito');
        // Limpiar los campos
        setTitulo('');
        setFecha('');
        setDesafios('');
        setAgradecimiento('');
      }
    } catch (err) {
      setError('Error al guardar el diario');
      console.error(err);
    }
  };

  const fetchAllDiaries = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/diario/findAll');
      if (response.status === 200) {
        setDiaries(response.data);
        setError('');
      }
    } catch (err) {
      setError('Error al obtener los diarios.');
      console.error(err);
    }
  };

  const indexOfLastDiary = currentPage * diariesPerPage;
  const indexOfFirstDiary = indexOfLastDiary - diariesPerPage;
  const currentDiaries = diaries.slice(indexOfFirstDiary, indexOfLastDiary);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const deleteDiary = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/diario/delete/${id}`);
      if (response.status === 200) {
        alert('Diario eliminado correctamente');
        fetchAllDiaries(); // Recargar los diarios después de eliminar
      } else {
        alert('Error al eliminar el diario');
      }
    } catch (err) {
      console.error('Error al eliminar el diario:', err);
      alert('Error al eliminar el diario');
    }
  };

  const startEdit = (diary) => {
    setEditingDiary({ ...diary });
  };

  const handleEditChange = (e) => {
    setEditingDiary({ ...editingDiary, [e.target.name]: e.target.value });
  };

  const submitEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8080/api/diario/update/${editingDiary.id}`, editingDiary);
      if (response.status === 200) {
        alert('Diario actualizado correctamente');
        fetchAllDiaries();
        setEditingDiary(null); // Cierra el formulario de edición
      } else {
        alert('Error al actualizar el diario');
      }
    } catch (err) {
      console.error('Error al actualizar el diario:', err);
      alert('Error al actualizar el diario');
    }
  };

  const updateDiary = async (diary) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/diario/update/${diary.id}`, diary);
      if (response.status === 200) {
        alert('Diario actualizado correctamente');
        fetchAllDiaries(); // Recargar los diarios después de actualizar
      } else {
        alert('Error al actualizar el diario');
      }
    } catch (err) {
      console.error('Error al actualizar el diario:', err);
      alert('Error al actualizar el diario');
    }
  };

  return (
    <div className='h-full bg-primary/30 py-32 text-center xl:text-left'>
      <Circles />
      {/* Imagen Avatar */}
      <motion.div
        variants={fadeIn('right', 0.2)}
        initial='hidden'
        animate='show'
        exit='hidden'
        className='hidden xl:flex absolute bottom-0 -left-[420px]'>
        <Avatar />
      </motion.div>
      <div className='container mx-auto h-full flex flex-col items-center xl:flex-row gap-x-6'>
        {/* PARTE IZQUIERDA */}
        <div className='flex-1 flex flex-col justify-center'>
          <h2 className='h2'>Diario</h2>
          <div className='max-w-[500px] mx-auto xl:mx-0 mb-6 xl:mb-12 px-2 xl:px-0'>
            <form className='space-y-4' onSubmit={saveDiary}>
              <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Título"
                className="bg-gray-300/10 w-full text-white text-lg p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
              <input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                className="bg-gray-300/10 w-full text-white text-lg p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
              <textarea
                rows="4"
                value={desafios}
                onChange={(e) => setDesafios(e.target.value)}
                placeholder="Describe cómo fue tu día"
                className="bg-gray-300/10 w-full text-white text-lg p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 resize-none"
              ></textarea>
              <textarea
                rows="4"
                value={agradecimiento}
                onChange={(e) => setAgradecimiento(e.target.value)}
                placeholder="¿Por qué estás agradecido de seguir viviendo?"
                className="bg-gray-300/10 w-full text-white text-lg p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 resize-none"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition-colors"
              >
                Guardar
              </button>
            </form>
          </div>
        </div>
        {/* PARTE DERECHA */}
        <div className='flex flex-col w-full xl:max-w-[48%] h-[480px]'>
          <div className=' py-2 xl:py-6 flex flex-col gap-y-2 xl:gap-y-4 items-center xl:items-start'>
            {error && <p className="text-red-500">{error}</p>}
            {currentDiaries.map((diary, index) => (
              <div key={index} className="w-full bg-blue-400/10 p-2 rounded-lg shadow">
                <h3 className="text-3xl font-bold pb-2 text-purple-600">{diary.titulo}</h3>
                <p className="text-sm text-pink-400">{new Date(diary.fecha).toLocaleDateString()}</p>
                <p className="text-xl text-white my-2">{diary.desafios}</p>
                <p className="text-xl text-white my-2">{diary.agradecimiento}</p>
                <div className="flex justify-between">
                  <button onClick={() => startEdit(diary)} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-4 rounded-lg transition-colors">
                    Actualizar
                  </button>
                  <button onClick={() => deleteDiary(diary.id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-4 rounded-lg transition-colors">
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
            <div className='flex justify-between w-full p-4'>
              <button
                disabled={currentPage === 1}
                onClick={() => paginate(currentPage - 1)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:opacity-50">
                Anterior
              </button>
              <button
                disabled={currentPage * diariesPerPage >= diaries.length}
                onClick={() => paginate(currentPage + 1)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:opacity-50">
                Siguiente
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Si editingDiary no es null, mostrar formulario de edición */}
      {editingDiary && (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center">      
          <form onSubmit={submitEdit} className="bg-gray-700 p-4 rounded-lg flex flex-col gap-4 w-[480px]">
            <input
              type="text"
              name="titulo"
              value={editingDiary.titulo}
              onChange={handleEditChange}
              className="p-2 border border-gray-300 bg-pink-700 rounded"
            />
            <input
              type="date"
              name="fecha"
              value={editingDiary.fecha}
              onChange={handleEditChange}
              className="p-2 border border-gray-300 bg-pink-700 rounded"
            />
            <textarea
              name="desafios"
              rows="4"
              value={editingDiary.desafios}
              onChange={handleEditChange}
              className="p-2 border border-gray-300 bg-pink-700 rounded"
            ></textarea>
            <textarea
              name="agradecimiento"
              rows="4"
              value={editingDiary.agradecimiento}
              onChange={handleEditChange}
              className="p-2 border border-gray-300 bg-pink-700 rounded"
            ></textarea>
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded">
              Guardar Cambios
            </button>
            <button onClick={() => setEditingDiary(null)} className="bg-red-500 hover:bg-red-600 text-white p-2 rounded">
              Cancelar
            </button>
          </form>
        </div>
  
      )}
    </div>
  );
};

export default Diario;
