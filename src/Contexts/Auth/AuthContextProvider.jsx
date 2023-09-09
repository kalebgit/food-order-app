import { db } from '../../config/firebase';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { collection, getDocs } from '@firebase/firestore';
import * as myFirebase from '../../config/firebase';
import AuthContext from "./AuthContext";
import {useState} from 'react'

function AuthContextProvider({children}){

    const [isAdmin, setIsAdmin] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(true);


    const auth = getAuth();
    onAuthStateChanged(auth, (user)=>{
        if(user){
            setIsLoggedIn(true);
            if(getUser(user.uid).isAdmin){
                setIsAdmin(true);
            }
            
        }else{
            setIsLoggedIn(false);
        }
    })

    const getUser = async(uid)=>{
        const data = await getDocs(usersCollection)

        console.log(data.docs);

        const user = data.docs.find((doc)=>{
            return doc.id == uid
        })

        console.log(user);

        return user;
    }

    //sign in with google
    // const signInGoogle = async()=>{
    //     const user = await signInWithPopup(auth, googleProvider);
    //     addAdditionalInfoUser(user);
    // }

    const addAdditionalInfoUser = async(user)=>{
        await addDoc(usersCollection, {id: user.uid, name: formState.name.value, phoneNumber: 
            formState.phoneNumber.value, isAdmin: false})
    }


    const usersCollection = collection(db, 'users')


    return (
        <AuthContext.Provider value={{
            isLoggedIn: isLoggedIn,
            isAdmin: isAdmin, 
            logout: async()=>{
                await signOut(myFirebase.auth);
            }, 
            //to sign with email
            singInEmail: async()=>{
                try{
                    const user = await createUserWithEmailAndPassword(auth, formState.email.value, 
                        formState.password.value)
                    
                    addAdditionalInfoUser(user);
                    setErrorMessage('')
                }catch(err){
                    switch(err.code){
                        case 'auth/email-already-in-use': 
                            setErrorMessage('el correo ya esta registrado')
                    }
                }
            }}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;