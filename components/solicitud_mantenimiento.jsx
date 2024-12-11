import React from 'react';
import '../css/solicitud_mantenimientos.css';
import logo from '../imagenes/logo.png';

const Reportes = () => {
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
                            <li><a href="inicio.html" class="active">Inicio</a></li>
                            <li><a href="inventario.html">Inventario</a></li>
                            <li><a href="prestamo.html">Préstamos</a></li>
                            <li><a href="mantenimiento.html">Mantenimiento</a></li>
                            <li><a href="administracion.html">Administración</a></li>
                            <li><a href="perfil.html">Perfil</a></li>
                        </ul>
                    </nav>
                </div>
            </header>
            <section class="maintenance-requests">
                <h2>Solicitudes de Mantenimiento</h2>

                <button class="cta-btn">Crear Nueva Solicitud</button>

                <h3>Historial de Solicitudes</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Equipo</th>
                            <th>Fecha de Solicitud</th>
                            <th>Estado</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Laptop HP</td>
                            <td>12/11/2024</td>
                            <td>En Proceso</td>
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
};

export default Reportes;