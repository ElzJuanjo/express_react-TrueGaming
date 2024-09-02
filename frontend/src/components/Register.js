import React, { useState } from 'react'
import { HeaderIndex } from './HeaderIndex'
import { Footer } from './Footer'

export const Register = () => {

    const [nickname, setNickname] = useState('')
    const [correo, setCorreo] = useState('')
    const [contrasena1, setContrasena1] = useState('')
    const [contrasena2, setContrasena2] = useState('')
    // const [message,setMessage] = useState('')

    //AQUI VA EL BACKEND PARA REGISTRAR
    const handleSubmit = async (e) => {
        //aqui hace sus vueltas de backend
    }

    return (
        <div>
            <HeaderIndex></HeaderIndex>

            <main>
                <section id="register">
                    <h1 id="title">REGISTRARSE</h1>
                    <form onSubmit={handleSubmit()}>
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
                                type="text"
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
                    {/* {message && <p>{message}</p>} */}
                </section>
            </main>

            <Footer></Footer>
        </div>
    )
}
