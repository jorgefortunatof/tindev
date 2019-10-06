import React, {useState} from 'react'
import logo from '../assets/logo.svg'
import './login.css'

import api from '../services/api'

function Login({history}){
    //SALVA O ESTADO 
    const [username, setUsername] = useState('')

    //FUNÇAO QUE FAZ O SUBMIT
    async function handleSubmit(e){
        e.preventDefault()    //IMPEDE QUE REDIRECIONE ALTOMATICAMENTE

        // eslint-disable-next-line
        const response = await api.post('\devs', {username})
        
        const {_id} = response.data;

        history.push(`/dev/${_id}`)
    }

    return(
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <img src={logo} alt="logo-tinder"/>
                <input 
                    placeholder="Digite o usuário do GitHub"
                    value={username} 
                    onChange={ e => setUsername(e.target.value)} //ATUALIZA VALOR DO USERNAME
                />
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}

export default Login;