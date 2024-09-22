import React, { useState, useEffect } from 'react'
import { Footer } from './Footer'
import { HeaderIndex } from './HeaderIndex'
import { useNavigate } from 'react-router-dom';
import { Slider } from './Slider';
import '../Responsive.css';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

export const Index = () => {

    // SE RECUPERA EL USUARIO
    const navigate = useNavigate();
    const [stateUser, setStateUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const checkUserAuth = () => {
            const userData = localStorage.getItem("LoggedUser");
            if (userData) {
                const parsedUser = JSON.parse(userData);
                setStateUser(parsedUser);
                if (parsedUser.loggedIn) {
                    navigate('/wall');
                }
            }
            setIsLoading(false);
        };
        checkUserAuth();
    }, [navigate]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div id='body'>
            <HeaderIndex></HeaderIndex>
            <main>
                <Slider></Slider>
                <section id="informacion">
                    <h1>¿QUÉ ES TRUE GAMING?</h1>
                    <p>Somos mucho más que una red social, somos el lugar donde tú, mi querido amigo gamer, podrás encontrar reseñas y pruebas de rendimiento honestas y justas, somos ese lugar que siempre has querido pero que la sociedad y los medios siempre te han quitado, somos tu casa de Minecraft en la noche, somos tu hoguera de Dark Souls, somos tu campamento de Red Dead, somos... tu hogar.</p>
                    <h2>¿Qué esperas para registrarte?</h2>
                    <a href="/register"><button>Registrarse</button></a>
                    <a href="/wall">DAR UN PASEO SIN REGISTRARME</a>
                </section>
            </main>
            <Footer></Footer>
        </div>
    )
}
