import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Footer } from './Footer';
import { useState } from 'react';
import { HeaderLogged } from './HeaderLogged';

export const SearchGameInDB = () => {

    const navigate = useNavigate();

    // RECUPERACIÓN DE LA SESIÓN
    const [stateUser, setStateUser] = useState(null);
    const [game, setGame] = useState('');
    const [juegos, setJuegos] = useState([]);

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
    }, [stateUser, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const search = encodeURIComponent(game);
        const response = await fetch(`http://localhost:4000/all/juegos/search/${search}`)
            .then(data => data.json()).catch(err => []);
        setJuegos(response);
    }

    return (
        <div id='body'>
            <HeaderLogged></HeaderLogged>
            <main>
                <section id="formulario">
                    <form onSubmit={handleSubmit}>
                        <h2>INGRESE EL NOMBRE DEL JUEGO</h2>
                        <div>
                            <input
                                type="text"
                                name="juego"
                                placeholder=""
                                value={game}
                                minLength="3"
                                onChange={(e) => setGame(e.target.value)}
                                required />
                            <button type="Submit">Buscar</button>
                        </div>
                    </form>
                </section>
                <div>
                    {Array.isArray(juegos) && juegos.map((juego) =>
                        <div id='searchGame' key={juego.id_juego}>
                            <h2>
                                {juego.nombre_juego}
                            </h2>
                            <div id="infoGame">
                                <div>
                                    <h3>
                                        Lanzamiento
                                    </h3>
                                    <h4>{juego.fecha_lanzamiento.slice(0,10)}</h4>
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
                                        <h4>{juego.promedio}</h4>
                                    )}
                                </div>
                            </div>
                            {(juego.n_resenas !== null) ? (
                                <button onClick={() => navigate(`/game/${juego.id_juego}`)}>Ver {juego.n_resenas} Reseñas</button>
                            ) : (
                                <button onClick={() => navigate('/upload')}>¡Publica la primer reseña de este juego!</button>
                            )}
                        </div>
                    )}
                </div>
            </main>
            <Footer></Footer>
        </div>
    )
}
