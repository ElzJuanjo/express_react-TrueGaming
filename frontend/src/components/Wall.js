import React from 'react'
import { useLocation } from 'react-router-dom';
// import { HeaderIndex } from './HeaderIndex';
import { Footer } from './Footer';

export const Wall = () => {
  const location = useLocation();
  const { username } = location.state || { username: 'Usuario' }; // Accede al nombre del usuario

  return (
    <div>
      <main>
        <h1>BIENVENIDOOOOOO {username}</h1>
      </main>
      <Footer></Footer>
    </div>
  )
}