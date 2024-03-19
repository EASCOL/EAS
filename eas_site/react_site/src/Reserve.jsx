import { useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./css/Reserve.css";
import { useState } from "react";
import { fetch_url } from "./config.json";

function Reserve() {
  const [startDate, setStartDate] = useState(new Date());
  const location = useLocation();
  const block = location.state.from.Block;
  const query_type = location.state.query_type;
  const resource =
    query_type == "classroom"
      ? location.state.from.Block.Classroom
      : location.state.from.Block.Locker;

  function confirmReservation() {
    fetch(`${fetch_url}/update`, {
      method: "POST",
      body: JSON.stringify({
        collection: query_type,
        id: location.state.from["_id"]["$oid"],
        update: {
            Availability: false,
        },
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(() => {
      alert("Reserva hecha")
      window.location.href = "/";
    });
  }

  if (!location.state) {
    window.location.href = "/";
    return "";
  }

  return (
    <>
      <div className="reservation-window">
        <div className="reservation-info">
          <h3 className="reservation-title">Reservación de aula</h3>
          <p>Bloque: {block}</p>
          <p>Aula: 401</p>
        </div>
        <form action="" onSubmit={(e) => e.preventDefault()}>
            <div className="form-section">
              <label htmlFor="reservation-date">Fecha de la reserva: </label>
              <DatePicker
                id="reservation-date"
                minDate={new Date()}
                showIcon
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
              ></DatePicker>
            </div>
            <div className="form-section">
              <label htmlFor="reservation-start-hour">
                Hora de inicio / final:{" "}
              </label>
              <input type="time" name="" id="reservation-start-hour" />
              <input type="time" name="" id="reservation-final-hour" />
            </div>
            <div className="form-section"></div>
            <div className="form-section">
              <label htmlFor="reservation-motive">Motivo de reserva:</label>
              <textarea
                name="res-motive"
                id="reservation-motive"
                res
              ></textarea>
            </div>
          <div className="submit-section">
            <button
              onClick={() => {
                confirmReservation();
              }}
            >
              Confirmar
            </button>
            <button>Cancelar</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Reserve;
