import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Footer } from './Footer';
import { useState } from 'react';
import { HeaderIndex } from './HeaderIndex';
import { HeaderLogged } from './HeaderLogged';
import { NavBar } from './NavBar';
import { Reviews } from './Reviews';
import { NavBarNotLogged } from './NavBarNotLogged';

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
  }, [])

  return (
    <div id='body'>
      {stateUser && stateUser.loggedIn ? (<HeaderLogged></HeaderLogged>) : (<HeaderIndex></HeaderIndex>)}
      <main>
        {stateUser && stateUser.user && stateUser.user.nickname ? (
          <NavBar name={stateUser.user.nickname} />
        ) : (
          <NavBarNotLogged />
        )}
        <Reviews></Reviews>
      </main>
      <Footer></Footer>
    </div>
  )
}