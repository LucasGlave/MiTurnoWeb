import React from "react";
import "./register.scss";

const Register = () => {
  return (
    <div className="container">
      <div className="card">
        <div style={{ width: "80%" }}>
          <h4 className="back">&#8592; Atras</h4>
        </div>
        <h1>Crear Cuenta</h1>
        <form>
          <div className="twoForm">
            <div className="group" style={{ marginRight: "8px" }}>
              <p>Nombre y Apellido</p>
              <input type="text" placeholder="Nombre y Apellido" />
            </div>
            <div className="group">
              <p>DNI</p>
              <input type="text" placeholder="DNI" />
            </div>
          </div>
          <div className="group">
            <p>Mail</p>
            <input type="text" placeholder="Correo electrónico" />
          </div>
          <div className="twoForm" style={{ marginBottom: "16px" }}>
            <div className="group" style={{ marginRight: "8px" }}>
              <p>Contraseña</p>
              <input type="text" className="input-with-icon" />
            </div>
            <div className="group">
              <p>Repetir Contraseña</p>
              <input type="text" className="input-with-icon" />
            </div>
          </div>

          <div
            className="group"
            style={{
              backgroundColor: "#f5f5f5",
              marginBottom: "12px",
              color: "#6e6e6e",
              fontSize: "12px",
              padding: "16px, 20px, 16px, 20px",
              gap: "12px",
              borderRadius: "8px",
            }}
          >
            <div
              className="warning"
              style={{
                marginTop: "15px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                fontWeight: "500",

                gap: "12px",
              }}
            >
              La contraseña debe contener:
            </div>
            <hr
              style={{
                border: "1px solid #e1e1e1",
                width: "90%",
              }}
            />
            <div className="warningTwo">fs</div>
          </div>

          <div className="group">
            <div
              className="button"
              style={{
                marginBottom: "8px",
              }}
            >
              <button style={{ width: "100%" }}>Registrarme</button>
            </div>
            <hr
              style={{
                border: "1px solid #ccc",
                width: "100%",
                margin: "8px 0",
              }}
            />
            <div
              className="button"
              style={{
                backgroundColor: "#c9b5c9",
                width: "100%",
                borderRadius: "8px",
                marginTop: "8px",
              }}
            >
              <h4
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                ¿Ya tenes cuenta? Inicia sesion
              </h4>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
