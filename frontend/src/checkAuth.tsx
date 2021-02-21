import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { client, AUTH_USER } from "./App";
import { setAuth } from "./reducers/authReducer";

export default (ChildComponent) => {
  class ComposedComponent extends Component {
    componentDidMount() {
      this.shouldNavigateAway();
    }

    componentDidUpdate(prevProps, prevState) {
      this.shouldNavigateAway();
    }

    shouldNavigateAway() {
      client
        .query({ query: AUTH_USER })
        .then(({ data }) => {
          if (data.me) {
            this.props.setAuth(data.me);
          } else {
            this.props.location("/login");
          }
        })
        .catch((error) => {
          if (error.message === "Please Login") {
            this.props.history.push("/");
          }
        });
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return {
      auth: state.auth.authenticated,
    };
  }
  function mapDispatchToProps(dispatch) {
    return {
      setAuth: (data) => dispatch(setAuth(data)),
    };
  }
  return withRouter(
    connect(mapStateToProps, mapDispatchToProps)(ComposedComponent)
  );
};
