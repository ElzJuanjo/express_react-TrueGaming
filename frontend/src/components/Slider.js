import React, { useState, useEffect } from 'react';

export const Slider = () => {
  const [image, setImage] = useState('slider1');
  const gallery = ['slider1', 'slider2'];

  useEffect(() => {
    const timer = setTimeout(() => {
      const nextIndex = (gallery.indexOf(image) + 1) % gallery.length;
      setImage(gallery[nextIndex]);
    }, 8000);

    // Limpia el temporizador al desmontar el componente
    return () => clearTimeout(timer);
  }, [image]);

  return (
    <div>
      <section id="slider">
        <img
          src={process.env.PUBLIC_URL + '/img/slider1.png'}
          alt="slider1"
          id="slider1"
          style={{ opacity: image === 'slider1' ? 1 : 0, transition: 'opacity 1s ease' }}
        />
        <img
          src={process.env.PUBLIC_URL + '/img/slider2.png'}
          alt="slider2"
          id="slider2"
          style={{ opacity: image === 'slider2' ? 1 : 0, transition: 'opacity 1s ease' }}
        />
      </section>
    </div>
  );
};
