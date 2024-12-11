import React from 'react';
import '../css/perfil.css';
import logo from '../imagenes/logo.png';
import Foto_de_perfil from '../imagenes/logo.png';

const perfil = () => {
    const handlePasswordChange = () => {
        alert('Cambiar Contraseña');
    };

    const handleInfoUpdate = (e) => {
        e.preventDefault();
        alert('Información Actualizada');
    };

    return (
        <div>
            <header>
                <div className="header-container">
                    <div className="logo">
                        <img src={logo} alt="Logo de Gestión de Inventario Tecnológico" />
                    </div>
                    <input type="checkbox" id="menu-toggle" />
                    <label htmlFor="menu-toggle" className="menu-icon">
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

            <section className="profile">
                <div className="profile-header">
                    <img src={Foto_de_perfil} alt="Foto de perfil" className="profile-img" />
                    <h2>Bienvenido, <span id="userName">Juan Pérez</span></h2>
                    <p className="user-role">Docente de Matemáticas</p>
                </div>

                <div className="profile-info">
                    <h3>Información Personal</h3>
                    <form id="profileForm" onSubmit={handleInfoUpdate}>
                        <div className="form-group">
                            <label htmlFor="fullName">Nombre Completo:</label>
                            <input type="text" id="fullName" name="fullName" value="Juan Pérez" disabled />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Correo Electrónico:</label>
                            <input type="email" id="email" name="email" value="juan.perez@instituto.edu" disabled />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Teléfono:</label>
                            <input type="tel" id="phone" name="phone" value="555-123456" disabled />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Contraseña:</label>
                            <input type="password" id="password" name="password" value="******" />
                            <button type="button" className="cta-btn" onClick={handlePasswordChange}>Cambiar Contraseña</button>
                        </div>

                        <button type="submit" className="cta-btn">Actualizar Información</button>
                    </form>
                </div>

                <div className="profile-history">
                    <h3>Historial de Préstamos</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Dispositivo</th>
                                <th>Fecha de Préstamo</th>
                                <th>Fecha de Devolución</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Laptop HP</td>
                                <td>10/11/2024</td>
                                <td>20/11/2024</td>
                                <td>Devuelto</td>
                            </tr>
                            <tr>
                                <td>iPad Pro</td>
                                <td>15/10/2024</td>
                                <td>25/10/2024</td>
                                <td>Devuelto</td>
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

export default perfil;
