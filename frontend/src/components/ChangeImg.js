import React, { useEffect, useState } from 'react'
import { HeaderLogged } from './HeaderLogged';
import useSession from '../hooks/UseSession';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const ChangeImg = () => {

    const [uploadType, setUploadType] = useState('');
    const navigate = useNavigate();

    // GET SESSION
    const stateUser = useSession()

    const handleSubmit = async (e) => {
        e.preventDefault()
        let image = '';

        if (uploadType === 'file') {
            const formData = new FormData();
            if (e.target.imgReview.files.length > 0) {
                formData.append('imgReview', e.target.imgReview.files[0]);
                const upload = await fetch(`http://localhost:4000/upload`, {
                    method: 'POST',
                    body: formData,
                });
                image = await upload.json();
                image = process.env.PUBLIC_URL + image.path.slice(18);
            }
        } else if (uploadType === 'url') {
            image = e.target.urlReview.value;
        } else {
            image = 'https://www.4x4.ec/overlandecuador/wp-content/uploads/2017/06/default-user-icon-8.jpg';
        }
        const change = await fetch(`http://localhost:4000/update/usuario/avatar/${encodeURIComponent(image)}/correo/${encodeURIComponent(stateUser.user.correo)}`, {
            method: 'POST'
        }).then(data => data.json()).catch(err => null);
        if (change) {
            const newStorage = await fetch(`http://localhost:4000/read/usuario/correo/${encodeURIComponent(stateUser.user.correo)}`)
                .then(data => data.json()).catch(err => null);

            newStorage.contrasena = ""
            const stateData = { user: newStorage, loggedIn: true }
            localStorage.setItem("LoggedUser", JSON.stringify(stateData))
            Swal.fire({
                title: 'Tu foto de perfil se ha actualizado con exito.',
                icon: 'success',
                confirmButtonColor: 'green',
                confirmButtonText: 'Aceptar',
                customClass: {
                    popup: 'dark-popup',
                    htmlContainer: 'dark-html',
                    actions: 'dark-actions',
                },
            }).then(res => {
                navigate('/myaccount');
            });
        } else {
            Swal.fire({
                title: 'Algo ha salido mal.',
                icon: 'warning',
                confirmButtonColor: 'green',
                confirmButtonText: 'Aceptar',
                customClass: {
                    popup: 'dark-popup',
                    htmlContainer: 'dark-html',
                    actions: 'dark-actions',
                },
            }).then(res => {
            });
        }

    }

    return (
        <div id='body'>
            <HeaderLogged></HeaderLogged>
            <main>
                <form onSubmit={handleSubmit} method='post' encType='multipart/form-data'>
                    <h3>Selecciona cómo quieres cambiar tu foto de perfil:</h3>
                    <button type='button' onClick={() => setUploadType('file')}>
                        Subir Archivo
                    </button>
                    <button type='button' onClick={() => setUploadType('url')}>
                        Ingresar URL
                    </button>
                    {(stateUser && stateUser.user && stateUser.user.avatar !== "https://www.4x4.ec/overlandecuador/wp-content/uploads/2017/06/default-user-icon-8.jpg") ? (
                        <button type='button' onClick={() => setUploadType('none')}>
                            Sin Foto
                        </button>
                    ) : (
                        <p></p>
                    )}
                    {uploadType === 'file' && (
                        <div>
                            <h3>Imagen (Archivo):</h3>
                            <input
                                type='file'
                                name='imgReview'
                                id='imgReview'
                                accept='image/*'
                                required
                            />
                            <button id='boton' type='submit'>
                                Publicar
                            </button>
                        </div>
                    )}
                    {uploadType === 'url' && (
                        <div>
                            <h3>Imagen (URL):</h3>
                            <input
                                type='url'
                                name='urlReview'
                                placeholder='Ingresa el Url de la imagen'
                                required
                            />
                            <button id='boton' type='submit'>
                                Publicar
                            </button>
                        </div>
                    )}
                    {uploadType === 'none' && (
                        <div>
                            <h4>Tu foto de perfil será eliminada</h4>
                            <button id='boton' type='submit'>
                                Aceptar
                            </button>
                        </div>
                    )}
                </form>
            </main>
        </div>
    )
}
