import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const Reviews = () => {
    const navigate = useNavigate();

    // RECUPERACIÓN DE LA SESIÓN
    const [stateUser, setStateUser] = useState(null);
    useEffect(() => {
        const user = localStorage.getItem("LoggedUser");
        if (user) {
            setStateUser(JSON.parse(user));
        }
        loadReviews()
    }, [])

    const [reviews, setReviews] = useState([])
    const loadReviews = async (e) => {
        const reviews = await fetch(`http://localhost:4000/all/resena`) // HAY QUE HACER UNA QUERY PERSONALIZADA QUE TRAIGA EL NOMBRE DEL JUEGO, EL NICKNAME DEL AUTOR, LOS LIKES DE LA RESEÑA, etc
            .then(data => data.json()).catch(err => null);
        setReviews(reviews)
    }

    return (
        <div id='publicacion'>
            {reviews.map((review) =>
                <div>
                    <div id='headerPublicacion'>
                        <a href=''>
                            <div id='autorPublicacion'>
                                <img src={process.env.PUBLIC_URL + "/img/default_user.jpg"} />
                                <div>
                                    <h2>{review.correo_autor}</h2>
                                    <h5>{review.correo_autor}</h5>
                                </div>
                            </div>
                        </a>
                        <div id='autorPublicacion'>
                            <div>
                                <h2>{review.puntuacion}/10</h2>
                                <h4>{review.fecha_resena.slice(0, 10)}</h4>
                            </div>
                        </div>

                    </div>
                    <h1 id='title'>{review.titulo_resena}</h1>
                    <img src={process.env.PUBLIC_URL + review.imagen_resena} />
                    <p>{review.resena}</p>
                    <div id='detallesPublicacion'>
                        <i id='botonLike' class='fa-regular fa-heart fa-2xl' title='$id_publicacion'>LIKES</i>
                        <a href='detallesPublicacion.php?id=" . $id_publicacion . "'><h3><i id='fa-solid fa-comments fa-2xl'>COMENTARIOS</i></h3></a>
                    </div>
                </div>
            )}
        </div>

    )
}
