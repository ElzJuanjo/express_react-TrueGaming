import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Footer } from './Footer';
import { useState } from 'react';

export const Wall = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // RECUPERACIÓN DE LA SESIÓN
  const [stateUser, setStateUser] = useState(null);
  useEffect(() => {
    const user = localStorage.getItem("LoggedUser");
    if (user) {
      setStateUser(JSON.parse(user));
    } 
  })
  
  return (
    <div>
      <main>
      {stateUser ? (
        <div>
          <h1>BIENVENIDOOOOOO {stateUser.user.nickname}</h1>
          <h2>Tu correo es: {stateUser.user.correo}</h2>
        </div>
        ) : (
          navigate('/')
        )}
      </main>
      <Footer></Footer>
    </div>
  )
}