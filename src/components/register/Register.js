import React from "react";

const Register = () => {
  return (
    <div className="container">
      <div className="card">
        <h4>Atras</h4>
        <h1>Crear Cuenta</h1>
        <form>
          <div className="form-group">
            <div className="form-name">
              <p>Nombre y Apellido</p>
              <input type="text" />
              <input type="text" />
            </div>
            <div className="form-email">
              <p>Mail</p>
              <input type="text" />
            </div>
            <div className="form-password">
              <p>Contraseña</p>
              <p>Repetir Contraseña</p>
              <input type="text" />
              <input type="text" />
            </div>
          </div>
          <div className=""></div>
        </form>
      </div>
    </div>
  );
};

export default Register;
