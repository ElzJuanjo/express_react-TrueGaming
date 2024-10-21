import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { HeaderLogged } from './HeaderLogged';
import { HeaderIndex } from './HeaderIndex';
import { Footer } from './Footer';
import { Review } from './Review';
import { Comment } from './Comment';

export const ReviewComments = () => {
    const { id } = useParams()

    const [stateUser, setStateUser] = useState(null);
    const [review, setReview] = useState(Object);
    const [id_review, setIdReview] = useState(id);
    const [writenComment, setComment] = useState('');
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("LoggedUser"));
        if (user && user.loggedIn) {
            setStateUser(user);
        } else {
            loadReview();
            loadComments();
        }
    }, [])

    useEffect(() => {
        if (stateUser && stateUser.loggedIn) {
            loadReviewLogged();
            loadCommentsLogged();
        }
    }, [stateUser])

    const loadReviewLogged = async () => {
        const Review = await fetch(`http://localhost:4000/all/review/${id_review}/${encodeURIComponent(stateUser.user.correo)}`)
            .then(data => data.json()).catch(err => null);
        setReview(Review[0]);
    }

    const loadReview = async () => {
        const Review = await fetch(`http://localhost:4000/all/review/${id_review}`)
            .then(data => data.json()).catch(err => null);
        setReview(Review[0]);
    }

    const loadCommentsLogged = async () => {
        const Comments = await fetch(`http://localhost:4000/all/comentario/${id_review}/${encodeURIComponent(stateUser.user.correo)}`)
            .then(data => data.json()).catch(err => null);
        setComments(Comments);
    }

    const loadComments = async () => {
        const Comments = await fetch(`http://localhost:4000/all/comentario/${id_review}`)
            .then(data => data.json()).catch(err => null);
        setComments(Comments);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            id_resena: review.id_resena,
            comentario: writenComment,
            correo_autor: stateUser.user.correo
        }
        const response = await fetch(`http://localhost:4000/create/comentario/id_resena,comentario,correo_autor`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        if (response) {
            setComment('');
            loadReviewLogged();
            loadCommentsLogged();
        } else {
            // tal vez poner un sweetalert mas adelante :D
        }
    }

    return (
        <div id='body'>
            {stateUser && stateUser.loggedIn ? (<HeaderLogged></HeaderLogged>) : (<HeaderIndex></HeaderIndex>)}
            <main>
                <Review resena={review}></Review>
                {stateUser && stateUser.loggedIn ? (
                    <div id='comentar'>
                        <h1>¿QUIERES COMENTAR ALGO?</h1>
                        <form onSubmit={handleSubmit}>
                            <textarea value={writenComment} onChange={(e) => setComment(e.target.value)} placeholder="Escribe aquí lo que quieras comentar" id='commentBox' required></textarea>
                            <button type='submit'>COMENTAR</button>
                        </form>
                    </div>
                ) : (
                    <h4>NO PUEDES COMENTAR SIN INICIAR SESIÓN</h4>
                )}
                {Array.isArray(comments) && comments.map((comment) =>
                    <div key={comment.id_comentarioresena}>
                        <Comment comment={comment} loadCommentsLogged={loadCommentsLogged} loadReviewLogged={loadReviewLogged}></Comment>
                    </div>
                )}
            </main>
            <Footer></Footer>
        </div>
    )
}

