import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import GoogleButton from 'react-google-button'
// import '../node_modules/bootstrap/dist/css/bootstrap.css'
// import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
function GoogleAuth() {
    const [ user, setUser ] = useState([]);
    const [ profile, setProfile ] = useState([]);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
        () => {
            if (user) {
                axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setProfile(res.data);
                    })
                    .catch((err) => console.log(err));
            }
        },
        [ user ]
    );

    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
        setProfile(null);
    };

    return (
        <div>
            
            <br />
            <br />
            {profile ? (
                <div>
                     <GoogleButton onClick={() =>login() }/>
                </div>
            ) : (
                <div>
                    <img src={profile.picture} alt="userimage" />
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <p>Phone: {profile.id}</p>
                    <br />
                    <br />
                    <button onClick={logOut}>Log out</button>
                </div>
                // <button onClick={() => login()}>Sign in with Google 🚀 </button>
            )}
        </div>
        
    );
}
export default GoogleAuth;
