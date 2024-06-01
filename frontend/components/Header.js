import Image from "next/image";
import Link from "next/link";
import Socials from "../components/Socials";
import React, { useState } from 'react';


const Header = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
  
    console.log('Login con:', username, password);
  };
  
  return (
    <header className="absolute z-30 w-full flex items-center px-16 xl:px-0 xl:h[90px]">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-y-6 py-8">
        {/** FORMULARIO DE LOGIN */}
        <form onSubmit={handleLogin} className="flex flex-initial right-20 relative  gap-4 w-[600px]">
        <button type="submit" className="button text-white font-bold rounded-lg mb-2">Iniciar sesión</button>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nombre de usuario"
              className="input"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="input"
            />
            
          </form>
        {/** SOCIALS */}
        <Socials />
        </div>
      </div>
    </header>
   
  
  );
};

export default Header;
