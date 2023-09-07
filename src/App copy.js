import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import axios from "axios";
import "./App.css";
import { useState } from 'react';

function App() {
  const provider = new GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

  const auth = getAuth();

  const [authorizedUser, setAuthorizedUser] = useState(false || sessionStorage.getItem("accessToken"));

  function signInwithGoogle() {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        if (user) {
          user.getIdToken().then((tkn) => {
            sessionStorage.setItem("accessToken", tkn);
            setAuthorizedUser(true);

            axios.post('/api/user', {
              uid: user.uid,
              email: user.email,
            }, {
              headers: {
                Authorization: `Bearer ${tkn}`,
              },
            }).then((response) => {
              console.log("User registered on the backend:", response.data);
            }).catch((error) => {
              console.error("Error registering user:", error);
            });

          })
        }
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);

        console.error(errorCode, errorMessage, email, credential);
      });
  }
  function logoutUser() {
    signOut(auth).then(() => {
      // clear session storage
      sessionStorage.clear();
      setAuthorizedUser(false);
      // window.location.replace("/");
      console.info('Logged Out Successfully');
    }).catch((error) => {
      // An error happened.
      alert(error);
    });
  }
  return (
    <div className="App">
      {authorizedUser ? (
        <>
          <fieldset>
            <legend>Authorized User</legend>
            Token: <span>{sessionStorage.getItem("accessToken")}</span>
          </fieldset>
          <button onClick={logoutUser}>Logout Button</button>
        </>
      ) : (
        <>
          <button onClick={signInwithGoogle}>SignWithGoogle</button>
        </>
      )}
    </div>
  );
}

export default App;
