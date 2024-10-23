import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Footer } from './Footer';
import { useState } from 'react';
import { HeaderLogged } from './HeaderLogged';
import Swal from 'sweetalert2';

export const SearchIGDB = () => {
    const navigate = useNavigate();

    // RECUPERACIÓN DE LA SESIÓN
    const [stateUser, setStateUser] = useState(null);
    const [game, setGame] = useState('');
    const [juegos, setJuegos] = useState([]);
    const [juegosBackend, setJuegosBackend] = useState([])
    const [selectedGame, setSelectedGame] = useState(false)

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
                id: data.id,
                name: data.name,
                category: await defCategory(data.category),
                first_release_date: data.first_release_date,
                platforms: await defPlatform(data.platforms),
                genres: await defGenres(data.genres)
            }
            listGames.push(aux);
        }
        setJuegos(listGames);
        setJuegosBackend(response)
    }

    const defCategory = async (category) => {
        if (category == null) {
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

    const checkGame = async (juego) => {
        const response = await fetch(`http://localhost:4000/read/juego/id_juego/${juego.id}`)
            .then(data => data.json()).catch(err => null);
        if (response) {
            Swal.fire({
                title: '¡Éste juego ya existe en nuestra base de datos!',
                icon: 'info',
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Ok',
                customClass: {
                    popup: 'dark-popup',
                    title: 'dark-title',
                    htmlContainer: 'dark-html',
                    actions: 'dark-actions',
                },
            })
        } else {
            sessionStorage.setItem('newGame', JSON.stringify(juego))
            navigate('/upload')
        }
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
        Swal.fire({
            title: 'Tu reseña se ha publicado con éxito',
            text: 'Al igual que el nuevo juego que registraste',
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
                
            }
        });
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
                    {Array.isArray(juegos) && Array.isArray(juegosBackend) && juegos.map((juego, index) =>
                        <div id='searchGame' key={juego.id}>
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
                            <button onClick={() => checkGame(juegosBackend[index])}>Seleccionar</button>
                        </div>
                    )}
                </div>
            </main>
            <Footer></Footer>
        </div>
    )
}