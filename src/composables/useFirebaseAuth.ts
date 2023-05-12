import { auth } from '../services/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth";


export const useFirebaseAuth = () => {
    const registEmailPswd = (email: string, password: string) => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user
            console.log(user)
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
    }
    const loginEmailPswd = (email: string, password: string) => {
        signInWithEmailAndPassword (auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user
            console.log(user)
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
            if (errorMessage === "Firebase: Error (auth/user-not-found)."){
                const gestError = "no se encontro el usuario"
                console.log(gestError)
            }else if (errorMessage === "Firebase: Error (auth/invalid-email)."){
                const gestError = "el correo es invalido"
                console.log(gestError)

            }
            // ..
        });
    }
    return {
        registEmailPswd,
        loginEmailPswd
    }
}