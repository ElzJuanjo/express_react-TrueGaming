import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Footer } from './Footer';
import { useState } from 'react';
import { HeaderLogged } from './HeaderLogged';

export const SearchIGDB = () => {
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
        const response = await fetch(`http://localhost:4000/igdb/${search}`)
            .then(data => data.json()).catch(err => []);

        let listGames = []
        for (let data of response) {
            const aux = {
                name: data.name,
                category: await defCategory(data.category),
                first_release_date: data.first_release_date,
                platforms: await defPlatform(data.platforms),
                genres: await defGenres(data.genres)
            }
            listGames.push(aux);
        }
        setJuegos(listGames);
    }

    const defCategory = async (category) => {
        if (!category) {
            return "Sin información.";
        }
        const response = await fetch(`http://localhost:4000/read/categoria/id_categoria/${category}`)
            .then(data => data.json()).catch(err => null);
        return (response) ? response.nombre : "Sin información.";
    }

    const defPlatform = async (list) => {
        if (!list) {
            return "Sin información.";
        }

        let listPlatforms = ''
        for (let i of list) {
            const response = await fetch(`http://localhost:4000/read/plataforma/id_plataforma/${i}`)
                .then(data => data.json()).catch(err => null);

            if (!response) {
                continue;
            }
            if (i === list[list.length - 1]) {
                listPlatforms += response.nombre += ".";
            } else {
                listPlatforms += response.nombre += ", ";
            }
        }

        return listPlatforms;
    }

    const defGenres = async (list) => {
        if (!list) {
            return "Sin información.";
        }

        let listGenres = '';
        for (let i of list) {
            const response = await fetch(`http://localhost:4000/read/genero/id_genero/${i}`)
                .then(data => data.json()).catch(err => null);

            if (!response) {
                continue;
            }
            if (i === list[list.length - 1]) {
                listGenres += response.nombre += ".";
            } else {
                listGenres += response.nombre += ", ";
            }
        }

        return listGenres;
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
                                placeholder="Red Dead Redemption"
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
                        <div id='searchGame'>
                            <h2>
                                {juego.name}
                            </h2>
                            <div id="infoGame">
                                <div>
                                    <h3>
                                        Lanzamiento
                                    </h3>
                                    <h4>{juego.first_release_date}</h4>
                                </div>
                                <div>
                                    <h3>
                                        Categoria
                                    </h3>
                                    <h4>{juego.category}</h4>
                                </div>
                                <div>
                                    <h3>
                                        Plataformas
                                    </h3>
                                    <h4>{juego.platforms}</h4>
                                </div>
                                <div>
                                    <h3>
                                        Géneros
                                    </h3>
                                    <h4>{juego.genres}</h4>
                                </div>
                            </div>
                            <button>Seleccionar</button>
                        </div>
                    )}
                </div>
            </main>
            <Footer></Footer>
        </div>
    )
}