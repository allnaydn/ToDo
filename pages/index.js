import Head from 'next/head'
import { Container, Snackbar, Alert, Typography, Box, Avatar, Button } from '@mui/material'
import TodoList from '../components/TodoList'
import TodoForm from '../components/TodoForm'
import { TodoContext } from '../contexts/TodoContext'
import Loading from '../components/Loading'
import Login from '../components/Login'
import { useState, useContext } from 'react'
import {AuthContext} from '../contexts/AuthContext'
import { Auth } from 'firebase/auth'


export default function Home() {

  const {currentUser}=useContext(AuthContext);

  console.log(currentUser);

  const [open,setOpen]=useState(false);
  const [alertType,setAlertType]=useState("success");
  const [alertMessage,setAlertMessage]=useState("");

  const showAlert=(type,msg)=>{
    setAlertMessage(msg);
    setAlertType(type);
    setOpen(true);
  }


  const [todo,setTodo]=useState({
    baslik:'',
    aciklama:''
})


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  
    setOpen(false);
  };


  return (
    <TodoContext.Provider value={{showAlert, todo, setTodo}}>
      <Container maxWidth='md'>
      <Head>
        <title>Todo App</title>
        <meta name="description" content="nextjs ile todo app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <Box sx={{display:'flex', justifyContent:'space-between' , mt:3}} >
  <Avatar src={currentUser.photoURL}/>
  <Typography variant="h5">
	  {currentUser.displayName}
  </Typography>
  <Button variant="contained" color="primary" onClick={()=>auth.signOut()}>Çıkış</Button>
</Box>



      <TodoForm/>
      <Snackbar anchorOrigin={{vertical:'top', horizontal:'center'}} open={open} autoHideDuration={4000} onClose={handleClose}>
         <Alert onClose={handleClose} severity={alertType} sx={{width:'100%'}}>
          {alertMessage}
         </Alert>
      </Snackbar>
      <TodoList/>
    
    </Container>
    </TodoContext.Provider>
  )
}
