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
    const loginEmailPswd = async(email: string, password: string) => {

        return signInWithEmailAndPassword (auth, email, password).then((userCredential) => {
            // Signed in
            const user = userCredential.user
            console.log(user)
            // ...
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            //console.log(errorMessage)
            let gestError = ''
            if (errorMessage === "Firebase: Error (auth/user-not-found)."){
                gestError = "no se encontro el correo"
                //console.log(gestError)
                /* console.log(gestError) */
            }else if (errorMessage === "Firebase: Error (auth/invalid-email)."){
                gestError = "el correo es invalido"
                //console.log(gestError)
                /* console.log(gestError) */
            }else if (errorMessage === "Firebase: Error (auth/wrong-password)."){
                gestError = "la contraseña no es correcta"
                //console.log(gestError)
                /* console.log(gestError) */
            }
            return gestError
        });
            // Signed in
            // ...


    }
    return {
        registEmailPswd,
        loginEmailPswd,
    }
}