import React from 'react';
import '../css/mantenimiento.css';
import logo from '../imagenes/logo.png';

const mantenimiento = () => {
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

            <section class="maintenance">
                <h2>Control de Mantenimiento de Equipos</h2>

                <div class="maintenance-request">
                    <h3>Solicitar Mantenimiento</h3>
                    <form id="maintenanceForm">
                        <label for="deviceSelect">Selecciona el dispositivo:</label>
                        <select id="deviceSelect" class="device-select">
                            <option value="Laptop HP">Laptop HP</option>
                            <option value="iPad Pro">iPad Pro</option>
                            <option value="MacBook Pro">MacBook Pro</option>
                        </select>

                        <label for="maintenanceType">Tipo de Mantenimiento:</label>
                        <select id="maintenanceType" class="device-select">
                            <option value="Preventivo">Preventivo</option>
                            <option value="Correctivo">Correctivo</option>
                        </select>

                        <button type="submit" class="cta-btn">Solicitar Mantenimiento</button>
                    </form>
                </div>

                <div class="maintenance-history">
                    <h3>Historial de Mantenimiento</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Dispositivo</th>
                                <th>Tipo de Mantenimiento</th>
                                <th>Fecha</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>MacBook Pro</td>
                                <td>Correctivo</td>
                                <td>12/10/2024</td>
                                <td>Completado</td>
                            </tr>
                            <tr>
                                <td>Laptop HP</td>
                                <td>Preventivo</td>
                                <td>10/11/2024</td>
                                <td>En Proceso</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <footer>
                <p>&copy; 2024 InventarioTech | Todos los derechos reservados</p>
            </footer>

            <script src="script.js"></script>
        </div>
    );
}

export default mantenimiento;