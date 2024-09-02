import React, { useState } from 'react'
import { HeaderIndex } from './HeaderIndex'
import { Footer } from './Footer'

export const Login = () => {

    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [message, setMessage] = useState('');

    const verificarCredenciales = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:4000/read/usuario/correo/${correo}`)
            .then(data => data.json()).catch(err => null);
        if (response) {
            if (contrasena === response.contrasena) {
                alert(`GG`);
                e.target.submit();
            } else {
                setMessage(`Verifica tus datos, usuario no encontrado.`);
            }
        } else {
            setMessage(`Verifica tus datos, usuario no encontrado.`);
        }
    };

    return (
        <div>
            <HeaderIndex></HeaderIndex>

            <main>
                <section id="register">
                    <h1 id="title">INICIAR SESIÓN</h1>
                    <form onSubmit={verificarCredenciales}>
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
                </section>
            </main>

            <Footer />
        </div>
    )
}
