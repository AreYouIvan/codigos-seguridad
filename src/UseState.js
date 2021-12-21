import React from "react";

const SECURITY_CODE = "paradigma";
// Como actualizar el estado???
function UseState({ name }) {
  // Por convención decidimos llamarlo State.

  const [state, setState] = React.useState({
    value: "",
    error: false,
    loading: false,
  });

  console.log(state)

// El spread operator es: Todo lo que venia en el array/objeto antes, se lo vamos a incluir a la actualizacion.!! const arr = [...array]

  React.useEffect(() => {
    console.log("Empezando Effect");
    if (!!state.loading) {
      // Cambiando el estado antes de llamar al API 1era forma de actualizar el estado.
      setState({
        ...state,
        error: false,
      });
      setTimeout(() => {
        console.log("Haciendo la validacion");
        console.log('Error:'+ state.value)
        if (state.value !== SECURITY_CODE) {
          setState({
            ...state,
            error: true,
            loading: false,
          });

        } else {

          setState({
            ...state,
            error: false,
            loading: false,
          });

        }


        console.log("🥴Terminando la validacion");
      }, 1500);
    }

    console.log("Terminando Effect");
  }, [state.loading]);

  return (
    <div>
      <h2>Eliminar {name}</h2>
      <p>Por favor, escribe el código de seguridad.</p>
      {state.error && <p>Error: El código es incorrecto.</p>}
      {state.loading && <p>Loading...</p>}

      <input
        placeholder="Código de Seguridad"
        value={state.value}
        onChange={(event) => {
          setState({
            ...state,
            value: event.target.value,
          });
        }}
      />
      <button
        onClick={() => {
          setState({
            ...state,
            loading: true,
          });
        }}
      >
        Comprobar
      </button>
    </div>
  );
}
export { UseState };
