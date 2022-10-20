import React from 'react'
import { Grid, Button } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google'
import { Auth } from 'firebase/auth';
import  provider  from 'react';
import { signInWithPopup } from 'firebase/auth';



export default function Login() {

  const loginGoogle=()=>{
    signInWithPopup(auth,provider);
  }

  return (
    <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" style={{minHeight:'100vh'}} >
          <Button variant='contained' startIcon={<GoogleIcon/>} onClick={loginGoogle}>GOOGLE İLE GİRİŞ YAPIN</Button>
    </Grid>
  )
}