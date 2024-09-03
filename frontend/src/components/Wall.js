import React from 'react'
import { useLocation } from 'react-router-dom'; // Importa useLocation para acceder al estado


export const Wall = () => {
  const location = useLocation();
  const { username } = location.state || { username: 'Usuario' }; // Accede al nombre del usuario

  return (
    <div>
      <h1>BIENVENIDOOOOOO {username}</h1>
    </div>
  )
}