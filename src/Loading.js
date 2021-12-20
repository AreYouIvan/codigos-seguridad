import React from "react";

class Loading extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      loading: false,
    };
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
  }
  componentDidMount() {
    console.log("componentDidMount");
  }
  UNSAFE_componentWillMount() {
    console.log("componentWillMount");
  }

  render() {
    return (
      <p>Loading..</p>
    );
  }
}

export default Loading;
