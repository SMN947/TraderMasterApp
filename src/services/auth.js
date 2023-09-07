import { auth } from "../config/Firebase";
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";

class AuthService {
    constructor() {
        this.isAuthenticated = false;
        this.username = null;
        this.provider = new GoogleAuthProvider();
    }

    async signin() {
        return signInWithPopup(auth, this.provider)
            .then((result) => {
                const user = result.user;
                if (user) {
                    user.getIdToken().then((tkn) => {
                        sessionStorage.setItem("accessToken", tkn);

                        this.isAuthenticated = true;
                        this.username = user.email;
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

    async signout() {
        await new Promise((r) => setTimeout(r, 500)); // Simulate delay
        this.isAuthenticated = false;
        this.username = "";
    }
}

export const authService = new AuthService();
