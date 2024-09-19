import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons';

export const Reviews = () => {
    const navigate = useNavigate();

    // RECUPERACIÓN DE LA SESIÓN
    const [stateUser, setStateUser] = useState(null);
    const [filter, setFilter] = useState('r.fecha_resena');
    useEffect(() => {
        const user = localStorage.getItem("LoggedUser");
        if (user) {
            setStateUser(JSON.parse(user));
        }
    }, [])

    useEffect(() => {
        if (stateUser && stateUser.loggedIn) {
            const filter = localStorage.getItem('Filter');
            setFilter(JSON.parse(filter).order);
        }
    }, [stateUser]);

    useEffect(() => {
        loadReviews();
    }, [filter]);

    const [reviews, setReviews] = useState([]);
    const loadReviews = async (e) => {
        const applyFilter = await fetch(`http://localhost:4000/all/reviews/${filter}`)
            .then(data => data.json()).catch(err => null);
        setReviews(applyFilter)
    }

    return (
        <div>
            {Array.isArray(reviews) && reviews.map((review) =>
                <div id='publicacion' key={review.id_resena}>
                    <div>
                        <div id='headerPublicacion'>
                            <a href=''>
                                <div id='autorPublicacion'>
                                    <img src={review.avatar} />
                                    <div>
                                        <h2>{review.nickname}</h2>
                                        <h5>{review.titulo_juego}</h5>
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
                            <div>
                                <FontAwesomeIcon icon={faHeart} size='3x' />
                                <p>{review.total_likes}</p>
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faComment} size='3x' />
                                <p>{review.total_comentarios}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
