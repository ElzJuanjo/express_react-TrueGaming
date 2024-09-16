import React, { useState, useEffect } from 'react'

export const Slider = () => {

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
            <section id="slider">
                <img src={process.env.PUBLIC_URL + '/img/slider1.png'} alt="slider1" id="slider1" />
                <img src={process.env.PUBLIC_URL + '/img/slider2.png'} alt="slider2" id="slider2" />
            </section>
        </div>
    )
}
