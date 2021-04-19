import React, { useContext, useEffect } from 'react';
import './Login.css'
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import jwt_decode from "jwt-decode";
import firebaseConfig from './firebaseConfig'
import glBtn from '../../images/google-btn.png'
import { useHistory, useLocation } from 'react-router';
import { userContext } from '../../App';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const googleLoginHandler = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then(result => {
                const { displayName, email, photoURL } = result.user;
                const loggedInUserData = {
                    isSignedIn: true,
                    photo: photoURL,
                    email: email,
                    name: displayName
                }
                setLoggedInUser(loggedInUserData)
                getToken();
                history.replace(from)
            }).catch(error => {
                console.log(error)
            });
    }
    //Token
    const getToken = () => {
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
            .then(idToken => {
                sessionStorage.setItem('token', idToken);
            }).catch(error => {
                console.log(error)
            });
    }
    useEffect(() => {
        const getSessionToken = sessionStorage.getItem('token');
        if (getSessionToken) {
            const decoded = jwt_decode(getSessionToken);
            const { email, name, picture } = decoded;
            const loggedInUserData = {
                isSignedIn: true,
                photo: picture,
                email: email,
                name: name
            }
            setLoggedInUser(loggedInUserData)
        }

    }, [setLoggedInUser])
    return (
        <div className="container">
            <div className="d-flex flex-column social-login-btn mt-5">
                <button className="social-btn" onClick={googleLoginHandler}><img src={glBtn} alt="" /> Continue with Google</button>
            </div>
        </div>
    );
};

export default Login;