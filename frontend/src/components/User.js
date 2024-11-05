import React from 'react'
import { HeaderLogged } from './HeaderLogged';
import { useState } from 'react';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faTwitch, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { Footer } from './Footer';
import { AccountReviews } from './AccountReviews';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { faCircleCheck, faCirclePlus } from '@fortawesome/free-solid-svg-icons';

export const User = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = location.state?.email

  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [usuario, setUsuario] = useState({})

  // RECUPERACIÓN DE LA SESIÓN
  const [stateUser, setStateUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("LoggedUser");
    if (user) {
      setStateUser(JSON.parse(user));
    }
  }, []);

  // No permite el acceso si no ha iniciado sesión
  useEffect(() => {
    if (stateUser && !stateUser.loggedIn) {
      navigate('/');
    }
    if (stateUser && stateUser.user && stateUser.user.correo) {
      getFollows()
      getUsuario()
    }
  }, [stateUser, navigate]);

  const getFollows = async () => {
    const followers = await fetch(`http://localhost:4000/read/all/seguidor/correo_seguido/${encodeURIComponent(user)}`)
      .then(data => data.json()).catch(err => null);
    const following = await fetch(`http://localhost:4000/read/all/seguidor/correo_seguidor/${encodeURIComponent(user)}`)
      .then(data => data.json()).catch(err => null);

    if (followers) {
      setFollowers(followers)
    }
    if (following) {
      setFollowing(following)
    }
  }

  const getUsuario = async () => {
    const response = await fetch(`http://localhost:4000/read/usuario/correo/${encodeURIComponent(user)}`)
      .then(data => data.json()).catch(err => null);
    setUsuario(response)
  }

  const handleFollow = async () => {
    const response = await fetch(`http://localhost:4000/read/seguidor/correo_seguidor/${encodeURIComponent(stateUser.user.correo)}`)
      .then(data => data.json()).catch(err => null);
    if (response) {
      await fetch(`http://localhost:4000/delete/seguidor/correo_seguidor/${encodeURIComponent(stateUser.user.correo)}`, {
        method: 'post'
      })
    } else {
      const info = encodeURIComponent(`${usuario.correo},${stateUser.user.correo}`);
      await fetch(`http://localhost:4000/create/seguidor/correo_seguido,correo_seguidor/${info}`, {
        method: 'POST'
      });
    }
    getFollows()
  }

  return (
    <div id="body">
      <HeaderLogged></HeaderLogged>
      <main>
        <div className='usuarioVista'>
          <div className='usuarioHeader'>
            <img src={usuario && usuario.avatar} />
            <div className='itemInfo'>
              <div className='edit'>
                <h1>{usuario && usuario.nickname} </h1>
              </div>
              <div className='edit'>
                <h3>{usuario && usuario.correo} </h3>
              </div>
              <div className='edit'>
                <h4>True Gamer desde: {usuario && usuario.fecha_creacion ? usuario.fecha_creacion.slice(0, 10) : "Fecha no disponible"}</h4>
              </div>
            </div>
            {console.log(followers)}
            {(followers.some(follower => follower.correo_seguidor === stateUser.user.correo)) ? (
              <a>
                <FontAwesomeIcon icon={faCircleCheck} size="2xl" onClick={handleFollow} />
              </a>
            ) : (
              <a>
                <FontAwesomeIcon icon={faCirclePlus} size="2xl" onClick={handleFollow} />
              </a>
            )}
          </div>
          <div className='usuarioInfo'>
            <div>
              <a href='' ><h2>Seguidores: {followers.length}</h2></a>
              {(followers.some(follower => follower.correo_seguidor === stateUser.user.correo)) ? (
                <p>Sigues a este usuario</p>
              ) : (
                <p>No sigues a este usuario</p>
              )}
            </div>
            <div>
              <a href=''><h2>Seguidos: {following.length}</h2></a>
              {(following.some(follow => follow.correo_seguido === stateUser.user.correo)) ? (
                <p>Este usuario te sigue</p>
              ) : (
                <p>Este usuario no te sigue</p>
              )}
            </div>
          </div>
          <div className='usuarioBio'>
            <h2>Sobre mí</h2>
            <div className='edit'>
              <p>{usuario && usuario.bio}</p>
            </div>
          </div>
          <div className='usuarioInfo'>
            <div className='itemInfo'>
              <div className='edit'>
                <FontAwesomeIcon id={(usuario && usuario.youtube !== null) ? ('icon') : ('iconDisabled')} icon={faYoutube} size="2xl" />
              </div>
            </div>
            <div className='itemInfo'>
              <div className='edit'>
                <FontAwesomeIcon id={(usuario && usuario.discord !== null) ? ('icon') : ('iconDisabled')} icon={faDiscord} size="2xl" />
              </div>
            </div>
            <div className='itemInfo'>
              <div className='edit'>
                <FontAwesomeIcon id={(usuario && usuario.twitch !== null) ? ('icon') : ('iconDisabled')} icon={faTwitch} size="2xl" />
              </div>
            </div>
          </div>
        </div>
        <h2>RESEÑAS DE ESTE USUARIO</h2>
        <AccountReviews email={user} myaccount={false}></AccountReviews>
      </main>
      <Footer></Footer>
    </div>
  )
}
