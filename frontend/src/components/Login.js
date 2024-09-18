import React, { useState } from 'react'
import { HeaderIndex } from './HeaderIndex'
import { Footer } from './Footer'
import { useNavigate } from 'react-router-dom';

export const Login = () => {

    // FORMULARIO
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [message, setMessage] = useState('');

    // VERIFICACIÓN CORREO
    const [enableToken, setEnableToken] = useState(false);
    const [tokenSended, setTokenSended] = useState(null);
    const [token, setToken] = useState('');

    // PREVENCIÓN PYPASS
    const [key, setKey] = useState('');

    const navigate = useNavigate();

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
                const stateData = { user: response, loggedIn: true }                //Guardado en la sesión
                localStorage.setItem("LoggedUser", JSON.stringify(stateData))       //Guardado en la sesión

                const filterData = { title: 'reciente', order: 'r.fecha_resena' };
                localStorage.setItem('Filter', JSON.stringify(filterData));
                navigate('/wall');
            } else {
                setMessage(`Las credenciales son incorrectas.`);
            }
        } else {
            setMessage(`Las credenciales son incorrectas.`);
        }
    };

    const sendToken = async () => {
        if (correo) {
            const id = encodeURIComponent(correo);
            const verifyEmail = await fetch(`http://localhost:4000/read/usuario/correo/${id}`)
                .then(data => data.json()).catch(err => null);

            if (verifyEmail) {
                const button = document.getElementById('recuperar');
                button.style.display = "none";
                setMessage('Por favor, espera un momento...');

                const title = 'Recuperación de Cuenta';
                const response = await fetch(`http://localhost:4000/token/${id}/${title}`, {
                    method: 'POST'
                }).then(async answer => {
                    const info = await answer.json();
                    return info.data;
                }).catch(err => null);

                if (response) {
                    setTokenSended(response.message);
                    setKey(response.email);
                    setEnableToken(true);
                    setMessage('Revisa tu correo. Hemos enviado una verificación para que recuperes tu cuenta.');
                } else {
                    button.style.display = "block";
                    setMessage('Algo ha salido mal. Ponte en contacto con soporte.');
                }
            } else {
                setMessage('Este correo no se encuentra registrado.');
            }
        } else {
            setMessage('Ingresa tu correo en el campo y vuelve a dar click.')
        }
    }

    const verifyToken = (e) => {
        e.preventDefault();
        if (token === tokenSended) {
            navigate('/recoverPass', { state: { email: key } });
        } else {
            setMessage('El token ingresado no coincide con el enviado.')
        }
    }

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
                    {message && <p id="msgForm">{message}</p>}
                    <p id="recuperar" onClick={sendToken}>Olvidé mi contraseña</p>
                    {enableToken && (
                        <form onSubmit={verifyToken}>
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

            <Footer />
        </div>
    )
}