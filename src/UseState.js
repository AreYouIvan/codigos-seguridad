import React from "react";

const SECURITY_CODE = "paradigma";
// Como actualizar el estado???
function UseState({ name }) {
  // Por convención decidimos llamarlo State.

  const [state, setState] = React.useState({
    value: "",
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
  });

  console.log(state);

  const onConfirm = () => {
    setState({
      ...state,
      error: false,
      loading: false,
      confirmed: true,
      value: "",
    });
  };

  const onError = () => {
    setState({
      ...state,
      error: true,
      loading: false,
      value: "",
    });
  };

  const onWrite = (newValue) => {
    setState({
      ...state,
      value: newValue,
    });
  };

  const onProve = () => {
    setState({
      ...state,
      loading: true,
    });
  };

  const onDelete = () => {
    setState({
      ...state,
      deleted: true,
      confirmed: true,
    });
  };

  const onReset = () => {
    setState({
      ...state,
      confirmed: false,
      deleted: false,
    });
  };

  // El spread operator es: Todo lo que venia en el array/objeto antes, se lo vamos a incluir a la actualizacion.!! const arr = [...array]

  React.useEffect(() => {
    // console.log("Empezando Effect");
    if (!!state.loading) {
      // Cambiando el estado antes de llamar al API 1era forma de actualizar el estado.
      setState({
        ...state,
        error: false,
      });
      setTimeout(() => {
        // console.log("Haciendo la validacion");
        // console.log('Error:'+ state.value)
        if (state.value !== SECURITY_CODE) {
          onError();
        } else {
          onConfirm();
        }

        // console.log("🥴Terminando la validacion");
      }, 1500);
    }

    // console.log("Terminando Effect");
  }, [state.loading]);

  if (!state.deleted && !state.confirmed) {
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
            onWrite(event.target.value);
          }}
        />
        <button
          onClick={() => {
            onProve();
          }}
        >
          Comprobar
        </button>
      </div>
    );
  } else if (!!state.confirmed && !state.deleted) {
    return (
      <>
        <p>Are you sure to delete that shit?</p>
        <button
          onClick={() => {
            onDelete();
          }}
        >
          Yes delete it
        </button>
        <button
          onClick={() => {
            onReset();
          }}
        >
          No! go back
        </button>
      </>
    );
  } else {
    return (
      <>
        <p>Eliminado con exito!</p>
        <button
          onClick={() => {
            onReset();
          }}
        >
          Regresar al estado inicial
        </button>
      </>
    );
  }
}
export { UseState };
