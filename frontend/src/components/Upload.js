import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Footer } from './Footer';
import { useState } from 'react';
import { HeaderLogged } from './HeaderLogged';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

export const Upload = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [game, setGame] = useState('');
    const [review, setReview] = useState('');
    const [score, setScore] = useState('');
    const [uploadType, setUploadType] = useState('file')
    const [newGame, setNewGame] = useState({ id: null })

    // RECUPERACIÓN DE LA SESIÓN
    const [stateUser, setStateUser] = useState(null);
    useEffect(() => {
        const user = localStorage.getItem("LoggedUser");
        if (user) {
            setStateUser(JSON.parse(user));
        }
        const newJuego = sessionStorage.getItem('newGame')
        if (newJuego && newJuego.id !== null) {
            setNewGame(JSON.parse(newJuego))
        } else {
            loadGames()
        }
    }, [])

    // No permite el acceso si no ha iniciado sesión
    useEffect(() => {
        if (stateUser && !stateUser.loggedIn) {
            navigate('/');
        }
    }, [stateUser, navigate]);

    const [games, setGames] = useState([])
    const loadGames = async () => {
        const games = await fetch(`http://localhost:4000/all/juego`)
            .then(data => data.json()).catch(err => null);
        setGames(games)
    }

    const confirmUpload = () => {
        Swal.fire({
            title: 'Tu reseña se ha publicado con éxito',
            icon: 'success',
            confirmButtonColor: 'green',
            confirmButtonText: 'Aceptar',
            customClass: {
                popup: 'dark-popup',
                htmlContainer: 'dark-html',
                actions: 'dark-actions',
            },
        }).then((result) => {
            if (result.isDismissed || result.isConfirmed) {
                navigate('/wall');
            }
        });
    };

    const handleSubmit = async (e) => {
        let image = ""
        let juegoResena = null
        e.preventDefault();
        if (newGame && newGame.id !== null) {
            await saveGame(newGame)
            console.log('Setting game id to:', newGame.id);
            await setGame(newGame.id)
            juegoResena = newGame.id
            sessionStorage.setItem('newGame', { id: null })
            setGame({ id: null })
        } else {
            juegoResena = game
        }
        if (uploadType === 'file') {
            const formData = new FormData();
            if (e.target.imgReview.files.length > 0) {
                formData.append('imgReview', e.target.imgReview.files[0]);
                const upload = await fetch(`http://localhost:4000/upload`, {
                    method: "POST",
                    body: formData
                })
                image = await upload.json()
                image = process.env.PUBLIC_URL + image.path.slice(18)
            }
        } else if (uploadType === 'url') {
            image = e.target.urlReview.value
        } else {
            image = 'none'
        }

        const data = {
            titulo_resena: title,
            id_juego_resena: juegoResena,
            resena: review,
            puntuacion: score,
            imagen_resena: image,
            correo_autor: stateUser.user.correo
        }
        await fetch(`http://localhost:4000/create/resena/titulo,id_juego,resena,puntuacion,imagen,correo_autor`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        deleteNewGame();
        confirmUpload();
        sendNotifications();
    }

    const saveGame = async (juego) => {
        let info = `${juego.id},${juego.category},${juego.first_release_date},${juego.name}`;
        await fetch(`http://localhost:4000/create/juego/id_juego,id_categoria,fecha_lanzamiento,nombre/${encodeURIComponent(info)}`, {
            method: 'POST'
        });
        for (let platform of juego.platforms) {
            info = `${juego.id},${platform}`;
            info = encodeURIComponent(info)
            await fetch(`http://localhost:4000/create/plataformas_juego/id_juego,id_plataforma/${info}`, {
                method: 'POST'
            });
        }
        for (let genre of juego.genres) {
            info = `${juego.id},${genre}`
            info = encodeURIComponent(info)
            await fetch(`http://localhost:4000/create/generos_juego/id_juego,id_genero/${info}`, {
                method: 'POST'
            });
        }
    }

    const handleOptionChange = (type) => {
        setUploadType(type);
    };

    const deleteNewGame = async () => {
        sessionStorage.removeItem('newGame');
        setNewGame({ id: null })
        loadGames()
    }

    const sendNotifications = async () => {
        const followers = await fetch(`http://localhost:4000/read/all/seguidor/correo_seguido/${encodeURIComponent(stateUser.user.correo)}`)
            .then(data => data.json()).catch(err => null);
        followers.map(follower => {
            sendNotification(follower.correo_seguidor, stateUser.user.nickname)
        })
    }

    const sendNotification = async (email,user2) => {
        const user1 = await fetch(`http://localhost:4000/read/usuario/correo/${encodeURIComponent(email)}`)
            .then(data => data.json()).catch(err => null);
        const response = fetch(`http://localhost:4000/notify/${encodeURIComponent(email)}/Nueva%20Reseña%20de%20alguien%20que%20sigues/${encodeURIComponent(user1.nickname)}/${encodeURIComponent(user2)}`, {
            method: 'POST'
        });
    }

    return (
        <div id='body'>
            <HeaderLogged></HeaderLogged>
            <main>
                <section id="formulario">
                    <h1>PUBLICAR</h1>
                    <form onSubmit={handleSubmit} method="post" encType='multipart/form-data'>
                        <div>
                            <h3>Título:</h3>
                            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Título de la reseña' required></input>
                        </div>
                        <div>
                            <h3>Juego:</h3>
                            {(newGame && newGame.id === null) ? (
                                <div className='gameSelect'>
                                    <div>
                                        <select value={game} onChange={(e) => setGame(e.target.value)} required>
                                            <option value="" defaultValue={null} disabled>Selecciona un juego</option>
                                            {games.map((game) => (
                                                <option key={game.id_juego} value={game.id_juego}>
                                                    {game.nombre}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <a href='/searchgame'>¿No encuentras un juego en ésta lista? Haz clic aquí para explorar más!</a>
                                </div>
                            ) : (
                                <div className='newGame'>
                                    <h4>{newGame.name}</h4>
                                    <FontAwesomeIcon icon={faX} style={{ color: "#ff0000", margin: '10px', cursor: 'pointer' }} onClick={deleteNewGame} />
                                </div>
                            )}
                        </div>
                        <div>
                            <h3>Calificación:</h3>
                            <input type="number" max="10" min="0" value={score} onChange={(e) => setScore(e.target.value)} placeholder='De 1 a 10' required></input>
                        </div>
                        <div>
                            <h3>Reseña:</h3>
                            <textarea value={review} onChange={(e) => setReview(e.target.value)} placeholder="Escribe aquí lo que quieras publicar" required></textarea>
                        </div>
                        <h3>Selecciona cómo quieres subir la imagen:</h3>
                        <button type="button" onClick={() => handleOptionChange('file')}>Subir Archivo</button>
                        <button type="button" onClick={() => handleOptionChange('url')}>Ingresar URL</button>
                        <button type="button" onClick={() => handleOptionChange('none')}>Sin imagen</button>

                        {uploadType === 'file' && (
                            <div>
                                <h3>Imagen (Archivo):</h3>
                                <input type="file" name="imgReview" id="imgReview" accept="image/*" multiple={false} required />
                            </div>
                        )}

                        {uploadType === 'url' && (
                            <div>
                                <h3>Imagen (URL):</h3>
                                <input type="url" name="urlReview" id="urlReview" placeholder="Ingresa la URL de la imagen" autoComplete='off' required />
                            </div>
                        )}

                        {uploadType === 'none' && (
                            <p>(Sin imagen)</p>
                        )}
                        <button type='submit'>PUBLICAR</button>
                    </form>
                </section>
            </main>
            <Footer></Footer>
        </div>
    )
}
