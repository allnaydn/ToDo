import React from 'react'
import {ListItem, ListItemText, IconButton} from '@mui/material'
import moment from 'moment' //moment indirdik saat ve tarih düzenlemesi için
import 'moment/locale/tr';
import { Delete, MoreVert } from '@mui/icons-material';
import {doc, deleteDoc} from "firebase/firestore"
import {db} from "../firebase"
import {TodoContext} from "../contexts/TodoContext"
import { useContext } from 'react';
import {useRouter} from 'next/router'


export default function Todo({todo}) {

    const {id,baslik,aciklama,tarih}=todo;
    const {showAlert,setTodo}=useContext(TodoContext);
    const router=useRouter();

    const handleDelete=async (id,e)=>{
      e.preventDefault();

      const ref=doc(db,'todos',id);
      await deleteDoc(ref);

      showAlert("warning", id + "id'li todo silindi")

    }

    const handleMore=(id,e)=>{
      router.push(`/todos/${id}`)
    }



  return (
    <ListItem  onClick={()=> setTodo({id,baslik,aciklama,tarih})} sx={{mt:3,boxShadow:3}} style={{backgroundColor:'#FAFAFA'}} secondaryAction={
      <>
      <IconButton onClick={(e)=>handleDelete(id,e)}>
        <Delete/>
      </IconButton>

      <IconButton onClick={(e)=>handleMore(id,e)}>
        <MoreVert/>
      </IconButton>
      </>
    }>
     <ListItemText primary={baslik} secondary={moment(tarih).format('LLL')}/> 
    </ListItem>
  )
}
