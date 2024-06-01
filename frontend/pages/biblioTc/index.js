import React, { useState } from 'react';
import axios from 'axios';
// icons



//  data
const aboutData = [
  {
    title: 'Desviación',
    info: [
      {
        title: 'Involucra dirigir activamente tu mente lejos de pensamientos negativos o no productivos hacia pensamientos más positivos o útiles.',
        stage: 'Cuando empieces a preocuparte excesivamente sobre un evento futuro, intenta concentrarte en una tarea que requiera tu atención completa, como resolver un rompecabezas o practicar un hobby.',
      },
      {
        title: 'Utiliza esta técnica cuando te encuentres rumiando o preocupándote por cosas que no puedes controlar.',
        
      },
    ],
  },
  {
    title: 'Realidad',
    info: [
      {
        title: 'Te ayuda a cuestionar la veracidad de tus pensamientos negativos y a considerar si realmente tienen base en la realidad.',
        stage: 'Si te preocupa que todos te juzguen negativamente, podrías listar las evidencias reales que apoyan o contradicen este pensamiento.',
      },
      {
        title: 'Aplica esta técnica cuando tus pensamientos te lleven a conclusiones extremas que te hacen sentir peor sobre ti mismo o tu situación.',
        stage: '',
      },
    ],
  },
  {
    title: 'Alternativas',
    info: [
      {
        title: 'Consiste en buscar interpretaciones alternativas a los pensamientos negativos, lo que puede ayudarte a ver la situación desde una perspectiva más equilibrada y menos emocional.',
        stage: 'Si te sientes como un fracaso por no cumplir con una meta, intenta pensar en todas las veces que has tenido éxito.',
      },
      {
        title: 'Úsala cuando te sientas abrumado por los fracasos, para recordarte tus éxitos y capacidades.',
        stage: '',
      },

    ],
  },
  {
    title: 'Redimensionamiento',
    info: [
      {
        title: 'Esta técnica implica cambiar la escala de la importancia de tus preocupaciones, ayudándote a poner los problemas en una perspectiva más realista',
        stage: ' ',
      },
      {
        title: 'Cuando sientas que un problema es demasiado grande y te abruma, intenta visualizarlo como algo pequeño o menos significativo en el gran esquema de tu vida',
        stage: ' ',
      },
      {
        title: 'Utiliza esta técnica cuando te enfrentes a desafíos que parecen insuperables y necesites reducir la carga emocional que representan',
        stage: ' ',
      },
    ],
  },
];

//Componentes 
import Avatar from '../../components/Avatar';
import Circles from '../../components/Circles'
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';

