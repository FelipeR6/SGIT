import React, { useState } from 'react';
import Swal from 'sweetalert2';
import '../css/crud.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const FormularioPQRS = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    pqrsType: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.pqrsType || !formData.message) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, complete todos los campos.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return false; 
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(formData.email)) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, ingrese un correo electrónico válido.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(false);
    setSuccess(false);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true); 
      Swal.fire({
        title: 'Éxito',
        text: 'Formulario enviado exitosamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });

      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          pqrsType: '',
          message: ''
        });
        setSuccess(false);
      }, 2000);
    }, 2000);
  };

  return (
    <div className="card">
      <div className="card-header">Formulario PQRS</div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nombre completo</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ingrese su nombre"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Correo electrónico</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Ingrese su correo"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="pqrsType" className="form-label">Tipo de PQRS</label>
          <select
            id="pqrsType"
            name="pqrsType"
            className="form-control"
            value={formData.pqrsType}
            onChange={handleChange}
            required
          >
            <option value="" disabled selected>Seleccione una opción</option>
            <option value="peticion">Petición</option>
            <option value="queja">Queja</option>
            <option value="reclamo">Reclamo</option>
            <option value="sugerencia">Sugerencia</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">Mensaje</label>
          <textarea
            id="message"
            name="message"
            className="form-control"
            rows="4"
            placeholder="Escriba su mensaje"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-custom">Enviar</button>

        {loading && <div className="loading">Enviando...</div>}
        {error && <div className="error">Error al enviar, inténtelo nuevamente.</div>}
        {success && <div className="success" style={{ textAlign: 'center', color: 'green' }}>¡Formulario enviado exitosamente!</div>}
      </form>
    </div>
  );
};

export default FormularioPQRS;
