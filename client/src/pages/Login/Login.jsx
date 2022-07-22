import React from "react";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";

import { login_action } from "../../store";

// Déplacer fetch vers le store
// Utiliser le state pour recupérer les valeur du formulaire

function Login(props) {

  let navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  
  function handleSubmit(e) {
    e.preventDefault()
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let  raw = JSON.stringify({
      "email": email,
      "password": password
    });

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://127.0.0.1:3001/api/v1/user/login", requestOptions)
      .then(response => response.json())
      .then(result => {
        window.localStorage.setItem("token", result.body.token)
        dispatch(login_action(result.body.token));

      })
      .then( () => navigate('/profile'))
      .catch(error => console.log('error', error));
  }

    return (
      <>
        <Nav></Nav>
        <main className="main bg-dark">
          <section className="sign-in-content">
            <i className="fa fa-user-circle sign-in-icon"></i>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
              <div className="input-wrapper">
                <label forhtml="username">Username</label>
                <input type="text" id="username" onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="input-wrapper">
                <label forhtml="password">Password</label>
                <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} required/>
              </div>
              <div className="input-remember">
                <input type="checkbox" id="remember-me" />
                <label forhtml="remember-me">Remember me</label>
              </div>
              <button type="submit" className="sign-in-button">Sign In</button>
            </form>
          </section>
        </main>
        <Footer></Footer>
      </>
    );  
}

export default Login; 