import React, { useState, useEffect } from 'react'
import { Footer } from './Footer'
import { HeaderIndex } from './HeaderIndex'
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

export const Index = () => {
    const [image, setImage] = useState('slider1');
    const changeImage = () => {
        const gallery = ['slider1', 'slider2'];
        const nextIndex = (gallery.indexOf(image) + 1) % gallery.length;
        document.getElementById(image).style.opacity = 1;
        setImage(gallery[nextIndex]);
    }
    useEffect(() => {
        document.getElementById(image).style.opacity = 0;
    }, [image]);

    // No usar setInterval, se sobrecarga porque el componente se mantiene en un hilo :P
    setTimeout(changeImage, 8000);

    return (
        <div>
            <HeaderIndex></HeaderIndex> {/* Esta vaina toca revisarla */}
            <main>
                <section id="slider">
                    <img src={process.env.PUBLIC_URL + '/img/slider1.png'} alt="slider1" id="slider1" />
                    <img src={process.env.PUBLIC_URL + '/img/slider2.png'} alt="slider2" id="slider2" />
                </section>
                <section id="informacion">
                    {/* <img src={process.env.PUBLIC_URL + '/img/slider1.png'} alt="" /> */}
                    <div>
                        <h1>¿QUÉ ES TRUE GAMING?</h1>
                        <p>Somos mucho más que una red social, somos el lugar donde tú, mi querido amigo gamer, podrás encontrar reseñas y pruebas de rendimiento honestas y justas, somos ese lugar que siempre has querido pero que la sociedad y los medios siempre te han quitado, somos tu casa de Minecraft en la noche, somos tu hoguera de Dark Souls, somos tu campamento de Red Dead, somos... tu hogar.</p>
                        <h2>¿Qué esperas para registrarte?</h2>
                        {/* <a href=""><button>Registrarse</button></a> */}
                    </div>
                </section>
            </main>
            <Footer></Footer>
        </div>
    )
}
