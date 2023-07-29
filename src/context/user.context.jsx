import { createContext, useState, useEffect} from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth} from "../utilities/firebase/firebase.utils";

//as the actual value you want to access
export const UserContext = createContext({
    currentUser:null,
    setCurrentUser: ()=>null,
});

export const UserProvider = ({children}) =>{
    const [currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser};

    //this line makes sure that this function only run once after the component mounts
    useEffect(()=>{
        const unsubscibe = onAuthStateChangedListener((user)=>{
            if(user){
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        })

        return unsubscibe;
    }, [])
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}