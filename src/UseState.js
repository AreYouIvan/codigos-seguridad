import React from "react";

const SECURITY_CODE = "paradigma";
// Como actualizar el estado???
function UseState({ name }) {
  // Por convención decidimos llamarlo State.
  const [error, setError] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    console.log("Empezando Effect");
    if (!!loading) {
      setTimeout(() => {
        console.log("Haciendo la validacion");
        if (value !== SECURITY_CODE) {
          setError(true);
        } else {
          setError(false);
        }
        setLoading(false);

        console.log("🥴Terminando la validacion");
      }, 1500);
    }

    console.log("Terminando Effect");
  }, [loading]);

  return (
    <div>
      <h2>Eliminar {name}</h2>
      <p>Por favor, escribe el código de seguridad.</p>
      {!error && <p>Codigo correcto</p>}
      {error && <p>Error: El código es incorrecto.</p>}
      {loading && <p>Loading...</p>}

      <input
        placeholder="Código de Seguridad"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
      />
      <button onClick={() => setLoading(true)}>Comprobar</button>
    </div>
  );
}
export { UseState };
