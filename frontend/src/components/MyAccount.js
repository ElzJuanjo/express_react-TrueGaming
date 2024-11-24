import React from 'react'
import { HeaderLogged } from './HeaderLogged';
import { useState } from 'react';
import { useEffect } from 'react';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faTwitch, faYoutube } from '@fortawesome/free-brands-svg-icons';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Footer } from './Footer';
import { AccountReviews } from './AccountReviews';
import { useNavigate } from 'react-router-dom';
import useSession from '../hooks/UseSession';


export const MyAccount = () => {

    const MySwal = withReactContent(Swal);

    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [uploadType, setUploadType] = useState('file');
    const navigate = useNavigate();

    // GET SESSION
    const stateUser = useSession()

    useEffect(() => {
        if (stateUser) {
            getFollows();
        }
        if (stateUser && !stateUser.loggedIn) {
            navigate('/');
        }
    }, [stateUser]);

    const getFollows = async () => {
        const followers = await fetch(`http://localhost:4000/read/all/seguidor/correo_seguido/${encodeURIComponent(stateUser.user.correo)}`)
            .then(data => data.json()).catch(err => null);
        const following = await fetch(`http://localhost:4000/read/all/seguidor/correo_seguidor/${encodeURIComponent(stateUser.user.correo)}`)
            .then(data => data.json()).catch(err => null);

        if (followers) {
            setFollowers(followers)
        }
        if (following) {
            setFollowing(following)
        }
    }

    const swalFire = (title, type, name, lenght, field) => {
        Swal.fire({
            title: `${title}`,
            input: `${type}`,
            inputAttributes: {
                name: `${name}`,
                placeholder: `${name}`,
                minLength: `${lenght[0]}`,
                maxLength: `${lenght[1]}`,
                required: 'on'
            },
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            cancelButtonColor: 'red',
            confirmButtonText: 'Guardar',
            confirmButtonColor: 'green',
            showLoaderOnConfirm: true,
            customClass: {
                popup: 'dark-popup',
                htmlContainer: 'dark-html',
                actions: 'dark-actions',
            },
            allowOutsideClick: false
        }).then(async (result) => {
            if (result.isConfirmed) {
                let success = false;
                switch (field) {
                    // NickName
                    case 1:
                        const check = await fetch(`http://localhost:4000/read/usuario/nickname/${encodeURIComponent(result.value)}`)
                            .then(data => data.json()).catch(err => null);
                        if (check) {
                            Swal.fire({
                                title: 'El nickname ingresado ya está en uso.',
                                text: `Elige otro nickname`,
                                icon: 'warning',
                                confirmButtonColor: 'green',
                                confirmButtonText: 'Aceptar',
                                customClass: {
                                    popup: 'dark-popup',
                                    htmlContainer: 'dark-html',
                                    actions: 'dark-actions',
                                },
                            });
                        } else {
                            const newNickName = await fetch(`http://localhost:4000/update/usuario/nickname/${encodeURIComponent(result.value)}/correo/${encodeURIComponent(stateUser.user.correo)}`, {
                                method: 'POST'
                            }).catch(err => null);

                            if (newNickName) {
                                success = true;
                            }
                        }
                        break;

                    // Bios
                    case 2:
                        const newBio = await fetch(`http://localhost:4000/update/usuario/bio/${encodeURIComponent(result.value)}/correo/${encodeURIComponent(stateUser.user.correo)}`, {
                            method: 'POST'
                        }).catch(err => null);

                        if (newBio) {
                            success = true;
                        }

                        break;

                    // Youtube
                    case 3:
                        const newYoutube = await fetch(`http://localhost:4000/update/usuario/youtube/${encodeURIComponent(result.value)}/correo/${encodeURIComponent(stateUser.user.correo)}`, {
                            method: 'POST'
                        }).catch(err => null);

                        if (newYoutube) {
                            success = true;
                        }

                        break;
                    // Discord
                    case 4:
                        const newDiscord = await fetch(`http://localhost:4000/update/usuario/discord/${encodeURIComponent(result.value)}/correo/${encodeURIComponent(stateUser.user.correo)}`, {
                            method: 'POST'
                        }).catch(err => null);

                        if (newDiscord) {
                            success = true;
                        }

                        break;

                    //Twitch
                    case 5:
                        const newTwitch = await fetch(`http://localhost:4000/update/usuario/twitch/${encodeURIComponent(result.value)}/correo/${encodeURIComponent(stateUser.user.correo)}`, {
                            method: 'POST'
                        }).catch(err => null);

                        if (newTwitch) {
                            success = true;
                        }

                        break;
                }

                if (success) {
                    const newStorage = await fetch(`http://localhost:4000/read/usuario/correo/${encodeURIComponent(stateUser.user.correo)}`)
                        .then(data => data.json()).catch(err => null);

                    newStorage.contrasena = ""
                    const stateData = { user: newStorage, loggedIn: true }
                    localStorage.setItem("LoggedUser", JSON.stringify(stateData))

                    Swal.fire({
                        title: 'Su información se ha actualizado con exito',
                        icon: 'success',
                        confirmButtonColor: 'green',
                        confirmButtonText: 'Aceptar',
                        customClass: {
                            popup: 'dark-popup',
                            htmlContainer: 'dark-html',
                            actions: 'dark-actions',
                        },
                    }).then(res => {
                        window.location.reload();
                    });
                } else {
                    const newStorage = await fetch(`http://localhost:4000/read/usuario/correo/${encodeURIComponent(stateUser.user.correo)}`)
                        .then(data => data.json()).catch(err => null);

                    newStorage.contrasena = ""
                    const stateData = { user: newStorage, loggedIn: true }
                    localStorage.setItem("LoggedUser", JSON.stringify(stateData))

                    Swal.fire({
                        title: 'Algo ha salido mal',
                        icon: 'warning',
                        confirmButtonColor: 'green',
                        confirmButtonText: 'Aceptar',
                        customClass: {
                            popup: 'dark-popup',
                            htmlContainer: 'dark-html',
                            actions: 'dark-actions',
                        },
                    }).then(res => {
                        window.location.reload();
                    });
                }

            }
        })
    }

    const changeNickname = () => {
        swalFire("Cambiar Nick", "text", "Nickname", [5, 20], 1);
    }

    const changeBio = () => {
        swalFire("Cambiar Biografía", "textarea", "Bio", [0, 200], 2);
    }

    const changeYoutube = () => {
        swalFire("Cambiar Youtube", "textarea", "Youtube", [10, 200], 3);
    }

    const changeDiscord = () => {
        swalFire("Cambiar Discord", "textarea", "Discord", [10, 200], 4);
    }

    const changeTwitch = () => {
        swalFire("Cambiar Twitch", "textarea", "Twitch", [10, 200], 5);
    }

    return (
        <div id="body">
            <HeaderLogged></HeaderLogged>
            <main>
                <div className='usuarioVista'>
                    <h1>MI CUENTA</h1>
                    <div className='usuarioHeader'>
                        <img src={stateUser && stateUser.user && stateUser.user.avatar} />
                        <div className='itemInfo'>
                            <div className='edit'>
                                <h1>{stateUser && stateUser.user && stateUser.user.nickname} 
                                <FontAwesomeIcon id="icon" icon={faPenToSquare} onClick={changeNickname} /></h1>
                            </div>
                            <div className='edit'>
                                <h3>{stateUser && stateUser.user && stateUser.user.correo} </h3>
                            </div>
                            <div className='edit'>
                                <h4>True Gamer desde: {stateUser && stateUser.user && stateUser.user.fecha_creacion.slice(0, 10)}</h4>
                            </div>
                        </div>
                    </div>
                    <div className='usuarioInfo'>
                        <div>
                            <a href=''><h2>Seguidores: {followers.length}</h2></a>
                        </div>
                        <div>
                            <a href=''><h2>Seguidos: {following.length}</h2></a>
                        </div>
                    </div>
                    <div className='usuarioBio'>
                        <h2>Sobre mí</h2>
                        <div className='edit'>
                            <p>{stateUser && stateUser.user && stateUser.user.bio}</p>
                            <FontAwesomeIcon id="icon" icon={faPenToSquare} onClick={changeBio} />
                        </div>
                    </div>
                    <div className='usuarioInfo'>
                        <div className='itemInfo'>
                            <div className='edit'>
                                {(stateUser && stateUser.user && stateUser.user.youtube !== null) ? (
                                    <a href={stateUser.user.youtube}>
                                        <FontAwesomeIcon id='icon' icon={faYoutube} size="2xl" />
                                    </a>
                                ) : (
                                    <FontAwesomeIcon id={(stateUser && stateUser.user && stateUser.user.youtube !== null) ? ('icon') : ('iconDisabled')} icon={faYoutube} size="2xl" />
                                )}
                            </div>
                            <FontAwesomeIcon id="icon" icon={faPenToSquare} onClick={changeYoutube} />
                        </div>
                        <div className='itemInfo'>
                            <div className='edit'>
                                {(stateUser && stateUser.user && stateUser.user.discord !== null) ? (
                                    <a href={stateUser.user.discord}>
                                        <FontAwesomeIcon id='icon' icon={faDiscord} size="2xl" />
                                    </a>
                                ) : (
                                    <FontAwesomeIcon id={(stateUser && stateUser.user && stateUser.user.discord !== null) ? ('icon') : ('iconDisabled')} icon={faDiscord} size="2xl" />
                                )}
                            </div>
                            <FontAwesomeIcon id="icon" icon={faPenToSquare} onClick={changeDiscord} />
                        </div>
                        <div className='itemInfo'>
                            <div className='edit'>
                                {(stateUser && stateUser.user && stateUser.user.twitch !== null) ? (
                                    <a href={stateUser.user.twitch}>
                                        <FontAwesomeIcon id='icon' icon={faTwitch} size="2xl" />
                                    </a>
                                ) : (
                                    <FontAwesomeIcon id={(stateUser && stateUser.user && stateUser.user.twitch !== null) ? ('icon') : ('iconDisabled')} icon={faTwitch} size="2xl" />
                                )}
                            </div>
                            <FontAwesomeIcon id="icon" icon={faPenToSquare} onClick={changeTwitch} />
                        </div>
                    </div>
                    <div>
                        <a href='/changeimg'>
                            <button>Cambiar Foto</button>
                        </a>
                        <button>Cambiar Contrasena</button>
                    </div>
                </div>
                <h2>TUS RESEÑAS</h2>
                {(stateUser && stateUser.user && stateUser.user.correo) ? (
                    <AccountReviews email={stateUser.user.correo} myaccount={true}></AccountReviews>
                ) : (
                    <h4>CARGANDO...</h4>
                )}
            </main>
            <Footer></Footer>
        </div>
    )
}
