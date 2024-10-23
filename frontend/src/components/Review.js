import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faX } from '@fortawesome/free-solid-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import Swal from 'sweetalert2';

export const Review = ({ resena, myaccount, loadReviews }) => {
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
                await fetch(`http://localhost:4000/create/likes/id_resena,correo_autor/${info}`, {
                    method: 'POST'
                });

                updatedReview = { ...review, liked: '1', total_likes: parseInt(review.total_likes) + 1 }
            }

            setReview(updatedReview);
        }
    }

    const deleteComment = async() => {
        const response = await fetch(`http://localhost:4000/delete/resena/id_resena/${encodeURIComponent(review.id_resena)}`, {
            method: 'POST'
        })
            .then(data => data.json()).catch(err => null);
        if (response) {
            loadReviews()
        }
    }

    const confirmDelete = () => {
        Swal.fire({
            title: '¿Seguro quieres eliminar este comentario?',
            text: "Esta acción no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            customClass: {
                popup: 'dark-popup', 
                title: 'dark-title',  
                htmlContainer: 'dark-html', 
                actions: 'dark-actions', 
            },
        }).then((result) => {
            if (result.isConfirmed) {
                deleteComment();
            }
        });
    };

    return (
        
        <div>
            {(review && review.id_resena) ? (
                <div id='publicacion' >
                    <div>
                        <div id='headerPublicacion'>
                            <a href={(review.correo === (stateUser && stateUser.user &&stateUser.user.correo)) ? (`/myaccount`) : (`/users/${review.nickname}`)}>
                                <div id='autorPublicacion'>
                                    <img src={review.avatar} />
                                    <div>
                                        <h2>{review.nickname}</h2>
                                        <a href={`/game`}>
                                            <h4>{review.nombre}</h4>
                                        </a>
                                    </div>
                                </div>
                            </a>
                            <div id='autorPublicacion'>
                                <div>
                                    {((stateUser && stateUser.user && stateUser.user.correo === review.correo) && myaccount) ? (
                                        <h2>{review.puntuacion}/10 <FontAwesomeIcon icon={faX} size='xl' style={{color: "#ff0000", margin:'10px', cursor:'pointer'}} onClick={confirmDelete}/></h2>
                                    ) : (
                                        <h2>{review.puntuacion}/10</h2>
                                    )}
                                    <h4>{review.fecha_resena.slice(0, 10)}</h4>
                                </div>
                            </div>
                        </div>
                        <h1>{review.titulo}</h1>
                        {review.imagen !== 'none' ? (
                            <img src={review.imagen} />
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
