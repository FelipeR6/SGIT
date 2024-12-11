import React from 'react';
import '../css/dashboard.css';
import logo from '../imagenes/logo.png';

const Dashboard = () => {
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

            <br /><br />

            <section className="dashboard">
                <h2>Estadísticas y Dashboard</h2>

                <div className="stats-cards">
                    <div className="stat-card">
                        <h3>Total de Equipos</h3>
                        <p>150</p>
                    </div>
                    <div className="stat-card">
                        <h3>Equipos en Préstamo</h3>
                        <p>30</p>
                    </div>
                    <div className="stat-card">
                        <h3>Equipos en Mantenimiento</h3>
                        <p>10</p>
                    </div>
                </div>

                <h3>Gráficos y Datos</h3>
                <div className="charts">
                    <div className="chart">
                        <h4>Distribución de Equipos</h4>
                        <canvas id="equipmentChart"></canvas>
                    </div>
                    <div className="chart">
                        <h4>Préstamos Activos</h4>
                        <canvas id="loanChart"></canvas>
                    </div>
                </div>
            </section>

            <footer>
                <p>&copy; 2024 InventarioTech | Todos los derechos reservados</p>
            </footer>

            <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
            <script src="scripts.js"></script>
        </div>
    );
}

export default Dashboard;
