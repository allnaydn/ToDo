import { createContext, useEffect, useState} from "react";
import {auth} from '../firebase/index'
import Loading from '../components/Loading';
import Login from "../components/Login";

export const AuthContext = createContext();


export default function AuthContextProvider({children}){

    const [currentUser,setCurrentUser]=useState(null);
    const [loading,setLoading]=useState(true);
    

    useEffect(()=>{
        return auth.onIdTokenChanged(async (user)=>{
            if(!user){
                console.log('kullanıcı bulunamadı');
                setCurrentUser(null);
                setLoading(false)
                return;
            }

            const token=await user.getIdToken();

            console.log('token: '+token);
            console.log('user: '+user);


            setCurrentUser(user);
            setLoading(false)
        })
    },[])


    if(loading){
        return <Loading type="cubes" color="gray" />
    }

    if(!currentUser){
        return <Login/>
    }else{
        return(
            <AuthContext.Provider value={{currentUser}}>
                {children}
            </AuthContext.Provider>
        )
    }
}