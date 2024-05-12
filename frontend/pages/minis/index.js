import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Circles from '../../components/Circles'
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';

const Minis = () => {

  const router = useRouter(); 

  const handleCardClick = (path) => {
    router.push(path); 
  };

  const cards = [
    { id: 1, titulo: "Parejas", descripcion: "Intenta seguir la secuencia de colores", imageUrl: "https://picsum.photos/200/300?random=1" },
    { id: 2, titulo: "Tic-Tac-Toe", descripcion: "El clasico juego del tres en raya", imageUrl: "https://picsum.photos/200/300?random=2" },
    { id: 3, titulo: "Arkanoid", descripcion: "Destruye tantos ladrillos como puedas", imageUrl: "https://picsum.photos/200/300?random=3" },
    { id: 4, titulo: "Working", descripcion: "Donec justo metus, blandit eu rhoncus eu, interdum tempus ipsum.", imageUrl: "https://picsum.photos/200/300?random=4" }
  ];


  return (

    <div className='h-full bg-primary/30 py-32 text-center xl:text-left'>
      <Circles />
      <div className='container mx-auto  h-full flex flex-col items-center xl:flex-row gap-x-6'>
        {/* PARTE IZQUIERDA */}
        <div className='flex-1 mr-4 h-[500px] flex flex-col justify-center pb-4'>
          <h1 className='text-center text-3xl p-4 mb-2 border border-l-2 rounded-full bg-sky-500/10'>Relax & Play</h1>
          <p className='text-center text-white text-xl p-4 my-6'>Aquí encontrarás una variedad de minijuegos  seleccionados para promover la relajación y aliviar el estrés.
             Desde juegos de respiración controlada y rompecabezas tranquilizantes hasta actividades de colorear y crucigramas relajantes,
             cada juego está diseñado para ayudarte a desconectar, mejorar tu concentración y cultivar la calma en momentos de ansiedad. </p>

        </div>
        {/* PARTE DERECHA */}
        <div className='flex flex-col w-full xl:max-w-[56%] h-[500px]  justify-center'>
          <div className='grid grid-cols-2 gap-4 p-4'>
            {cards.map((card) => (
              <div key={card.id} 
              className="bg-sky-600/10 rounded-lg shadow-lg
               overflow-hidden transform transition duration-300 hover:scale-105
                hover:bg-sky-700 cursor-pointer"
                onClick={() => handleCardClick(`/minis/${card.id}`)}>

                <img src={card.imageUrl} alt="Imagen descriptiva" className="w-full h-32 sm:h-48 object-cover p-4 rounded" />
                <div className="p-4">
                  <h5 className="text-lg font-bold text-white">{card.titulo}</h5>
                  <p className='text-white'>{card.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Minis;
