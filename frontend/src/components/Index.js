import React from 'react'
import { Footer } from './Footer'
import { HeaderIndex } from './HeaderIndex'
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

export const Index = () => {
    function slide() {
        if (document.getElementById("slider1").style.opacity === 1) {
            document.getElementById("slider1").style.opacity = 0
            document.getElementById("slider2").style.opacity = 1
        } else {
            document.getElementById("slider1").style.opacity = 1
            document.getElementById("slider2").style.opacity = 0
        }
    }

    setInterval(slide, 5000);

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
