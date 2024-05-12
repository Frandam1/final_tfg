import { useState } from 'react';
import { BsArrowRight, BsPencil, BsTrash } from 'react-icons/bs';

const maxEntriesPerPage = 3;

const DiaryEntry = ({ entry, onDelete, onEdit }) => {
  return (
    <div className='shadow rounded p-4 mb-4 flex justify-between items-center'>
      <div>
        <p className='text-sm'>{entry.date}</p>
        <p>{entry.content}</p>
        <span className={`badge ${entry.mood}`}>{entry.mood}</span>
      </div>
      <div>
        <button onClick={() => onEdit(entry)} className='p-2 text-blue-500'><BsPencil /></button>
        <button onClick={() => onDelete(entry.id)} className='p-2 text-red-500'><BsTrash /></button>
      </div>
    </div>
  );
};

const Contact = ({ }) => {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState('');
  const [mood, setMood] = useState('happy');

  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastEntry = currentPage * maxEntriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - maxEntriesPerPage;
  const currentEntries = entries.slice(indexOfFirstEntry, indexOfLastEntry);

  const totalPages = Math.ceil(entries.length / maxEntriesPerPage);

  const goToNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  const goToPrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleAddEntry = () => {
    const entry = {
      id: entries.length + 1,
      content: newEntry,
      mood: mood,
      date: new Date().toLocaleDateString(),
    };
    setEntries([...entries, entry]);
    setNewEntry('');
  };

  const handleDeleteEntry = (id) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  const handleEditEntry = (editedEntry) => {
    setEntries(entries.map(entry => entry.id === editedEntry.id ? editedEntry : entry));
  };

  return (
    <div className='h-full bg-primary/30'>
      <div className='container mx-auto py-32 text-center xl:text-left flex flex-col items-center justify-center h-full'>
        <h2 className='text-xl font-bold mb-4'>Mi Diario Personal</h2>
        <textarea
          className='input w-full mb-4 p-3 h-[200px] resize-none'
          placeholder='Escribe algo...'
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
        />
        <div className='flex gap-4 mb-4 justify-center'>
          <select
            className='input w-[120px]'
            value={mood}
            onChange={(e) => setMood(e.target.value)}
          >
            <option value="happy">Feliz</option>
            <option value="sad">Triste</option>
            <option value="anxious">Ansioso</option>
          </select>
          <button
            onClick={handleAddEntry}
            className='btn rounded-full border border-white/50 max-w-[170px] px-8 flex items-center justify-center hover:border-accent group'
          >
            <span className='transition-all duration-500'>
              Guardar Entrada
            </span>
            <BsArrowRight className='text-[22px] ml-2' />
          </button>
        </div>
        {currentEntries.map(entry => (
          <DiaryEntry key={entry.id} entry={entry} onDelete={handleDeleteEntry} onEdit={handleEditEntry} />
        ))}
        <div className='flex justify-between w-full mt-4'>
          <button onClick={goToPrevPage} disabled={currentPage === 1}>Anterior</button>
          <button onClick={goToNextPage} disabled={currentPage === totalPages}>Siguiente</button>
        </div>
      </div>
    </div>
  );
  
};

export default Contact;
