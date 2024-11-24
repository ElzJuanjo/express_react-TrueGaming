import React, { useEffect, useState } from 'react'
import { HeaderLogged } from './HeaderLogged';
import { GameReviews } from './GameReviews';
import { useNavigate, useParams } from 'react-router-dom';
import { Footer } from './Footer';
import useSession from '../hooks/UseSession';

export const Game = () => {
    const { id } = useParams()

    const navigate = useNavigate();

    // RECUPERACIÓN DE LA SESIÓN
    const stateUser = useSession()

    useEffect(() => {
        loadGame()
    }, []);

    // No permite el acceso si no ha iniciado sesión
    useEffect(() => {
        if (stateUser && !stateUser.loggedIn) {
            navigate('/');
        }
    }, [stateUser, navigate]);

    const [juego, setJuego] = useState({});
    const [id_juego, setIdJuego] = useState(id);

    const loadGame = async () => {
        const game = await fetch(`http://localhost:4000/all/juego/${id_juego}`)
            .then(data => data.json()).catch(err => null);
        setJuego(game[0])
    }

    return (
        <div id='body'>
            <HeaderLogged></HeaderLogged>
            <main>
                <h1>RESEÑAS DE:</h1>
                {(juego && juego.nombre_juego) ? (
                    <div id='searchGame'>
                        <h2>
                            {juego.nombre_juego}
                        </h2>
                        <div id="infoGame">
                            <div>
                                <h3>
                                    Lanzamiento
                                </h3>
                                <h4>{juego.fecha_lanzamiento.slice(0, 10)}</h4>
                            </div>
                            <div>
                                <h3>
                                    Categoria
                                </h3>
                                <h4>{juego.nombre_categoria}</h4>
                            </div>
                            <div>
                                <h3>
                                    Plataformas
                                </h3>
                                <h4>{juego.plataformas}</h4>
                            </div>
                            <div>
                                <h3>
                                    Géneros
                                </h3>
                                <h4>{juego.generos}</h4>
                            </div>
                            <div>
                                <h3>
                                    Calificación
                                </h3>
                                {(juego.promedio === null) ? (
                                    <h4>Sin Reseñas</h4>
                                ) : (
                                    <h4>{String(juego.promedio).slice(0,4)}</h4>
                                )}
                            </div>
                        </div>
                        <button onClick={() => navigate('/upload')}>¡Publica una reseña de este juego!</button>
                    </div>
                ) : (
                    <h1>Cargando...</h1>
                )}
                <GameReviews id={id_juego}></GameReviews>
            </main>
            <Footer></Footer>
        </div>
    )
}
