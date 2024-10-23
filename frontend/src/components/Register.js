import React, { useState } from 'react'
import { HeaderIndex } from './HeaderIndex'
import { Footer } from './Footer'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const Register = () => {

    // FORMULARIO
    const [nickname, setNickname] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasena1, setContrasena1] = useState('');
    const [contrasena2, setContrasena2] = useState('');
    const [message, setMessage] = useState('');

    // VERIFICACIÓN CORREO
    const [enableToken, setEnableToken] = useState(false);
    const [token, setToken] = useState('');
    const [tokenSended, setTokenSended] = useState(null);

    // PREVENCIÓN BYPASS
    const [key, setKey] = useState('');
    const [user, setUser] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (contrasena1 === contrasena2) {
            let id = encodeURIComponent(correo);
            const verifyEmail = await fetch(`http://localhost:4000/read/usuario/correo/${id}`)
                .then(data => data.json()).catch(err => null);

            if (verifyEmail) {
                setMessage('Este correo ya se encuentra registrado.')
            } else {
                id = encodeURIComponent(nickname);
                const verifyUser = await fetch(`http://localhost:4000/read/usuario/nickname/${id}`)
                    .then(data => data.json()).catch(err => null);

                if (verifyUser) {
                    setMessage('Este nombre de usuario ya se encuentra en uso.')
                } else {
                    const boton = document.getElementById('registerButton');
                    boton.disabled = true;
                    setMessage('Por favor, espera un momento...');
                    setUser(nickname);

                    id = encodeURIComponent(correo);
                    const title = 'Verificación de Registro';
                    const response = await fetch(`http://localhost:4000/token/${id}/${title}`, {
                        method: 'POST'
                    }).then(async answer => {
                        const info = await answer.json()
                        return info.data;
                    }).catch(err => null);

                    if (response) {
                        setTokenSended(response.message);
                        setKey(response.email);
                        setMessage('Revisa tu correo. Hemos enviado una verificación para que completes tu registro.');
                        setEnableToken(true);
                        boton.style = "background: #505050";
                    } else {
                        boton.disabled = false;
                        setMessage('Algo ha salido mal. Ponte en contacto con soporte.');
                    }
                }
            }

        } else {
            setMessage('Las contraseñas no coinciden.')
        }
    }

    const confirmRegisterAlert = () => {
        Swal.fire({
            title: '¡Te has registrado con exito!',
            text: `Bienvenido a la familia, ${nickname}`,
            icon: 'success',
            confirmButtonColor: 'green',
            confirmButtonText: '¡Genial!',
            customClass: {
                popup: 'dark-popup', 
                htmlContainer: 'dark-html', 
                actions: 'dark-actions', 
            },
        }).then((result) => {
            if (result.isDismissed || result.isConfirmed) {
                navigate('/login');
            }
        });
    };

    const confirmRegister = async (e) => {
        e.preventDefault();
        if (token === tokenSended) {
            const encrypted = await fetch(`http://localhost:4000/encrypt/${contrasena1}`)
                .then(data => data.json()).catch(err => null);
            const pass = encrypted.message;
            const avatar = "https://www.4x4.ec/overlandecuador/wp-content/uploads/2017/06/default-user-icon-8.jpg";
            const bio = "Hi. I am new to TrueGaming!"; 
            let info = `${key},${user},${pass},${avatar},${bio}`;
            info = encodeURIComponent(info);
            await fetch(`http://localhost:4000/create/usuario/correo,nickname,contrasena,avatar,bio/${info}`, {
                method: 'POST'
            });
            confirmRegisterAlert();
        } else {
            setMessage('El token ingresado no coincide con el enviado.')
        }
    }

    return (
        <div id='body'>
            <HeaderIndex></HeaderIndex>
            <main>
                <section id="formulario">
                    <h1>REGISTRARSE</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <h3>Nickname: </h3>
                            <input
                                type="text"
                                name="nickname"
                                placeholder="Nickname"
                                value={nickname}
                                minLength="5"
                                maxLength="20"
                                onChange={(e) => setNickname(e.target.value)}
                                required />
                        </div>
                        <div>
                            <h3>Correo Electronico: </h3>
                            <input
                                type="email"
                                name="correo"
                                placeholder="Correo"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <h3>Contraseña: </h3>
                            <input
                                type="password"
                                name="contrasena1"
                                placeholder="Contraseña"
                                minLength="8"
                                maxLength="32"
                                value={contrasena1}
                                onChange={e => setContrasena1(e.target.value)}
                                required />
                        </div>
                        <div>
                            <h3>Confirmar Contraseña: </h3>
                            <input
                                type="password"
                                name="contrasena2"
                                placeholder="Contraseña"
                                value={contrasena2}
                                onChange={e => setContrasena2(e.target.value)}
                                required />
                        </div>
                        <button id="registerButton" type="submit">Registrarse</button>
                    </form>
                    {message && <p id="msgForm">{message}</p>}
                    {enableToken && (
                        <form id='formToken' onSubmit={confirmRegister}>
                            <input
                                type="text"
                                onChange={e => setToken(e.target.value)}
                                placeholder="Ingresa el Token"
                                required />
                            <button type="submit">Validar</button>
                        </form>
                    )}
                </section>
            </main>
            <Footer></Footer>
        </div>
    )
}
