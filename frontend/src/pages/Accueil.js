import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Login from './Login'

const Accueil = () => {
    
    const [nom, setNom] = useState("")
    const [prenom, setPrenom] = useState("")
    const [mail, setMail] = useState("")
    const [phone, setPhone] = useState("")
    const [pwd, setPwd] = useState("")
    const [isAdmin, setIsAdmin] = useState("Admin")
    const [img, setImg] = useState(" ")
    const [element, setElement] = useState("")
    const navigate =  useNavigate();
    const sendForm = (e) => {
        e.preventDefault()
        navigate('/login/'+nom+'/'+isAdmin+'/'+prenom+'/'+mail)

    }
    const input_img = (e) => {
        console.log(e.target.files);
        
        var concat = ""
        for (let i = 0; i < e.target.files.length; i++) {
            concat = <Login />;
            setElement(concat)
            
        }



    };
  return (
    <div>
        <form onSubmit={sendForm}>
            <input type="text" value={nom} onChange={ (e) => {setNom(e.target.value)} } /><br/>
            <input type="text" value={prenom} onChange={ (e) => {setPrenom(e.target.value)} } /><br/>
            <input type="email" value={mail} onChange={ (e) => {setMail(e.target.value)} } /><br/>
            <input type="tel" value={phone} onChange={ (e) => {setPhone(e.target.value)} } /><br/>
            <input type="password" value={pwd} onChange={ (e) => {setPwd(e.target.value)} } /><br/>
            <select onChange={ (e) => {setIsAdmin(e.target.value)} }>
                <option value="Admin">Admin</option>
                <option value="Client">Client</option>
            </select>
            <input type="file" multiple onChange={input_img} accept=".pdf"/>
            {element}
            <button>Send</button>
        </form>
    </div>
  )
}

export default Accueil