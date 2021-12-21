import React from "react";
import Loading from "./Loading";

const SECURITY_CODE = "paradigma";

class ClassState extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      loading: false,
      value: '',
    };
  }

  // componentWillUnmount() {
  //   console.log("componentWillUnmount");
  // }
  // componentDidMount() {
  //   console.log("componentDidMount");
  // }
  // UNSAFE_componentWillMount() {
  //   console.log("componentWillMount");
  // }

  componentDidUpdate() {
    // console.log("actualizacion");

    if (!!this.state.loading) {
      setTimeout(() => {
        // console.log("Haciendo la validacion");

        if(SECURITY_CODE === this.state.value) {
          this.setState({ 
            loading: false,
            error: false
          });
        } else {
          this.setState({
            error: true,
            loading: false,
          });
        }
        // console.log("🥴Terminando la validacion");
      }, 1500);
    }
  }

  render() {
    return (
      <div>
        <h2>Eliminar {this.props.name}</h2>
        <p>Por favor, escribe el código de seguridad.</p>
        <input
          placeholder="Código de Seguridad"
          value={this.state.value}
          onChange={(event) => {
            this.setState({ value: event.target.value });
          }}
        />
        {(this.state.error && !this.state.loading) &&
          (<p>Error: El código es incorrecto.</p>)}
        {this.state.loading && <Loading />}
        <button onClick={() => this.setState({ loading: true })}>
          Comprobar
        </button>
      </div>
    );
  }
}

export { ClassState };
