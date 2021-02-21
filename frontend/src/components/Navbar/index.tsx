import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";

import { Navigation, Logo, NavLinks } from "./styles";
import { clearAuth } from "../../reducers/authReducer";
import { RootState } from "../../store";

const SIGNOUT = gql`
  mutation SIGNOUT {
    signout {
      message
    }
  }
`;
const Navbar = () => {
  const auth = useSelector<RootState>((state) => state.auth.authenticated);
  const history = useHistory();
  const [signout] = useMutation(SIGNOUT);
  const dispatch = useDispatch();

  const renderLinks = () => {
    if (auth) {
      return (
        <Fragment>
          <li>
            <Link to="/items">Items</Link>
          </li>
          <li>
            <Link to="#"
              onClick={async (e) => {
                try {
                  dispatch(clearAuth());
                  await signout();
                  history.push("/login");
                } catch (error) {}
              }}
            >
              Log out
            </Link>
          </li>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <li>
            <Link to="/login">Log in</Link>
          </li>
          <li>
            <Link to="/register">Sign up</Link>
          </li>
        </Fragment>
      );
    }
  };
  return (
    <Navigation>
      <Logo>
        <Link to="#">App</Link>
      </Logo>
      <NavLinks>{renderLinks()}</NavLinks>
    </Navigation>
  );
};

export default Navbar;
