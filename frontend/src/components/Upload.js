import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Footer } from './Footer';
import { useState } from 'react';
import { HeaderIndex } from './HeaderIndex';
import { HeaderLogged } from './HeaderLogged';
import Swal from 'sweetalert2';

export const Upload = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // RECUPERACIÓN DE LA SESIÓN
    const [stateUser, setStateUser] = useState(null);
    useEffect(() => {
        const user = localStorage.getItem("LoggedUser");
        if (user) {
            setStateUser(JSON.parse(user));
        }
        loadGames()
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

    const [title, setTitle] = useState('');
    const [game, setGame] = useState('');
    const [review, setReview] = useState('');
    const [score, setScore] = useState('');
    const [uploadType, setUploadType] = useState('file')

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
        e.preventDefault();
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
            id_juego_resena: game,
            resena: review,
            puntuacion: score,
            imagen_resena: image,
            correo_autor: stateUser.user.correo
        }
        const response = await fetch(`http://localhost:4000/create/resena/titulo,id_juego,resena,puntuacion,imagen,correo_autor`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        confirmUpload();
    }

    const handleOptionChange = (type) => {
        setUploadType(type);
    };

    return (
        <div id='body'>
            {stateUser && stateUser.loggedIn ? (<HeaderLogged></HeaderLogged>) : (<HeaderIndex></HeaderIndex>)}
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
                            <select value={game} onChange={(e) => setGame(e.target.value)} required>
                                <option value="" defaultValue={null} disabled>Selecciona un juego</option>
                                {games.map((game) => (
                                    <option key={game.id_juego} value={game.id_juego}>
                                        {game.titulo_juego}
                                    </option>
                                ))}
                            </select>
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
                                <input type="file" name="imgReview" id="imgReview" accept="image/*" multiple={false} required/>
                            </div>
                        )}

                        {uploadType === 'url' && (
                            <div>
                                <h3>Imagen (URL):</h3>
                                <input type="url" name="urlReview" id="urlReview" placeholder="Ingresa la URL de la imagen" autoComplete='off' required/>
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
