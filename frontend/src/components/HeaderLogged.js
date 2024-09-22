import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

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
                    <img id='logoLogged' src={process.env.PUBLIC_URL + "/img/logo.png"} alt="" />
                </a>
                <section id='loggedUser'>
                    <a id='iconHome' href="/"><FontAwesomeIcon icon={faHome} size='3x' /></a>
                    <a id='iconAccount' href="/myAccount">
                        <img src={stateUser && stateUser.user && stateUser.user.avatar ? (stateUser.user.avatar) : (process.env.PUBLIC_URL + "/img/default_user.jpg")} alt='AVATAR'></img>
                    </a>
                    <a href="/logout"><FontAwesomeIcon icon={faRightFromBracket} size='3x' /></a>
                </section>
            </header>
        </div>
    )
}
