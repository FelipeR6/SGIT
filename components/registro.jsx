import React, { useState } from 'react';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';

const Registro = () => {
  const [formData, setFormData] = useState({
    Nombre_Usuario_1: '',
    Nombre_Usuario_2: '',
    Apellidos_Usuario_1: '',
    Apellidos_Usuario_2: '',
    Telefono_1_Usuario: '',
    Telefono_2_Usuario: '',
    Correo_Usuario: '',
    Contraseña: '',
    Id_Rol: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const togglePasswordVisibility = () => {
    const passwordField = document.getElementById('Contraseña');
    const button = document.getElementById('togglePassword');
    if (passwordField.type === 'password') {
      passwordField.type = 'text';
      button.textContent = 'Ocultar';
    } else {
      passwordField.type = 'password';
      button.textContent = 'Mostrar';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    let valid = true;

    Object.keys(formData).forEach(key => {
      if (!formData[key]) {
        valid = false;
        Swal.fire({
          icon: 'error',
          title: 'Campos incompletos',
          text: `El campo ${key.replace('_', ' ')} es obligatorio.`,
        });
      }
    });

    if (!valid) {
      setLoading(false);
      return;
    }

    setTimeout(() => {
      Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        text: '¡Te has registrado correctamente!',
      }).then(() => {
        setLoading(false);
      });
    }, 1000);
  };

  return (
    <div className="card" style={{ width: '900px', margin: 'auto', marginTop: '20px' }}>
      <div className="card-header text-center" style={{ backgroundColor: '#fff', color: '#6a11cb' }}>
        Registro
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="Nombre_Usuario_1" className="form-label">Primer Nombre</label>
            <input
              type="text"
              className="form-control"
              name="Nombre_Usuario_1"
              id="Nombre_Usuario_1"
              value={formData.Nombre_Usuario_1}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Nombre_Usuario_2" className="form-label">Segundo Nombre</label>
            <input
              type="text"
              className="form-control"
              name="Nombre_Usuario_2"
              id="Nombre_Usuario_2"
              value={formData.Nombre_Usuario_2}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Apellidos_Usuario_1" className="form-label">Primer Apellido</label>
            <input
              type="text"
              className="form-control"
              name="Apellidos_Usuario_1"
              id="Apellidos_Usuario_1"
              value={formData.Apellidos_Usuario_1}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Apellidos_Usuario_2" className="form-label">Segundo Apellido</label>
            <input
              type="text"
              className="form-control"
              name="Apellidos_Usuario_2"
              id="Apellidos_Usuario_2"
              value={formData.Apellidos_Usuario_2}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Telefono_1_Usuario" className="form-label">Celular 1</label>
            <input
              type="text"
              className="form-control"
              name="Telefono_1_Usuario"
              id="Telefono_1_Usuario"
              value={formData.Telefono_1_Usuario}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Telefono_2_Usuario" className="form-label">Teléfono 2</label>
            <input
              type="text"
              className="form-control"
              name="Telefono_2_Usuario"
              id="Telefono_2_Usuario"
              value={formData.Telefono_2_Usuario}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Correo_Usuario" className="form-label">Correo</label>
            <input
              type="email"
              className="form-control"
              name="Correo_Usuario"
              id="Correo_Usuario"
              value={formData.Correo_Usuario}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 position-relative">
            <label htmlFor="Contraseña" className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              name="Contraseña"
              id="Contraseña"
              value={formData.Contraseña}
              onChange={handleChange}
            />
            <button
              type="button"
              className="btn btn-outline-secondary position-absolute top-0 end-0"
              id="togglePassword"
              onClick={togglePasswordVisibility}
            >
              Mostrar
            </button>
          </div>
          <div className="mb-3">
            <label htmlFor="Id_Rol" className="form-label">ID Rol</label>
            <input
              type="text"
              className="form-control"
              name="Id_Rol"
              id="Id_Rol"
              value={formData.Id_Rol}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-custom" disabled={loading}>
              {loading ? 'Cargando...' : 'Registrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registro;
