import React from 'react';
import { Link } from 'react-router-dom';
import '../css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import logo from '../imagenes/logo.png';
import sedea from '../imagenes/sedea.jpg';
import CTJFR from '../imagenes/CTJFR.png';
import sedeb from '../imagenes/sedeb.jpg';
import img1 from '../imagenes/img1.jpg';
import img2 from '../imagenes/img2.jpg';
import img3 from '../imagenes/img3.jpg';

function Home() {
  return (
    <div className="Home">
      <nav className="navbar bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <img src={logo} width="5%" alt="Logo" />
        </div>
      </nav>

      <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={sedea} className="d-block w-100" alt="Imagen 1" />
          </div>
          <div className="carousel-item">
            <img src={CTJFR} className="d-block w-100" alt="Imagen 2" />
          </div>
          <div className="carousel-item">
            <img src={sedeb} className="d-block w-100" alt="Imagen 3" />
          </div>
        </div>
      </div>


      <section className="features container">
        <div className="row text-center">
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="feature p-4">
              <img src={img1} alt="Feature 1" className="mb-3" width="70%" height="70%" />
              <h3>Alcance</h3>
              <p>El proyecto SGIT tiene como alcance la gestión destinada a optimizar el manejo de recursos informáticos en la institución educativa. Esto incluye funcionalidades como registro, seguimiento de uso, préstamos, mantenimiento, inventario, sustitución, generación de reportes y gestión de usuarios.</p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="feature p-4">
              <img src={img2} alt="Feature 2" className="mb-3" width="70%" height="70%" />
              <h3>Justificación</h3>
              <p>En el proyecto SGIT se creará un aplicativo web para simplificar los procesos de préstamo relacionado con equipos tecnológicos, en el cual se registrarán los equipos y se suministrará información requerida por los usuarios. El propósito es garantizar que los equipos se mantengan en óptimas condiciones para su uso, a la vez que se previenen y detectan posibles robos o pérdidas de recursos.</p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="feature p-4">
              <img src={img3} alt="Feature 3" className="mb-3" width="70%" height="70%" />
              <h3>Planteamiento del problema</h3>
              <p>En la institución educativa, se ha detectado una gestión deficiente del inventario tecnológico. La falta de registros adecuados de préstamos y de fichas técnicas, así como su organización física generan inconsistencias, demoras y otros inconvenientes que pueden resultar en pérdidas, descuido y mantenimiento deficiente de los equipos.</p>
              <p><strong>¿Cómo se puede gestionar los procesos de préstamo de equipos tecnológicos en la institución educativa?</strong></p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <h2>¿Listo para comenzar?</h2>
          <p>Únete a nosotros hoy mismo y mejora tu experiencia.</p>
          <Link to="/login" className="btn btn-light btn-lg">Bienvenido</Link>
        </div>
      </section>

      <footer className="footer">
        <div className="container text-center">
          <p>&copy; 2024 SGIT. Todos los derechos reservados.</p>
          <ul className="list-inline">
            <li className="list-inline-item"><a href="#">Privacidad</a></li>
            <li className="list-inline-item"><a href="#">Términos</a></li>
            <li className="list-inline-item"><a href="#">Soporte</a></li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default Home;
