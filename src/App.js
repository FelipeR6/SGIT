import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './components/inicio';  // Importamos el componente Inicio
import Home from './components/home';      // Importamos el componente Home (si lo tienes)
import Login from './components/login';    // Importamos el componente Login

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />  {/* Ruta para el componente Home */}
        <Route path="/inicio" element={<Inicio />} />  {/* Ruta para el componente Inicio */}
        <Route path="/login" element={<Login />} />   {/* Ruta para el componente Login */}
      </Routes>
    </Router>
  );
}

export default App;
