import React, { useState } from 'react'
import { HeaderIndex } from './HeaderIndex'
import { Footer } from './Footer'
import { useNavigate } from 'react-router-dom';

export const Register = () => {

    const [nickname, setNickname] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasena1, setContrasena1] = useState('');
    const [contrasena2, setContrasena2] = useState('');
    const [message, setMessage] = useState('');
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
                    const encrypted = await fetch(`http://localhost:4000/encrypt/${contrasena1}`)
                        .then(data => data.json()).catch(err => null);
                    const pass = encrypted.message;
                    let info = `${correo},${nickname},${pass}`;
                    info = encodeURIComponent(info);
                    await fetch(`http://localhost:4000/create/usuario/correo,nickname,contrasena/${info}`, {
                        method: 'POST'
                    });
                    navigate('/login');
                }
            }

        } else {
            setMessage('Las contraseñas no coinciden.')
        }
    }

    return (
        <div>
            <HeaderIndex></HeaderIndex>

            <main>
                <section id="register">
                    <h1 id="title">REGISTRARSE</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <h3>Nickname: </h3>
                            <input
                                type="text"
                                name="nickname"
                                placeholder="Nickname"
                                value={nickname}
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
                        <button type="submit">Registrarse</button>
                    </form>
                    {message && <p>{message}</p>}
                </section>
            </main>

            <Footer></Footer>
        </div>
    )
}
