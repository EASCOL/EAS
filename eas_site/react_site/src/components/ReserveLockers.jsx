import { useLocation } from "react-router-dom";
import { fetch_url } from "../config.json";
import { useState } from "react";

// To do: implement a final_date for lockers, which is 7 days after reservation

function ReserveLockers() {
  const location = useLocation();
  const [reserved, setReservation] = useState(false);

  function confirmReservation() {
    fetch(`${fetch_url}/update`, {
      method: "POST",
      body: JSON.stringify({
        collection: "lockers",
        id: location.state.from["_id"]["$oid"],
        update: {
          Availability: false,
          Occupant: "Fulanito",
        },
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(() => {
      setReservation(true);
    });
  }

  return (
    <>
      {!reserved && (
        <>
          <h2>¿Desea reservar este casillero?</h2>
          <button
            onClick={() => {
              confirmReservation();
            }}
          >
            Confirmar
          </button>
          <button
            onClick={() => {
              window.location.href = "/lockers";
            }}
          >
            Cancelar
          </button>
        </>
      )}
      {reserved && <Success />}
    </>
  );
}

function Success() {
  return (
    <>
      <div className="success-icon">
        <i className="fa-thin fa-square-check"></i>
      </div>
      <h2>Reserva realizada exitósamente</h2>
      <button onClick={() => (window.location.href = "/")}>
        Volver al inicio
      </button>
    </>
  );
}
export default ReserveLockers;
