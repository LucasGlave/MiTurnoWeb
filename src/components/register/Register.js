import React from "react";

const Register = () => {
  return (
    <div className="container">
      <div className="card">
        <h1>Register</h1>
        <form>
          <div className="form-group">
            <h2>Usuario</h2>
            <input type="text" />
          </div>
          <div className="form-group">
            <h2>Contraseña</h2>
            <input type="text" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
