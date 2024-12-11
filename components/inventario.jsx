import React from 'react';
import '../css/inventario.css';
import logo from '../imagenes/logo.png';

const inventario = () => {
  return (
    <div>
        <header>
            <div className="header-container">
                <div className="logo">
                    <img src={logo} alt="Logo de Gestión de Inventario Tecnológico" />
                </div>
                <input type="checkbox" id="menu-toggle" />
                <label htmlFor="menu-toggle" className="menu-icon" aria-hidden="true">
                    <span></span>
                    <span></span>
                    <span></span>
                </label>
                <nav>
                    <ul className="menu">
                        <li><a href="inicio" className="active">Inicio</a></li>
                        <li><a href="inventario">Inventario</a></li>
                        <li><a href="prestamo">Préstamos</a></li>
                        <li><a href="mantenimiento">Mantenimiento</a></li>
                        <li><a href="administracion">Administración</a></li>
                        <li><a href="perfil">Perfil</a></li>
                    </ul>
                </nav>
            </div>
        </header>

        <div style={{ marginTop: '80px' }}></div>

        <section className="admin-panel">
            <h2>Panel de Administración</h2>
            
            <div className="stats">
                <div className="stat">
                    <h3>Total de Equipos</h3>
                    <p>150</p>
                </div>
                <div className="stat">
                    <h3>Préstamos Pendientes</h3>
                    <p>20</p>
                </div>
                <div className="stat">
                    <h3>Equipos en Mantenimiento</h3>
                    <p>5</p>
                </div>
            </div>

            <h3>Gestión de Equipos</h3>
            <button className="cta-btn">Agregar Nuevo Equipo</button>
            <table>
                <caption>Lista de equipos registrados</caption>
                <thead>
                    <tr>
                        <th>Nombre del Dispositivo</th>
                        <th>Categoría</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Laptop HP</td>
                        <td>Laptop</td>
                        <td>Disponible</td>
                        <td>
                            <button className="edit-btn" aria-label="Editar Laptop HP">Editar</button>
                            <button className="delete-btn" aria-label="Eliminar Laptop HP">Eliminar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>

        <footer>
            <p>&copy; 2024 InventarioTech | Todos los derechos reservados</p>
        </footer>

        <script src="script.js"></script>
    </div>
  );
}

export default inventario;