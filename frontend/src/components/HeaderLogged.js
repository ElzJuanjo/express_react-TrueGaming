import React, { useEffect, useState } from 'react'

export const HeaderLogged = () => {

    //RECUPERACIÓN DE USUARIO 
    const [stateUser, setStateUser] = useState(null);
    useEffect(() => {
        const user = localStorage.getItem("LoggedUser");
        if (user) {
            setStateUser(JSON.parse(user));
        }
    }, [])

    return (
        <div>
            <header>
                <a href="/">
                    <img src={process.env.PUBLIC_URL + "/img/logo.png"} alt="" />
                </a>
                <section>
                    <div id='loggedUser'>
                        <img src={stateUser && stateUser.user && stateUser.user.avatar ? (stateUser.user.avatar) : (process.env.PUBLIC_URL + "/img/default_user.jpg")} alt='AVATAR'></img>
                        <h1>{stateUser && stateUser.user && stateUser.user.nickname ? (stateUser.user.nickname) : ("Cargando...")}</h1>
                        <a href="/myAccount"><button>MI CUENTA</button></a>
                        <a href="/logout"><button>CERRAR SESIÓN</button></a>
                    </div>
                </section>
            </header>
        </div>
    )
}
