import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

export const Review = ({ resena }) => {
    const { id } = useParams()

    const [stateUser, setStateUser] = useState(null);
    const [review, setReview] = useState({});
    const [id_review, setIdReview] = useState(id);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("LoggedUser"));
        if (user && user.loggedIn) {
            setStateUser(user);
        }
        if (resena) {
            setReview(resena)
            setIdReview(id)
        }
    }, [resena])

    const giveLike = async () => {
        if (stateUser && stateUser.loggedIn) {
            const correo = stateUser.user.correo;
            let updatedReview = review;

            if (review.liked === '1') {
                await fetch(`http://localhost:4000/delete/removeLike/${review.id_resena}/${encodeURIComponent(correo)}`, {
                    method: 'POST'
                });

                updatedReview = { ...review, liked: '0', total_likes: parseInt(review.total_likes) - 1 }
            } else {
                const info = encodeURIComponent(`${review.id_resena},${correo}`);
                await fetch(`http://localhost:4000/create/likeresenia/id_resena,correo_autor/${info}`, {
                    method: 'POST'
                });

                updatedReview = { ...review, liked: '1', total_likes: parseInt(review.total_likes) + 1 }
            }

            setReview(updatedReview);
        }
    }

    return (
        <div>
            {(review && review.id_resena) ? (
                <div id='publicacion' >
                    <div>
                        <div id='headerPublicacion'>
                            <a href={(review.correo === stateUser.user.correo) ? (`/myaccount`) : (`/users/${review.nickname}`)}>
                                <div id='autorPublicacion'>
                                    <img src={review.avatar} />
                                    <div>
                                        <h2>{review.nickname}</h2>
                                        <a href={`/game`}>
                                            <h4>{review.titulo_juego}</h4>
                                        </a>
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
                        {review.imagen_resena !== 'none' ? (
                            <img src={review.imagen_resena} />
                        ) : (
                            <p></p>
                        )}
                        <p>{review.resena}</p>
                        <div id='detallesPublicacion'>
                            <div>
                                {review.liked === '1' ? (
                                    <div>
                                        <FontAwesomeIcon icon={solidHeart} size='3x' style={{ color: "#ff0000", }} onClick={() => giveLike(review)} /><h2>{review.total_likes}</h2>
                                    </div>
                                ) : (
                                    <div>
                                        <FontAwesomeIcon icon={regularHeart} size='3x' onClick={() => giveLike(review)} /><h3>{review.total_likes}</h3>
                                    </div>
                                )}

                            </div>
                            <div>
                                <a href={`/review/${review.id_resena}`}>
                                    <FontAwesomeIcon icon={faComment} size='3x' />
                                </a>
                                <h2>{review.total_comentarios}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <h1>Cargando...</h1>
            )}
        </div>
    )
}
