import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HeaderIndex } from './HeaderIndex';
import { Footer } from './Footer';

export const RecoverPass = () => {
    const [contrasena1, setContrasena1] = useState('');
    const [contrasena2, setContrasena2] = useState('');
    const [message, setMessage] = useState('');

    const location = useLocation();
    const { email } = location.state || {}; // Accede al correo
    const navigate = useNavigate();

    useEffect(() => { // Se ejecuta en paralelo al cargado del componente
        if (!email) {
            navigate('/');
        }
    }, [email, navigate]); // Lista de dependencias

    if (!email) {
        return null; // No renderiza nada mientras redirige
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (contrasena1 === contrasena2) {
            const id = encodeURIComponent(email);
            const boton = document.getElementById('changeButton');
            boton.disabled = true;
            setMessage('Por favor, espera un momento...');

            const title = 'Cambio de Credenciales';
            const response = await fetch(`http://localhost:4000/change/${id}/${title}`, {
                method: 'POST'
            }).then(answer => answer).catch(err => null);

            if (response) {
                const encrypted = await fetch(`http://localhost:4000/encrypt/${contrasena1}`)
                    .then(data => data.json()).catch(err => null);
                const pass = encrypted.message;
                const data = encodeURIComponent(pass);

                const update = await fetch(`http://localhost:4000/update/usuario/contrasena/${data}/correo/${id}`, {
                    method: 'POST'
                }).then(answer => answer).catch(err => null);

                if (update) {
                    navigate('/login');
                } else {
                    setMessage('Algo ha salido mal. Ponte en contacto con soporte.');
                }
            } else {
                setMessage('Algo ha salido mal. Ponte en contacto con soporte.');
            }

        } else {
            setMessage('Las contraseñas no coinciden.');
        }
    }

    return (
        <div>
            <HeaderIndex></HeaderIndex>

            <main>
                <section id="register">
                    <h1 id="title">CAMBIO DE CREDENCIALES</h1>
                    <h4 style={{ textDecoration: 'underline' }}>{email}</h4>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <h3>Nueva Contraseña: </h3>
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
                        <button id="changeButton" type="submit">Confirmar</button>
                    </form>
                    {message && <p id="msgForm">{message}</p>}
                </section>
            </main>

            <Footer />
        </div>
    );
};