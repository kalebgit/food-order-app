
import {  onAuthStateChanged, signInWithEmailAndPassword } from '@firebase/auth';
import { collection, getDocs, addDoc, getDoc, doc} from '@firebase/firestore';
import { auth } from '../../config/firebase';
import AuthContext from "./AuthContext";
import {useState} from 'react'

//firebase
import {db} from '../../config/firebase'
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 
'firebase/auth'

function AuthContextProvider({children}){

    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    const clientsCollection = collection(db, 'clients')

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
        const data = await getDocs(clientsCollection)
        console.log(data)
        console.log(data.docs);

        const user = data.docs.find((element)=>{
            const userDocRef = doc(db, "clients", element.id)
            getDoc(userDocRef)
                .then((doc)=>{
                    console.log("el documento es: ")
                    console.log(doc)
                    console.log("atributos: ")
                    console.log({...doc.data()})
                    return doc.id == uid
                })
                .catch((error)=>{
                    console.log(error)
                })

            
            
        })

        

        return user;
    }

    //sign in with google
    // const signInGoogle = async()=>{
    //     const user = await signInWithPopup(auth, googleProvider);
    //     addAdditionalInfoUser(user);
    // }

    const addAdditionalInfoUser = async(user, {name, phoneNumber})=>{
        console.log(user);
        console.log(user.uid);
        await addDoc(clientsCollection, {id: user.uid, name: name, 
            phoneNumber: phoneNumber, isAdmin: false})
    }




    return (
        <AuthContext.Provider value={{
            isLoggedIn: isLoggedIn,
            isAdmin: isAdmin, 
            logout: async()=>{
                await signOut(myFirebase.auth);
            }, 
            //to sign with email
            registerEmail: async({name, phoneNumber, email, password})=>{
                console.log("entramos a la funcion")
                const userCredential = await createUserWithEmailAndPassword(auth, 
                    email.value, 
                    password.value)
                
                addAdditionalInfoUser(userCredential.user, {name: name.value, 
                    phoneNumber: phoneNumber.value});

                console.log("user created")
            }, 
            signInEmail: async({email, password})=>{
                signInWithEmailAndPassword(auth, email.value, password.value)
                    .then((userCredential)=>{
                        console.log(userCredential);
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
            }}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;