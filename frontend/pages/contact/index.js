import React, { useState, useEffect } from 'react';
import { BsArrowRight, BsPencil, BsTrash } from 'react-icons/bs';

const DiaryEntry = ({ entry, onDelete, onEdit }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='shadow rounded p-4 mb-4 flex flex-col'>
      <div className='flex justify-between items-center'>
        <div>
          <p className='text-sm'>{new Date(entry.date).toLocaleDateString()}</p>
          <button onClick={() => setIsOpen(!isOpen)} className='text-blue-500'>
            {isOpen ? 'Ocultar Detalles' : 'Mostrar Detalles'}
          </button>
        </div>
        <div>
          <button onClick={() => onEdit(entry)} className='p-2 text-blue-500'><BsPencil /></button>
          <button onClick={() => onDelete(entry.id)} className='p-2 text-red-500'><BsTrash /></button>
        </div>
      </div>
      {isOpen && (
        <div>
          <p>{entry.achievements}</p>
          <p>{entry.gratitude}</p>
          <p>{entry.challenges}</p>
          <span className={`badge ${entry.mood}`}>{entry.mood}</span>
        </div>
      )}
    </div>
  );
};


const Contact = () => {
  const [entries, setEntries] = useState([]);
  const [entry, setEntry] = useState({
    achievements: '',
    gratitude: '',
    challenges: '',
    mood: '',
    image: null
  });

  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem('diaryEntries')) || [];
    setEntries(savedEntries);
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setEntry(prev => ({ ...prev, image: files[0] }));
    } else {
      setEntry(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = { ...entry, date: new Date().toISOString() };
    const updatedEntries = [...entries, newEntry];
    localStorage.setItem('diaryEntries', JSON.stringify(updatedEntries));
    setEntries(updatedEntries);
    setEntry({ achievements: '', gratitude: '', challenges: '', mood: '', image: null }); // Reset the form after submission
  };

  return (
    <div className="container mx-auto my-20 p-5">
      <div className="flex gap-8 justify-center">
        <div className="p-4 shadow-md rounded-lg w-full md:w-1/2">
          <h1 className="text-xl font-bold text-blue-600">Bienvenido a tu Diario Personal</h1>
          <p className="mb-4">Tu espacio personal para reflexionar y crecer cada día.</p>
          <p className="text-green-600">Consejo del día: <span>Aprecia las pequeñas cosas.</span></p>
        </div>
        <div className="p-4 shadow-md rounded-lg w-full md:w-1/2">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="achievements" className="form-label block mb-2 text-sm font-medium text-gray-900">¿Qué lograste hoy?</label>
              <textarea id="achievements" name="achievements" className="form-control p-2 border rounded w-full" placeholder="¿Qué lograste hoy?" value={entry.achievements} onChange={handleChange}></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="gratitude" className="form-label block mb-2 text-sm font-medium text-gray-900">¿Por qué estás agradecido hoy?</label>
              <textarea id="gratitude" name="gratitude" className="form-control p-2 border rounded w-full" placeholder="¿Por qué estás agradecido hoy?" value={entry.gratitude} onChange={handleChange}></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="challenges" className="form-label block mb-2 text-sm font-medium text-gray-900">¿Qué desafíos enfrentaste y cómo los manejaste?</label>
              <textarea id="challenges" name="challenges" className="form-control p-2 border rounded w-full" placeholder="¿Qué desafíos enfrentaste y cómo los manejaste?" value={entry.challenges} onChange={handleChange}></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="mood" className="form-label block mb-2 text-sm font-medium text-gray-900">¿Cómo te sientes hoy?</label>
              <select id="mood" name="mood" className="form-select block w-full p-2 border rounded text-gray-600" value={entry.mood} onChange={handleChange}>
                <option value="feliz">Feliz</option>
                <option value="triste">Triste</option>
                <option value="ansioso">Ansioso</option>
                <option value="motivado">Motivado</option>
                <option value="tranquilo">Tranquilo</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label block mb-2 text-sm font-medium text-gray-900">Subir imagen</label>
              <input id="image" type="file" name="image" className="form-control p-2 border rounded w-full" accept="image/*" onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-primary w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Guardar Entrada</button>
          </form>
        </div>
      </div>
      <div>
        {entries.map((entry, index) => (
          <DiaryEntry key={index} entry={entry} onDelete={() => {}} onEdit={() => {}} />
        ))}
      </div>
    </div>
  );
};

export default Contact;
