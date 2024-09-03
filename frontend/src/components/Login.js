import React, { useState } from 'react'
import { HeaderIndex } from './HeaderIndex'
import { Footer } from './Footer'
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para redirigir

export const Login = () => {

    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Inicializa useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = encodeURIComponent(correo);
        const response = await fetch(`http://localhost:4000/read/usuario/correo/${id}`)
            .then(data => data.json()).catch(err => null);
        if (response) {
            const pass1 = encodeURIComponent(contrasena);
            const pass2 = encodeURIComponent(response.contrasena);
            const verify = await fetch(`http://localhost:4000/verify/${pass1}/${pass2}`)
                .then(async data => {
                    const info = await data.json();
                    return info.message;
                }).catch(err => false);
            if (verify) {
                navigate('/wall', { state: { username: response.nickname } });
            } else {
                setMessage(`Las credenciales son incorrectas.`);
            }
        } else {
            setMessage(`Las credenciales son incorrectas.`);
        }
    };

    return (
        <div>
            <HeaderIndex></HeaderIndex>

            <main>
                <section id="register">
                    <h1 id="title">INICIAR SESIÓN</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <h3>Correo: </h3>
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
                                name="contrasena"
                                placeholder="Contraseña"
                                value={contrasena}
                                onChange={(e) => setContrasena(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">Iniciar Sesión</button>
                    </form>
                    {message && <p>{message}</p>}
                    <a href='/recoverPassword'>Olvidé mi contraseña</a>
                </section>
            </main>

            <Footer />
        </div>
    )
}