import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import io from 'socket.io-client'

import './main.css'

import logo from '../assets/logo.svg'
import like from '../assets/like.svg'
import dislike from '../assets/dislike.svg'
import itsamatch from '../assets/itsamatch.png'

import api from '../services/api'

//match.params.id ID DO USUÁRIO LOGADO (PEGA PELA URL)
//MATCH PEGA PARAMETROS DA URL
function Main({match}){
    const [users, setUsers] = useState([])
    const [matchDev, setMatchDev] = useState(null)

    //PEGA OS USUÁRIOS DO BACKEND HTTP
    useEffect(() => {

        async function loadUsers(){
            const response = await api.get('/devs', {
                headers:{
                    user: match.params.id,
                }
            })

            setUsers(response.data.users)
        }

        loadUsers()

    }, [match.params.id])


    //SOCKET IO (ID DO USER PARA O SERVER)
    useEffect(() => {
        const socket = io('http://localhost:4444', {
            query: { user: match.params.id} //MANDA O ID DO USUER PARA O SERVER
        })


        //AO RECEBER O MATACH
        socket.on('match', dev => {
            setMatchDev(dev)
        })

    }, [match.params.id])


    //NO MÉTODO POST DO AXIOS O HEADER VAI COMO TERCEIRO PARAMETRO E O BODY COMO SEGUNDO
    async function handleLike(id){
        await api.post(`/devs/${id}/likes`, null, {
            headers:{
                user: match.params.id,
            }
        })

        //REMOVE O USER DA LISTA QUE JA FORAM DADO LIKE
        //COMO USA O STATE DO REACT APOS ALTERAR O VALOR O COMPONENT É RECARREGADO
        setUsers(users.filter(user => user._id !== id))
    }
    
    async function handleDislike(id){
        await api.post(`/devs/${id}/deslikes`, null, {
            headers:{
                user: match.params.id,
            }
        })

        setUsers(users.filter(user => user._id !== id))
    }

    return(
        <div className="main-container">

        <Link to="/">
            <img src={logo} alt="tinder-app" />
        </Link>
        
            {users.length > 0 ? (
                <ul>
                {users.map( user => (
                <li key={user._id}>
                    <img src={user.avatar} alt="" />
                    <footer>
                        <strong>{user.name}</strong>
                        <p>{user.bio}</p>
                    </footer>
                    <div className="buttons">
                        <button onClick={() => {handleLike(user._id)}} type="button">
                            <img src={like} alt="like"/>
                        </button>
                        <button onClick={() => {handleDislike(user._id)}} type="button">
                            <img src={dislike} alt="dislike"/>
                        </button>
                    </div>

                </li>
                
            ))}
            </ul>
            ) : (
                <div className='empty'>
                Acabou :(
                </div>
            )}
            
        
            {matchDev && (
                <div className="match-container">
                    <img src={itsamatch} alt="match"/>

                    <img className="avatar" src={matchDev.avatar} alt="avatar" />
                    <strong>{matchDev.name}</strong>
                    <p>
                        {matchDev.bio}
                    </p>

                    <button type="button" onClick={() => setMatchDev(false)}>FECHAR</button>
                </div>
            )}
        </div>
    );
}

export default Main