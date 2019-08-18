import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'

import './main.css'

import logo from '../assets/logo.svg'
import like from '../assets/like.svg'
import dislike from '../assets/dislike.svg'

import api from '../services/api'

//match.params.id ID DO USUÁRIO LOGADO (PEGA PELA URL)
function Main({match}){
    const [users, setUsers] = useState([])

    //PEGA OS USUÁRIOS DO BACKEND
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
            
        

        </div>
    );
}

export default Main