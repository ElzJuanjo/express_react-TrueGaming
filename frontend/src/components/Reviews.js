import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

// ARREGLAR LA QUERY QUE NO QUIERE FUNCIONAR

export const Reviews = () => {
    const navigate = useNavigate();

    // RECUPERACIÓN DE LA SESIÓN
    const [stateUser, setStateUser] = useState(null);
    const [filter, setFilter] = useState('r.fecha_resena');
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const user = localStorage.getItem("LoggedUser");
        if (user) {
            setStateUser(JSON.parse(user));
        }
    }, [])

    // useEffect(() => {
    //     const filter = (localStorage.getItem('Filter')) ? JSON.parse(localStorage.getItem('Filter')).order : 'r.fecha_resena';
    //     setFilter(filter);
    //     if (stateUser && stateUser.loggedIn) {
    //         loadReviewsLogged();
    //     }
    // }, [stateUser]);

    // useEffect(() => {
    //     if (stateUser && !stateUser.loggedIn || !stateUser) {
    //         loadReviews();
    //     }
    // }, [filter]);

    // const loadReviewsLogged = async () => {
    //     const applyFilter = await fetch(`http://localhost:4000/all/reviews/${filter}/${encodeURIComponent(stateUser.user.correo)}`)
    //         .then(data => data.json()).catch(err => null);
    //     setReviews(applyFilter);
    // }

    // const loadReviews = async () => {
    //     const applyFilter = await fetch(`http://localhost:4000/all/reviews/${filter}`)
    //         .then(data => data.json()).catch(err => null);
    //     setReviews(applyFilter);
    // }

    const giveLike = async (review) => {
        if (review.liked === 1) {
            const id = encodeURIComponent(review.id_resena);
            const correo = encodeURIComponent(stateUser.user.correo);
            const response = await fetch(`http://localhost:4000/delete/${id}/${correo}`)
        } else {
            const id = review.id_resena
            const correo = stateUser.user.correo
            let info = `${id},${correo}`
            const response = await fetch(`http://localhost:4000/create/likeresenia/id_resena,correo_autor/${info}`)
        }
    }

    return (
        <div>
            {Array.isArray(reviews) && reviews.map((review) =>
                <div id='publicacion' key={review.id_resena}>
                    {console.log(review.liked)}
                    <div>
                        <div id='headerPublicacion'>
                            <a href=''>
                                <div id='autorPublicacion'>
                                    <img src={review.avatar} />
                                    <div>
                                        <h2>{review.nickname}</h2>
                                        <h4>{review.titulo_juego}</h4>
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
                        <h1>{review.titulo_resena}</h1>
                        <img src={process.env.PUBLIC_URL + review.imagen_resena} />
                        <p>{review.resena}</p>
                        <div id='detallesPublicacion'>
                            <div>
                                {review.liked === 1 ? (
                                    <div>
                                        <FontAwesomeIcon icon={solidHeart} size='3x' style={{ color: "#ff0000", }} onClick={giveLike(review)} /><h3>{review.total_likes}</h3>
                                    </div>
                                ) : (
                                    <div>
                                        <FontAwesomeIcon icon={regularHeart} size='3x' /><h3>{review.total_likes}</h3>
                                    </div>
                                )}

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