const BiblioTc = () => {

  const [index, setIndex] = useState(0);
  const [showSavedExamples, setShowSavedExamples] = useState(false);
  const [personalExample, setPersonalExample] = useState('');
  const [personalApplication, setPersonalApplication] = useState('');
  const [technique, setTechnique] = useState('');
  const [entries, setEntries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(3);

  const savePersonalExample = async () => {
    if (personalExample && personalApplication && technique) {
      const newEntry = {
        tecnica: technique,
        ejemploPersonal: personalExample,
        aplicacionPersonal: personalApplication,
        fecha: new Date().toISOString()
      };

      try {
        const response = await axios.post('http://localhost:8080/api/biblioteca/save', newEntry);
        if (response.status === 201) {
          alert('Ejemplo guardado en persistencia!');
          setPersonalExample('');
          setPersonalApplication('');
          setTechnique('');
        } else {
          alert('Error al guardar el ejemplo en el servidor.');
        }
      } catch (error) {
        console.error('Error al guardar el ejemplo:', error);
        alert('Error al guardar el ejemplo en el servidor.');
      }
    } else {
      alert('Por favor, complete todos los campos.');
    }
  };

  const loadSavedEntries = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/biblioteca/findAll');
      if (response.status === 200) {
        setEntries(response.data);
        setShowSavedExamples(true);
      } else {
        console.error('Error al obtener los datos desde el backend:', response.status);
      }
    } catch (error) {
      console.error('Error al obtener los datos desde el backend:', error);
    }
  };

  const deleteEntry = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/biblioteca/delete/${id}`);
      if (response.status === 200) {
        alert('Ejemplo eliminado en el servidor!');
        loadSavedEntries(); // Actualiza la lista de entradas desde el backend
      } else {
        alert('Error al eliminar el ejemplo en el servidor.');
      }
    } catch (error) {
      console.error('Error al eliminar el ejemplo:', error);
      alert('Error al eliminar el ejemplo en el servidor.');
    }
  };

  // Calcular el índice de los últimos y primeros ejemplos en la página actual
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = entries.slice(indexOfFirstEntry, indexOfLastEntry);

  // Cambiar página
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className='h-full bg-primary/30 py-32 text-center xl:text-left'>
      <Circles />
      {/* Imagen Avatar */}
      <motion.div
        variants={fadeIn('right', 0.2)}
        initial='hidden'
        animate='show'
        exit='hidden'
        className='hidden xl:flex absolute bottom-0 -left-[370px]'>
        <Avatar />
      </motion.div>
      <div className='container mx-auto h-full flex flex-col items-center xl:flex-row gap-x-6'>
        {/* PARTE IZQUIERDA */}
        <div className='flex-1 flex flex-col justify-center mb-10 pb-4'>
          {!showSavedExamples ? (
            <>
              <h2 className='h2'>Biblioteca TC</h2>
              <form className='flex flex-col gap-4 px-2 xl:px-0'>
                <select value={technique} onChange={e => setTechnique(e.target.value)} className='select-custom'>
                  <option value=''>Seleccione una opción</option>
                  <option value='opcion1'>Desviación de Pensamientos</option>
                  <option value='opcion2'>Prueba de Realidad</option>
                  <option value='opcion3'>Búsqueda de Alternativas</option>

                </select>
                <textarea value={personalExample} onChange={e => setPersonalExample(e.target.value)} rows='4' placeholder='Ingresa un ejemplo personal' className='bg-gray-300/10 border border-gray-300 rounded-lg p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50' />
                <textarea value={personalApplication} onChange={e => setPersonalApplication(e.target.value)} rows='4' placeholder='Ingresa una aplicación personal' className='bg-gray-300/10 border border-gray-300 rounded-lg p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50' />
                <div className='flex gap-4'>
                  <button type='button' onClick={savePersonalExample} className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors'>
                    Guardar
                  </button>
                  <button type='button' onClick={loadSavedEntries} className='bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-lg transition-colors'>
                    Ver ejemplos guardados
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div>
              <h2 className='h2'>Ejemplos Guardados</h2>
              {currentEntries.map((entry) => (
                <div key={entry.id} className="flex justify-between items-center">
                  <p className='bg-pink-300/10 my-4 p-2 text-slate-50'>
                    <b>Técnica:</b> {entry.tecnica} |
                    <b> Fecha:</b> {new Date(entry.fecha).toLocaleDateString()} |
                    <b> Ejemplo:</b> {entry.ejemploPersonal} |
                    <b> Aplicación:</b> {entry.aplicacionPersonal}
                  </p>
                  <button onClick={() => deleteEntry(entry.id)} className='ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded'>
                    Eliminar
                  </button>
                </div>
              ))}
              <div>
                <button onClick={() => setCurrentPage(prev => prev > 1 ? prev - 1 : prev)} className='mr-2'>Anterior</button>
                <button onClick={() => setCurrentPage(prev => prev * entriesPerPage < entries.length ? prev + 1 : prev)} className='ml-2'>Siguiente</button>
              </div>
              <button type='button' onClick={() => setShowSavedExamples(false)} className='mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors'>
                Volver
              </button>
            </div>
          )}
        </div>
        {/* PARTE DERECHA */}
        <div className='flex flex-col w-full xl:max-w-[48%] h-[480px]'>
          {/* Frame Selector  */}
          <div className='flex gap-x-4 xl:gap-x-8 mx-auto xl:mx-0 mb-4'>
            {aboutData.map((item, itemIndex) => {
              return (
                <div key={itemIndex}
                  className={`${index === itemIndex && 'text-accent after:w-[100%] after:bg-accent after:transition-all after:duration-300'}
                cursor-pointer capitalize xl:text-lg relative after:w-8 after:h-[2px] after:bg-white after:absolute after:-bottom-1 after:left-0`}
                  onClick={() => setIndex(itemIndex)}
                >
                  {item.title}
                </div>
              );
            })}

          </div>
          <div className='bg-blue-400/15 py-2 px-2 xl:py-6 flex flex-col gap-y-2 xl:gap-y-4 items-center xl:items-start rounded-md'>
            {aboutData[index].info.map((item, itemIndex) => {
              return (
                <div key={itemIndex}>
                  {/* Titulo  */}
                  <div>{item.title}</div>
                  <div className='hidden md:flex'>_________________________________</div>
                  <div>{item.stage}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiblioTc;
