import React from 'react';
import '../css/inicio.css';
import logo from '../imagenes/logo.png';

const Consultar = () => {
    return (
        <div className="p-3 bd-example border-0">
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

            <div className="container">
                <div className="row">
                    <div className="col-md-4 mb-4">
                        <div className="card border-info mb-3" style={{ maxWidth: '20rem' }}>
                            <div className="card-header">Mantenimiento</div>
                            <div className="card-body text-center">
                                <h5 className="card-title">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-wrench" viewBox="0 0 16 16" style={{ width: '50px', height: '50px' }}>
                                        <path d="M0 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h12a1 1 0 0 1 1-1V2a1 1 0 0 1-1-1H0z"/>
                                    </svg>
                                </h5>
                                <button type="button" className="btn btn-outline-secondary" onClick={() => window.location.href = '/mantenimiento'}>Comprobar</button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mb-4">
                        <div className="card border-info mb-3" style={{ maxWidth: '20rem' }}>
                            <div className="card-header">Equipos</div>
                            <div className="card-body text-center">
                                <h5 className="card-title">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-pc-display" viewBox="0 0 16 16" style={{ width: '50px', height: '50px' }}>
                                        <path d="M8 1a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1z"/>
                                    </svg>
                                </h5>
                                <button type="button" className="btn btn-outline-secondary" onClick={() => window.location.href = '/equipos'}>Comprobar</button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mb-4">
                        <div className="card border-info mb-3" style={{ maxWidth: '20rem' }}>
                            <div className="card-header">Usuario</div>
                            <div className="card-body text-center">
                                <h5 className="card-title">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16" style={{ width: '50px', height: '50px' }}>
                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                                        <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                                    </svg>
                                </h5>
                                <button type="button" className="btn btn-outline-secondary" onClick={() => window.location.href = '/usuario'}>Comprobar</button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mb-4">
                        <div className="card border-info mb-3" style={{ maxWidth: '20rem' }}>
                            <div className="card-header">Préstamo</div>
                            <div className="card-body text-center">
                                <h5 className="card-title">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-arrow-left-right" viewBox="0 0 16 16" style={{ width: '50px', height: '50px' }}>
                                        <path fillRule="evenodd" d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5m14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5"/>
                                    </svg>
                                </h5>
                                <button type="button" className="btn btn-outline-secondary" onClick={() => window.location.href = '/prestamos'}>Comprobar</button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mb-4">
                        <div className="card border-info mb-3" style={{ maxWidth: '20rem' }}>
                            <div className="card-header">Hoja de vida</div>
                            <div className="card-body text-center">
                                <h5 className="card-title">
                                    <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '50px', height: '50px' }} fill="currentColor" className="bi bi-clipboard-check" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
                                        <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/>
                                        <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/>
                                    </svg>
                                </h5>
                                <button type="button" className="btn btn-outline-secondary" onClick={() => window.location.href = 'hoja_de_vida/comprobar_hv.php'}>Comprobar</button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mb-4">
                        <div className="card border-info mb-3" style={{ maxWidth: '20rem' }}>
                            <div className="card-header">Modelo Equipo</div>
                            <div className="card-body text-center">
                                <h5 className="card-title">
                                    <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '50px', height: '50px' }} fill="currentColor" className="bi bi-window-plus" viewBox="0 0 16 16">
                                        <path d="M2.5 5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1M4 5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m2-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"/>
                                        <path d="M0 4a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v4a.5.5 0 0 1-1 0V7H1v5a1 1 0 0 0 1 1h5.5a.5.5 0 0 1 0 1H2a2 2 0 0 1-2-2zm1 2h13V4a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1z"/>
                                        <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0m-3.5-2a.5.5 0 0 0-.5.5v1h-1a.5.5 0 0 0 0 1h1v1a.5.5 0 0 0 1 0v-1h1a.5.5 0 0 0 0-1h-1v-1a.5.5 0 0 0-.5-.5"/>
                                    </svg>
                                </h5>
                                <button type="button" className="btn btn-outline-secondary" onClick={() => window.location.href = 'modelo/comprobar_modelo.php'}>Comprobar</button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mb-4">
                        <div className="card border-info mb-3" style={{ maxWidth: '20rem' }}>
                            <div className="card-header">Categoría</div>
                            <div className="card-body text-center">
                                <h5 className="card-title">
                                    <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '50px', height: '50px' }} fill="currentColor" className="bi bi-tags" viewBox="0 0 16 16">
                                        <path d="M3 2v4.586l7 7L14.586 9l-7-7zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586z"/>
                                        <path d="M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1z"/>
                                    </svg>
                                </h5>
                                <button type="button" className="btn btn-outline-secondary" onClick={() => window.location.href = 'categoria/comprobar_categoria.php'}>Comprobar</button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mb-4">
                        <div className="card border-info mb-3" style={{ maxWidth: '20rem' }}>
                            <div className="card-header">Ubicación</div>
                            <div className="card-body text-center">
                                <h5 className="card-title">
                                    <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '50px', height: '50px' }} fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                                        <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
                                    </svg>
                                </h5>
                                <button type="button" className="btn btn-outline-secondary" onClick={() => window.location.href = 'ubicacion/ubicacion.php'}>Comprobar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Consultar;
