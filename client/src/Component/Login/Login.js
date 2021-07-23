import React, { useContext, useEffect } from 'react';
import firebase from "firebase/app";
import firebaseConfig from '../../firebase.cofig';
import "firebase/auth";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
  } from "react-router-dom";
import { context } from '../../App';
import Dates from '../Date/Date';


firebase.initializeApp(firebaseConfig);

const Login = () => {
    const [user,setUser] = useContext(context);
    function handleGoogle(){
        var googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
        .signInWithPopup(googleProvider)
        .then((result) => {
            setJwtToken();
            setUser(result.user);
        }).catch((error) => {
            var errorMessage = error.message;
        });
    }
    const setJwtToken = () => {
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
            // Send token to your backend via HTTPS
            // ...
            sessionStorage.setItem('token',idToken);
            }).catch(function(error) {
            // Handle error
            });
    }

    return (
        <div>
            {
                user == '' && <button onClick={handleGoogle} >SingInWithGoogle</button> 
            }
        </div>
    );
};

export default Login;