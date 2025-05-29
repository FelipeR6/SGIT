import React from 'react';
import img1 from '../assets/imagenes/img1.jpg';
import img2 from '../assets/imagenes/img2.jpg';
import img3 from '../assets/imagenes/img3.jpg';
import CTJFR from '../assets/imagenes/CTJFR.png';

function Features() {
  return (
    <section className="features container py-5">
      <div className="row text-center">
        <div className="col-md-6 mb-4">
          <div className="feature">
            <img src={img1} className="img-fluid rounded mb-3" alt="Alcance" />
            <h3>Alcance</h3>
            <p>
              El proyecto SGIT tiene como alcance la gestión destinada a optimizar el manejo de recursos informáticos
              en la institución educativa. Esto incluye funcionalidades como registro, seguimiento de uso, préstamos,
              mantenimiento, inventario, sustitución, generación de reportes y gestión de usuarios.
            </p>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="feature">
            <img src={img2} className="img-fluid rounded mb-3" alt="Justificación" />
            <h3>Justificación</h3>
            <p>
              En el proyecto SGIT se creará un aplicativo web para simplificar los procesos de préstamo relacionado con
              equipos tecnológicos, en el cual se registrarán los equipos y se suministrará información requerida por
              los usuarios. El propósito es garantizar que los equipos se mantengan en óptimas condiciones para su uso,
              a la vez que se previenen y detectan posibles robos o pérdidas de recursos.
            </p>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="feature">
            <img src={img3} className="img-fluid rounded mb-3" alt="Planteamiento del problema" />
            <h3>Planteamiento del problema</h3>
            <p>
              En la institución educativa, se ha detectado una gestión deficiente del inventario tecnológico. La falta de
              registros adecuados de préstamos y de fichas técnicas, así como su organización física generan
              inconsistencias, demoras y otros inconvenientes que pueden resultar en pérdidas, descuido y mantenimiento
              deficiente de los equipos.
            </p>
            <p>
              ¿Cómo se puede gestionar los procesos de préstamo de equipos tecnológicos en la institución educativa?
            </p>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="feature">
            <img src={CTJFR} className="img-fluid rounded mb-3" alt="Colegio José Félix Restrepo" />
            <h3><a href="https://www.ctjfr.edu.co/" target="_blank" rel="noopener noreferrer">Colegio José Félix Restrepo</a></h3>
            <p>
              El Colegio Técnico José Félix Restrepo es una institución educativa pública ubicada en la localidad de San
              Cristóbal, Bogotá, Colombia. Reconocida por su compromiso con la inclusión y la educación ambiental, ha
              sido galardonada en múltiples ocasiones por sus proyectos socioambientales.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
