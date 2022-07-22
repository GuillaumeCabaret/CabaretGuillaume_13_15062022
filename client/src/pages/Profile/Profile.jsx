import React from "react";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";

import { add_user_info, store } from "../../store";
import { useState, useRef } from "react";
import { useEffect } from "react";
import { useSelector } from 'react-redux'

function Profile(props) {

  const [state, setEditName] = useState({ edit: false })

  const firstNameRef = useRef()
  const lastNameRef = useRef() 

  const username = useSelector((state) => state.firstName +" "+ state.lastName)
  const userFirstName = useSelector((state) => state.firstName)
  const userLastName = useSelector((state) => state.lastName)
  const token = useSelector((state) => state.token) 


  useEffect(() => {
    fetchUserData();
  }, []
  );

  function fetchUserData() {
    let  myHeaders = new Headers();
    let myToken = token
    myHeaders.append("Authorization", "Bearer " + myToken);
    let  requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("http://127.0.0.1:3001/api/v1/user/profile", requestOptions)
      .then(response => response.json())
      .then(result => {
        store.dispatch(add_user_info(result.body.firstName, result.body.lastName))
      })
      .catch(error => console.log('error', error));
  }

  function editName() {
   setEditName({edit: !state.edit})
  }
  function editNamePost() {

    let  myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer" + token);
    myHeaders.append("Content-Type", "application/json");

    let  raw = JSON.stringify({
      "firstName": firstNameRef.current.value,
      "lastName": lastNameRef.current.value
    });

    let  requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://127.0.0.1:3001/api/v1/user/profile", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        if (result.status === 200) {
          fetchUserData()
        }
        editName()
      })
      .catch(error => console.log('error', error));
  }

  return (
      <>
        <Nav></Nav>
        <main className="main bg-dark">
          <div className="header">
            <h1>Welcome back<br />{username}</h1>
            {state.edit ?
              <div className="edit-wrapper">
              <input type="text" id="firstName" defaultValue={userFirstName} ref = {firstNameRef} ></input>
              <input type="text" id="lastName" defaultValue={userLastName} ref = {lastNameRef}></input>
              <button className="edit-name-button edit-left" onClick={editNamePost}>Save</button>
              <button className="edit-name-button" onClick={editName}>Cancel</button>
              </div>
              :
              <button className="edit-button" onClick={editName}>Edit Name</button>
            }
          </div>
          <h2 className="sr-only">Accounts</h2>
          <section className="account">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Checking (x8349)</h3>
              <p className="account-amount">$2,082.79</p>
              <p className="account-amount-description">Available Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <button className="transaction-button">View transactions</button>
            </div>
          </section>
          <section className="account">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Savings (x6712)</h3>
              <p className="account-amount">$10,928.42</p>
              <p className="account-amount-description">Available Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <button className="transaction-button">View transactions</button>
            </div>
          </section>
          <section className="account">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
              <p className="account-amount">$184.30</p>
              <p className="account-amount-description">Current Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <button className="transaction-button">View transactions</button>
            </div>
          </section>
        </main>
        <Footer></Footer>
      </>
  )
}

export default Profile; 