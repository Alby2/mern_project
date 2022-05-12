import React from 'react'
import { useParams } from 'react-router-dom'
import Admin from '../components/Admin'
import Client from '../components/Client'


const Login = () => {
    let params = useParams()

     const print = (params.isAdmin === "Client") ? <Client nom={params.nom} prenom={params.prenom} mail={params.mail} statut={params.isAdmin}/> : <Admin  nom={params.nom} prenom={params.prenom} mail={params.mail} statut={params.isAdmin} />    
  return (
    <>
       {print}
    </>

    
  )
}

export default Login