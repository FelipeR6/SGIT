import React from 'react';
import '../css/historial.css';
import logo from '../imagenes/logo.png';

const historial = () => {
    return (
        <div>
            <header>
                <div class="header-container">
                    <div className="logo">
                        <img src={logo} alt="Logo de Gestión de Inventario Tecnológico" />
                    </div>
                    <input type="checkbox" id="menu-toggle" />
                    <label for="menu-toggle" class="menu-icon">
                        <span></span>
                        <span></span>
                        <span></span>
                    </label>
                    <nav>
                        <ul class="menu">
                            <li><a href="inicio" class="active">Inicio</a></li>
                            <li><a href="inventario">Inventario</a></li>
                            <li><a href="prestamo">Préstamos</a></li>
                            <li><a href="mantenimiento">Mantenimiento</a></li>
                            <li><a href="administracion">Administración</a></li>
                            <li><a href="perfil">Perfil</a></li>
                        </ul>
                    </nav>
                </div>
            </header>

            <section class="activity-history">
                <h2>Historial de Actividades</h2>

                <table>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Usuario</th>
                            <th>Acción Realizada</th>
                            <th>Detalle</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>14/11/2024</td>
                            <td>Juan Pérez</td>
                            <td>Solicitó préstamo de Laptop HP</td>
                            <td><button>Ver Detalles</button></td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <footer>
                <p>&copy; 2024 InventarioTech | Todos los derechos reservados</p>
            </footer>
        </div>
    );
}
export default historial;