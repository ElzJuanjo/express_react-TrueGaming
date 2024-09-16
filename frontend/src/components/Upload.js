import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Footer } from './Footer';
import { useState } from 'react';
import { HeaderIndex } from './HeaderIndex';
import { HeaderLogged } from './HeaderLogged';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons';

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

    const [games, setGames] = useState([])
    const loadGames = async (e) => {
        const games = await fetch(`http://localhost:4000/all/juego`)
            .then(data => data.json()).catch(err => null);
        setGames(games)
    }

    const [title, setTitle] = useState('');
    const [game, setGame] = useState('');
    const [review, setReview] = useState('');
    const [score, setScore] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        let image = "";
        const formData = new FormData();
        if (e.target.imgReview.files.length > 0) {
            formData.append('imgReview', e.target.imgReview.files[0]);
            const upload = await fetch(`http://localhost:4000/upload`, {
                method: "POST",
                body: formData
            })
            image = await upload.json()
        }

        const data = {
            titulo_resena: title,
            id_juego_resena: game,
            resena: review,
            puntuacion: score,
            imagen_resena: image.path.slice(18),
            correo_autor: stateUser.user.correo
        }
        const response = await fetch(`http://localhost:4000/create/resena/titulo_resena,id_juego_resena,resena,puntuacion,imagen_resena,correo_autor`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        navigate('/wall')
    }

    return (
        <div>
            {stateUser && stateUser.loggedIn ? (<HeaderLogged></HeaderLogged>) : (<HeaderIndex></HeaderIndex>)}
            <main>
                <div id="formulario">
                    <h1>PUBLICAR</h1>
                    <form onSubmit={handleSubmit} method="post" encType='multipart/form-data'>
                        <div id="campo">
                            <h3>Título:</h3>
                            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Título de la reseña' required></input>
                        </div>
                        <div id="campo">
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
                        <div id="campo">
                            <h3>Calificación:</h3>
                            <input type="number" max="10" min="0" value={score} onChange={(e) => setScore(e.target.value)} placeholder='Calificación de 1 a 10' required></input>
                        </div>
                        <h3>Reseña:</h3>
                        <textarea value={review} onChange={(e) => setReview(e.target.value)} placeholder="Escribe aquí lo que quieras publicar" required></textarea>
                        <div id="campo">
                            <h3>Imagen:</h3>
                            <label for="imgReview" class="custom-file-upload">
                                <FontAwesomeIcon icon={faUpload} size="xl" />  Selecciona una foto
                            </label>
                            <input type="file" name="imgReview" id="imgReview" accept="image/*" multiple={false} />
                        </div>
                        <button type='submit'>PUBLICAR</button>
                    </form>
                </div>
            </main>
            <Footer></Footer>
        </div>
    )
}
