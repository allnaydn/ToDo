import {React,useEffect,useState, useContext} from 'react'
import {collection, onSnapshot, query, orderBy, where} from "firebase/firestore"
import {db} from "../firebase"
import Todo from './Todo'
import { Typography } from '@mui/material'
import { AuthContext } from '../contexts/AuthContext'

export default function TodoList() {

    const [todos,setTodos]=useState([])
    const {currentUser}=useContext(AuthContext);

    useEffect(()=>{

        const ref=collection(db,'todos');
        const q=query(ref,where("kullaniciEmail",'==',currentUser?.email),orderBy("tarih","desc"))

        const unsub=onSnapshot(q,(snap)=>{
            setTodos(snap.docs.map(doc=>(
                {...doc.data(),id:doc.id,tarih:doc.data().tarih?.toDate().getTime()}
            )))
        })

        return unsub;

    },[])


  return (
    <div>

       {todos.length===0 ? (
              <Typography variant='h5' sx={{mt:5, fontWeight:'bold'}}>Henüz Todo Eklenmedi...</Typography>
       ):(
             <Typography variant='h3'  sx={{mt:5, fontWeight:'bold'}}>Todo Listesi</Typography>
       )}
      
      {todos.map(todo=>
      <Todo key={todo.id} todo={todo} />
      )}
    </div>
  )
}
