import React, { useState, useEffect } from 'react'
import { Footer } from './Footer'
import { HeaderIndex } from './HeaderIndex'
import { useNavigate } from 'react-router-dom';
import { Slider } from './Slider';
import '../Responsive.css';
import { CloseSession } from './CloseSession';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

export const Index = () => {

    const navigate = useNavigate();

    const createGuest = async () => {
        navigate('/wall')
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
                    <a href='' onClick={createGuest}>DAR UN PASEO SIN REGISTRARME</a>
                </section>
            </main>
            <Footer></Footer>
        </div>
    )
}
