import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const HeaderLogged = () => {
    const navigate = useNavigate();

    //RECUPERACIÓN DE USUARIO 
    const [stateUser, setStateUser] = useState(null);
    useEffect(() => {
        const user = localStorage.getItem("LoggedUser");
        if (user) {
            setStateUser(JSON.parse(user));
        }
    }, [])

    const confirmLoggout = () => {
        Swal.fire({
            title: '¿Seguro quieres cerrar sesión?',
            text: "Aún quedan muchas reseñas por ver :D",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, cerrar sesión',
            cancelButtonText: 'Cancelar',
            customClass: {
                popup: 'dark-popup', 
                title: 'dark-title',  
                htmlContainer: 'dark-html', 
                actions: 'dark-actions', 
            },
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/logout')
            }
        });
    };

    return (
        <div>
            <header>
                <a href="/wall">
                    <img id='logoLogged' src={process.env.PUBLIC_URL + "/img/logo.png"} alt="" />
                </a>
                <section id='loggedUser'>
                    <a id='iconHome' href="/wall"><FontAwesomeIcon icon={faHome} size='3x' /></a>
                    <a id='iconAccount' href="/myaccount">
                        <img src={stateUser && stateUser.user && stateUser.user.avatar ? (stateUser.user.avatar) : (process.env.PUBLIC_URL + "/img/default_user.jpg")} alt='AVATAR'></img>
                        {/* {stateUser && stateUser.user && stateUser.user.correo ? (<h1>{stateUser.user.nickname}</h1>) : (<p>Cargando...</p>)} */}
                    </a>
                    <a><FontAwesomeIcon icon={faRightFromBracket} size='3x' onClick={confirmLoggout}/></a>
                </section>
            </header>
        </div>
    )
}
