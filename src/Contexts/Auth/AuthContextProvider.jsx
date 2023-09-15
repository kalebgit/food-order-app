
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

    onAuthStateChanged(auth, (user)=>{
        if(user){
            // console.log("tiene cuenta iniciada")
            setIsLoggedIn(true)
            getUser(user.uid)
                .then((currentUserDoc)=>{
                    // console.log("el usuario actual es: ");
                    // console.log(currentUserDoc)
                    
                    if(currentUserDoc.isAdmin){
                        // console.log("el usuario acutal es admin")
                        setIsAdmin(true);
                    }
                })
                .catch((err)=>{
                    console.log(err)
                })
            
            
            
        }else{
            console.log("no tiene cuenta iniciada")
            setIsLoggedIn(false);
            setIsAdmin(false);
        }
    })

    const getUser = async(uid)=>{
        const data = await getDocs(collection(db, 'clients'))
        // console.log(data)
        // console.log(data.docs);

        const user = data.docs.find((element)=>{
            const data = {...element.data()}
            // console.log("comparando: " + uid + " y " + data.id)
            return data.id = uid
            
        })
        

        const userObject = {...user.data(), docId: user.id};

        // console.log("objeto recuperado: ")
        // console.log( userObject)

        return userObject;
    }

    //sign in with google
    // const signInGoogle = async()=>{
    //     const user = await signInWithPopup(auth, googleProvider);
    //     addAdditionalInfoUser(user);
    // }

    const addAdditionalInfoUser = async(user, {name, phoneNumber})=>{
        console.log(user);
        console.log(user.uid);
        const doc = await addDoc(collection(db, 'clients'), {id: user.uid, name: name, 
            phoneNumber: phoneNumber, isAdmin: false})

        return doc
    }




    return (
        <AuthContext.Provider value={{
            isLoggedIn: isLoggedIn,
            isAdmin: isAdmin, 
            logout: async()=>{
                localStorage.removeItem("user");
                console.log("cerrando sesion")
                await signOut(auth);
                console.log("sesion cerrada")
            }, 
            //to sign with email
            registerEmail: async({name, phoneNumber, email, password})=>{
                console.log("entramos a la funcion")
                
                const userCredential = await createUserWithEmailAndPassword(auth, 
                    email.value, 
                    password.value)
                
                const additionalInfo = {name: name.value, 
                    phoneNumber: phoneNumber.value}

                const docId = await addAdditionalInfoUser(userCredential.user, additionalInfo);

                localStorage.setItem("user", JSON.stringify({
                    email: email.value,
                    docId: docId
                }))
                console.log("user created")
            }, 
            signInEmail: async({email, password})=>{
                signInWithEmailAndPassword(auth, email.value, password.value)
                    .then((userCredential)=>{
                        getUser(auth.currentUser.uid)
                            .then((user)=>{
                                localStorage.setItem("user", JSON.stringify({
                                    email: email.value,
                                    docId: user.docId
                                }))        
                            })
                        
                        console.log(userCredential);
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
            },
            getUser: getUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;