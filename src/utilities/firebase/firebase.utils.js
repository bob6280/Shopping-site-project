import {initializeApp} from 'firebase/app';
//initializeApp is a JS library that we can use to interact with instance of
//firebase
import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth'

import {getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs} from 'firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAyX1gMhVTCLkipvuA940G80Vyf9PoNFLU",
    authDomain: "shopping-site-project.firebaseapp.com",
    projectId: "shopping-site-project",
    storageBucket: "shopping-site-project.appspot.com",
    messagingSenderId: "628311955850",
    appId: "1:628311955850:web:462adadf3658665ec99073"
  };
  
// Initialize Firebase,
/*This line initializes the Firebase app using the provided configuration (firebaseConfig). 
It returns a Firebase app instance (firebaseApp), which is used to access Firebase services. 
*/
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
prompt:"select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup =()=> signInWithPopup(auth, provider);

export const db = getFirestore();

//use the function to add the json objects into our firebase db
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) =>{
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);
    
    objectsToAdd.forEach((object)=>{
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
}

export const getCategoriesAndDocuments = async() =>{
    const collectionRef = collection(db, 'categories');

    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot)=>{
        const {title, items} = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    },{});

    return categoryMap;
}

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {})=>{
const userDocRef = doc(db, 'users',  userAuth.uid);

const userSnapshot = await getDoc(userDocRef);

//if the userSnapShot does not exist
if(!userSnapshot.exists()){
    const {displayName, email} = userAuth;
    const createdAt = new Date();
    
    //set the database with this new user information
    try{
        await setDoc(userDocRef,{
            displayName,
            email,
            createdAt,
            ...additionalInformation,
        });
    }catch(error){
        console.log('error creating the user', error.message);
    }
}
return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) =>{
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password)=>{
    if(!email||!password) return;

    return await signInWithEmailAndPassword(auth,email, password);
}
//the auth keeps track of what user is is signed in
export const signOutUser = async()=> await signOut(auth);

//whenever the user signs in or out, this call back will get triggered
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);
