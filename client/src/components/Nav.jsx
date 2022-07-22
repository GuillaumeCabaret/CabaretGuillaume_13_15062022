import { Link } from 'react-router-dom';
import React from 'react';

import bankLogo from '../img/argentBankLogo.png';

import { store, logout_action } from "../store"
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";


export default function Nav() {

  const navigate = useNavigate();

  let isConnected = useSelector( (state) => state.isConnected) 
  let username = useSelector((state) => state.firstName)

  function logout() {
    window.localStorage.removeItem("token");
    store.dispatch(logout_action());
    navigate("/");
  }

  if (isConnected) {
    return (
        <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={bankLogo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        <Link className="main-nav-item" to="/profile">
          <i className="fa fa-user-circle"></i>
          {username}
          </Link>
          <i className="fas fa-sign-out-alt"></i>
          <button onClick={logout} className="main-nav-item logout-button">Sign out</button>
        </div>
    </nav>
    )
  }
  else {

    return (
        <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={bankLogo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        <Link className="main-nav-item" to="/login">
          <i className="fa fa-user-circle"></i>
          Sign In
        </Link>
        </div>
    </nav>
    )
  }
  }