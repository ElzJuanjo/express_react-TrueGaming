import React from 'react'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2'

export const Comment = ({ comment,loadCommentsLogged,loadReviewLogged }) => {

    const deleteComment = async() => {
        const response = await fetch(`http://localhost:4000/delete/comentario/id_comentario/${encodeURIComponent(comment.id_comentarioresena)}`, {
            method: 'POST'
        })
            .then(data => data.json()).catch(err => null);
        if (response) {
            loadCommentsLogged();
            loadReviewLogged();
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
        <div id='comentario'>
            <div id='headerComentario'>
                <div>
                    <img src={comment.avatar}></img>
                    <h3>{comment.nickname}</h3>
                </div>
                <div>
                    <h3>{comment.fecha_comentario.slice(0,10)}</h3>
                    {comment.commented >= 1 ? (
                        <FontAwesomeIcon icon={faX} style={{color: "#ff0000", margin:'10px', cursor:'pointer'}} onClick={confirmDelete}/>
                    ):(
                        <p></p>
                    )}
                </div>
            </div>
            <p>{comment.comentario}</p>
        </div>
    )
}
