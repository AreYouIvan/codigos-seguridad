import React from "react";
const SECURITY_CODE = "paradigma";

function UseReducer({ name }) {
  
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const onError = () => dispatch({ type: actionTypes.error });
  const onConfirm = () => dispatch({ type: actionTypes.confirm });
  const onDelete = () => dispatch({ type: actionTypes.delete });
  const onProve = () => dispatch({ type: actionTypes.prove });
  const onReset = () => dispatch({ type: actionTypes.reset });
  const onWrite = ({ target: { value } }) => {
    dispatch({
      type: actionTypes.write,
      payload: value,
    });
  };

  React.useEffect(() => {
    if (!!state.loading) {
      setTimeout(() => {
        if (state.value !== SECURITY_CODE) {
          onError();
        } else {
          onConfirm();
        }
      }, 1500);
    }
  }, [state.loading]);

  if (!state.deleted && !state.confirmed) {
    return (
      <div>
        <h2>Eliminar {name}</h2>
        <p>Por favor, escribe el código de seguridad.</p>
        {!!state.error && !state.loading && (
          <p>Error: El código es incorrecto.</p>
        )}
        {state.loading && <p>Loading...</p>}

        <input
          placeholder="Código de Seguridad"
          value={state.value}
          onChange={onWrite}
        />
        <button onClick={onProve}>Comprobar</button>
      </div>
    );
  } else if (!!state.confirmed && !state.deleted) {
    return (
      <>
        <p>Are you sure to delete that shit?</p>
        <button onClick={onDelete}>Yes delete it</button>
        <button onClick={onReset}>No! go back</button>
      </>
    );
  } else {
    return (
      <>
        <p>Eliminado con exito!</p>
        <button onClick={onReset}>Regresar al estado inicial</button>
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

const actionTypes = {
  confirm: "CONFIRM",
  error: "ERROR",
  write: "WRITE",
  delete: "DELETE",
  prove: "PROVE",
  reset: "RESET",
};

const reducerObject = (state, payload) => ({
  [actionTypes.error]: {
    ...state,
    error: true,
    loading: false,
    value: "",
  },
  [actionTypes.confirm]: {
    ...state,
    error: false,
    loading: false,
    confirmed: true,
    value: "",
  },
  [actionTypes.write]: {
    ...state,
    loading: false,
    value: payload,
  },
  [actionTypes.delete]: {
    ...state,
    deleted: true,
    confirmed: true,
  },
  [actionTypes.prove]: {
    ...state,
    loading: true,
  },
  [actionTypes.reset]: {
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
