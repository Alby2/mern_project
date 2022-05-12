import React from 'react'

const Client = (props) => {
  return (
    <div>
       Nom : {props.nom} <br/>
       Prenom : {props.prenom}<br/>
       Adresse Mail : {props.mail}<br/>
       Statut : {props.statut}<br/>
    </div>
  )
}

export default Client