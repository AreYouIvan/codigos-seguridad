import React from "react";
const SECURITY_CODE = "paradigma";

function UseReducer({ name }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  
  
  React.useEffect(() => {
    if (!!state.loading) {
      setTimeout(() => {
        if (state.value !== SECURITY_CODE) {
          dispatch({ type: "ERROR" });
        } else {
          dispatch({ type: "CONFIRM" });
        }
      }, 1500);
    }
  }, [state.loading]);

  if (!state.deleted && !state.confirmed) {
    return (
      <div>
        <h2>Eliminar {name}</h2>
        <p>Por favor, escribe el código de seguridad.</p>
        {(!!state.error && !state.loading) && <p>Error: El código es incorrecto.</p>}
        {state.loading && <p>Loading...</p>}

        <input
          placeholder="Código de Seguridad"
          value={state.value}
          onChange={(event) => {
            dispatch({ type: "WRITE", payload: event.target.value });
            // event.target.value
          }}
        />
        <button
          onClick={() => {
            dispatch({ type: "PROVE" });
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
            dispatch({ type: "DELETE" });
          }}
        >
          Yes delete it
        </button>
        <button
          onClick={() => {
            dispatch({ type: "RESET" });
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
            dispatch({ type: "RESET" });
          }}
        >
          Regresar al estado inicial
        </button>
      </>
    );
  }
}

const initialState = {
  value: "",
  error: false,
  loading: false,
  deleted: false,
  confirmed: false,
};


const reducerObject = (state, payload) => ({
  'ERROR': {
    ...state,
    error: true,
    loading: false,
    value: "",
  },
  'CHECK': {
    ...state,
    loading: true,
  },
  'CONFIRM': {
    ...state,
    error: false,
    loading: false,
    confirmed: true,
    value: "",
  },
  'WRITE': {
    ...state,
    loading: false,
    value: payload,
  },
  'DELETE': {
    ...state,
    deleted: true,
    confirmed: true,
  },
  'PROVE': {
    ...state,
    loading: true,
  },
  'RESET': {
    ...state,
    confirmed: false,
    deleted: false,
  },
});

const reducer = (state, action) => {
  if (reducerObject(state)[action.type]) {
    return reducerObject(state, action.payload)[action.type];
  } else {
    return state;
  }
};

export { UseReducer };