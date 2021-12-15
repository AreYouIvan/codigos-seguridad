import React from "react";

function UseState({name}) {
  // Por convención decidimos llamarlo State.
  const [error, setError] = React.useState(false);


  return (
    <div>
      <h2>Eliminar {name}</h2>
      <p>Por favor, escribe el código de seguridad.</p>

      {error && (
        <p>Error: El código es incorrecto.</p>
      )}

      <input placeholder="Código de Seguridad" />
      <button onClick={() => setError(!error)}>Comprobar</button>
    </div>
  );
}
export { UseState };
