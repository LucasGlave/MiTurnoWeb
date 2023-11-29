import React from "react";
import styles from "../../app/general.module.scss";

const Steps = ({ isBranchOfficeSelected, isDaySelected, isFormComplete }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* --------- PRIMER PASO --------- */}

          <p
            className={isBranchOfficeSelected ? styles.pVerde : styles.pVioleta}
          />
          <div
            className={
              isBranchOfficeSelected ? styles.circuloVerde : styles.circulo
            }
          >
            1
          </div>
          <p
            className={isBranchOfficeSelected ? styles.pVerde : styles.pVioleta}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* --------- SEGUNDO PASO --------- */}

          <p
            className={
              isBranchOfficeSelected
                ? isDaySelected
                  ? styles.pVerde
                  : styles.pVioleta
                : styles.pGris
            }
          />
          <div
            className={
              isBranchOfficeSelected
                ? isDaySelected
                  ? styles.circuloVerde
                  : styles.circulo
                : styles.circuloGris
            }
          >
            2
          </div>
          <p
            className={
              isBranchOfficeSelected
                ? isDaySelected
                  ? styles.pVerde
                  : styles.pVioleta
                : styles.pGris
            }
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* --------- TERCER PASO --------- */}

          <p
            className={
              isBranchOfficeSelected
                ? isDaySelected
                  ? isFormComplete
                    ? styles.pVerde
                    : styles.pVioleta
                  : styles.pGris
                : styles.pGris
            }
          />
          <div
            className={
              isBranchOfficeSelected
                ? isDaySelected
                  ? isFormComplete
                    ? styles.circuloVerde
                    : styles.circulo
                  : styles.circuloGris
                : styles.circuloGris
            }
          >
            3
          </div>
          <p
            className={
              isBranchOfficeSelected
                ? isDaySelected
                  ? isFormComplete
                    ? styles.pVerde
                    : styles.pVioleta
                  : styles.pGris
                : styles.pGris
            }
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-around",
        }}
      >
        <h3
          style={
            isBranchOfficeSelected
              ? { color: "#19a649", marginLeft: "1.2rem" }
              : { color: "#a442f1", marginLeft: "1.2rem" }
          }
        >
          Elegí tu sucursal
        </h3>
        <h3
          style={
            isBranchOfficeSelected
              ? isDaySelected
                ? { color: "#19a649", marginLeft: "2.6rem" }
                : { color: "#a442f1", marginLeft: "2.6rem" }
              : { color: "#bfbfbf", marginLeft: "2.6rem" }
          }
        >
          Seleccioná el día
        </h3>
        <h3
          style={
            isBranchOfficeSelected
              ? isDaySelected
                ? isFormComplete
                  ? { color: "#19a649", marginLeft: "1rem" }
                  : { color: "#a442f1", marginLeft: "1rem" }
                : { color: "#bfbfbf", marginLeft: "1rem" }
              : { color: "#bfbfbf", marginLeft: "1rem" }
          }
        >
          Completá el formulario
        </h3>
      </div>
    </div>
  );
};

export default Steps;
