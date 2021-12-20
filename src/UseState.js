import React from "react";

function UseState({ name }) {
  // Por convención decidimos llamarlo State.
  const [error, setError] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    console.log("Empezando Effect");

    if (!!loading) {
      setTimeout(() => {
        console.log("Haciendo la validacion");

        setLoading(false);

        console.log("🥴Terminando la validacion");
      }, 2000);
  }

    console.log("Terminando Effect");
  }, [loading]);

  return (
    <div>
      <h2>Eliminar {name}</h2>
      <p>Por favor, escribe el código de seguridad.</p>

      {error && <p>Error: El código es incorrecto.</p>}
      {loading && <p>Loading...</p>}

      <input placeholder="Código de Seguridad" />
      <button onClick={() => setLoading(true)}>Comprobar</button>
    </div>
  );
}
export { UseState };
