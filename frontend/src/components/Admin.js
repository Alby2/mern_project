import React from 'react'

const Admin = (props) => {
  return (
    <>
        Nom : {props.nom} <br/>
        Prenom : {props.prenom}<br/>
        Adresse Mail : {props.mail}<br/>
        Statut : {props.statut}<br/>
    </>
  )
}

export default Admin