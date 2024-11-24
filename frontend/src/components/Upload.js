import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Footer } from './Footer';
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
    const [uploadType, setUploadType] = useState('file');
    const [newGame, setNewGame] = useState({ id: null });
    const [stateUser, setStateUser] = useState(null);
    const [games, setGames] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredGames, setFilteredGames] = useState([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem('LoggedUser');
        if (user) {
            setStateUser(JSON.parse(user));
        }
        const newJuego = sessionStorage.getItem('newGame');
        if (newJuego && newJuego.id !== null) {
            setNewGame(JSON.parse(newJuego));
        } else {
            loadGames();
        }
    }, []);

    useEffect(() => {
        if (stateUser && !stateUser.loggedIn) {
            navigate('/');
        }
    }, [stateUser, navigate]);

    const loadGames = async () => {
        const fetchedGames = await fetch(`http://localhost:4000/all/juego`)
            .then(data => data.json())
            .catch(err => null);
        setGames(fetchedGames || []);
    };

    useEffect(() => {
        setFilteredGames(
            games.filter(game =>
                game.nombre.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, games]);

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

    const confirmNotUpload = () => {
        Swal.fire({
            title: 'Tu reseña no se ha podido publicar :(',
            icon: 'warning',
            confirmButtonColor: 'red',
            confirmButtonText: 'Aceptar',
            customClass: {
                popup: 'dark-popup',
                htmlContainer: 'dark-html',
                actions: 'dark-actions',
            },
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let image = '';
        let juegoResena = newGame?.id || game;

        if (newGame && newGame.id !== null) {
            await saveGame(newGame);
            sessionStorage.setItem('newGame', JSON.stringify({ id: null }));
            setNewGame({ id: null });
        }

        if (uploadType === 'file') {
            const formData = new FormData();
            if (e.target.imgReview.files.length > 0) {
                formData.append('imgReview', e.target.imgReview.files[0]);
                const upload = await fetch(`http://localhost:4000/upload`, {
                    method: 'POST',
                    body: formData,
                });
                image = await upload.json();
                image = process.env.PUBLIC_URL + image.path.slice(18);
            }
        } else if (uploadType === 'url') {
            image = e.target.urlReview.value;
        } else {
            image = 'none';
        }

        const data = {
            titulo_resena: title,
            id_juego_resena: juegoResena,
            resena: review,
            puntuacion: score,
            imagen_resena: image,
            correo_autor: stateUser.user.correo,
        };

        if (game) {
            await fetch(
                `http://localhost:4000/create/resena/titulo,id_juego,resena,puntuacion,imagen,correo_autor`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                }
            ).then(data => data.json()
            ).catch(err => null);
            confirmUpload();
            sendNotifications();
        } else {
            confirmNotUpload();

        }
        deleteNewGame();
    };

    const saveGame = async (juego) => {
        let info = `${juego.id},${juego.category},${juego.first_release_date},${juego.name}`;
        await fetch(
            `http://localhost:4000/create/juego/id_juego,id_categoria,fecha_lanzamiento,nombre/${encodeURIComponent(
                info
            )}`,
            { method: 'POST' }
        );
        for (let platform of juego.platforms) {
            info = `${juego.id},${platform}`;
            await fetch(
                `http://localhost:4000/create/plataformas_juego/id_juego,id_plataforma/${encodeURIComponent(
                    info
                )}`,
                { method: 'POST' }
            );
        }
        for (let genre of juego.genres) {
            info = `${juego.id},${genre}`;
            await fetch(
                `http://localhost:4000/create/generos_juego/id_juego,id_genero/${encodeURIComponent(
                    info
                )}`,
                { method: 'POST' }
            );
        }
    };

    const deleteNewGame = async () => {
        sessionStorage.removeItem('newGame');
        setNewGame({ id: null });
        loadGames();
    };

    const sendNotifications = async () => {
        const followers = await fetch(
            `http://localhost:4000/read/all/seguidor/correo_seguido/${encodeURIComponent(
                stateUser.user.correo
            )}`
        )
            .then(data => data.json())
            .catch(err => null);

        followers.map(follower => {
            sendNotification(follower.correo_seguidor, stateUser.user.nickname);
        });
    };

    const sendNotification = async (email, user2) => {
        const user1 = await fetch(
            `http://localhost:4000/read/usuario/correo/${encodeURIComponent(email)}`
        )
            .then(data => data.json())
            .catch(err => null);
        await fetch(
            `http://localhost:4000/notify/${encodeURIComponent(
                email
            )}/Nueva%20Reseña%20de%20alguien%20que%20sigues/${encodeURIComponent(
                user1.nickname
            )}/${encodeURIComponent(user2)}`,
            { method: 'POST' }
        );
    };

    return (
        <div id='body'>
            <HeaderLogged />
            <main>
                <section id='formulario'>
                    <h1>PUBLICAR</h1>
                    <form onSubmit={handleSubmit} method='post' encType='multipart/form-data'>
                        <div>
                            <h3>Título:</h3>
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder='Título de la reseña'
                                required
                            />
                        </div>
                        <div>
                            <h3>Juego:</h3>
                            {newGame && newGame.id === null ? (
                                <div id="gameSearch">
                                    <input
                                        type="text"
                                        placeholder="Buscar juego"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        onFocus={() => setIsDropdownVisible(true)}
                                        onBlur={() => setTimeout(() => setIsDropdownVisible(false), 100)}
                                    />
                                    {isDropdownVisible && filteredGames.length > 0 && (
                                        <ul id="dropdown">
                                            {filteredGames.map((game) => (
                                                <li
                                                    key={game.id_juego}
                                                    onClick={() => {
                                                        setGame(game.id_juego);
                                                        setSearchTerm(game.nombre);
                                                        setIsDropdownVisible(false);
                                                    }}
                                                >
                                                    {game.nombre}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    <a href="/searchgame">
                                        ¿No encuentras un juego en esta lista? Haz clic aquí para explorar más!
                                    </a>
                                </div>
                            ) : (
                                <div className="newGame">
                                    <h4>{newGame.name}</h4>
                                    <FontAwesomeIcon
                                        icon={faX}
                                        style={{ color: "#ff0000", margin: "10px", cursor: "pointer" }}
                                        onClick={deleteNewGame}
                                    />
                                </div>
                            )}
                        </div>
                        <div>
                            <h3>Calificación:</h3>
                            <input
                                type='number'
                                max='10'
                                min='0'
                                value={score}
                                onChange={(e) => setScore(e.target.value)}
                                placeholder='De 1 a 10'
                                required
                            />
                        </div>
                        <div>
                            <h3>Reseña:</h3>
                            <textarea
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                                placeholder='Escribe aquí lo que quieras publicar'
                                required
                            />
                        </div>
                        <h3>Selecciona cómo quieres subir la imagen:</h3>
                        <button type='button' onClick={() => setUploadType('file')}>
                            Subir Archivo
                        </button>
                        <button type='button' onClick={() => setUploadType('url')}>
                            Ingresar URL
                        </button>
                        <button type='button' onClick={() => setUploadType('none')}>
                            Sin imagen
                        </button>
                        {uploadType === 'file' && (
                            <div>
                                <h3>Imagen (Archivo):</h3>
                                <input
                                    type='file'
                                    name='imgReview'
                                    id='imgReview'
                                    accept='image/*'
                                    required
                                />
                            </div>
                        )}
                        {uploadType === 'url' && (
                            <div>
                                <h3>Imagen (URL):</h3>
                                <input
                                    type='url'
                                    name='urlReview'
                                    placeholder='Ingresa el Url de la imagen'
                                    required
                                />
                            </div>
                        )}
                        <button id='boton' type='submit'>
                            Publicar
                        </button>
                    </form>
                </section>
            </main>
            <Footer />
        </div>
    );
};