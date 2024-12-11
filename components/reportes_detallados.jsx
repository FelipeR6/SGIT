import React from 'react';
import '../css/reportes_detallados.css';
import logo from '../imagenes/logo.png';

const reportes_detallados = () => {
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

            <section class="reports-detailed">
                <h2>Reportes Detallados</h2>

                <form id="reportFilters">
                    <label for="category">Categoría:</label>
                    <select id="category" name="category">
                        <option value="todos">Todos</option>
                        <option value="laptops">Laptops</option>
                        <option value="tablets">Tablets</option>
                        <option value="desktops">Desktops</option>
                    </select>

                    <label for="status">Estado:</label>
                    <select id="status" name="status">
                        <option value="todos">Todos</option>
                        <option value="disponible">Disponible</option>
                        <option value="prestado">Prestado</option>
                        <option value="mantenimiento">Mantenimiento</option>
                    </select>

                    <button type="submit" class="cta-btn">Generar Reporte</button>
                </form>

                <h3>Reportes Generados</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Descripción</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>15/11/2024</td>
                            <td>Reporte de Equipos Prestados</td>
                            <td><button>Ver</button></td>
                        </tr>
                        <tr>
                            <td>10/11/2024</td>
                            <td>Reporte de Mantenimiento de Laptops</td>
                            <td><button>Ver</button></td>
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

export default reportes_detallados;