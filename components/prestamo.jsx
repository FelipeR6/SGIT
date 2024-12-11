import React, { useState } from 'react';
import '../css/prestamo.css';
import logo from '../imagenes/logo.png';

const Inventario = () => {
    const [device, setDevice] = useState('Laptop HP');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleDeviceChange = (e) => {
        setDevice(e.target.value);
    };

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };

    const handleRequestLoan = () => {
        if (!startDate || !endDate) {
            alert('Por favor, ingrese las fechas de inicio y devolución');
        } else if (new Date(startDate) >= new Date(endDate)) {
            alert('La fecha de devolución debe ser posterior a la fecha de inicio.');
        } else {
            alert(`Préstamo solicitado para ${device} desde ${startDate} hasta ${endDate}`);
        }
    };

    const handleCancelLoan = () => {
        setDevice('Laptop HP');
        setStartDate('');
        setEndDate('');
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
                            <li><a href="inicio.html" className="active">Inicio</a></li>
                            <li><a href="inventario.html">Inventario</a></li>
                            <li><a href="prestamo.html">Préstamos</a></li>
                            <li><a href="mantenimiento.html">Mantenimiento</a></li>
                            <li><a href="administracion.html">Administración</a></li>
                            <li><a href="perfil.html">Perfil</a></li>
                        </ul>
                    </nav>
                </div>
            </header>

            <section className="loan">
                <h2>Solicitar Préstamo de Equipos</h2>

                <div className="device-selection">
                    <h3>Selecciona el equipo que deseas solicitar</h3>
                    <select
                        id="deviceSelect"
                        className="device-select"
                        value={device}
                        onChange={handleDeviceChange}
                    >
                        <option value="Laptop HP">Laptop HP</option>
                        <option value="iPad Pro">iPad Pro</option>
                        <option value="MacBook Pro">MacBook Pro</option>
                    </select>
                </div>

                <div className="loan-dates">
                    <h3>Fecha de préstamo y devolución</h3>
                    <label htmlFor="loanStartDate">Fecha de inicio:</label>
                    <input
                        type="date"
                        id="loanStartDate"
                        className="date-input"
                        value={startDate}
                        onChange={handleStartDateChange}
                    />
                    <label htmlFor="loanEndDate">Fecha de devolución:</label>
                    <input
                        type="date"
                        id="loanEndDate"
                        className="date-input"
                        value={endDate}
                        onChange={handleEndDateChange}
                    />
                </div>

                <div className="loan-action">
                    <button onClick={handleRequestLoan} className="cta-btn">Solicitar Préstamo</button>
                    <button onClick={handleCancelLoan} className="cta-btn cancel-btn">Cancelar</button>
                </div>
            </section>

            <footer>
                <p>&copy; 2024 InventarioTech | Todos los derechos reservados</p>
            </footer>
        </div>
    );
};

export default Inventario;
