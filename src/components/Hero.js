import React from 'react';
import sedea1 from '../assets/imagenes/sedea1.jpg';

function Hero() {
  return (
    <section className="hero">
      <img src={sedea1} className="img-fluid w-100" alt="Imagen principal" />
    </section>
  );
}

export default Hero;
