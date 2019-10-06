import React,{useState, useEffect} from 'react'
import {View, SafeAreaView, Text, Image, StyleSheet, TouchableOpacity} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import io from 'socket.io-client'

import api from '../services/api';

import logo from '../assets/logo.png';
import like from '../assets/like.png';
import dislike from '../assets/dislike.png';
import match from '../assets/itsamatch.png'

function Main ({navigation}){
    const id = navigation.getParam('user')
    const [users, setUsers] = useState([])
    const [matchDev, setMatchDev] = useState(null)

    //PEGA OS USUÁRIOS DO BACKEND
    useEffect(() => {

        async function loadUsers(){
            const response = await api.get('/devs', {
                headers:{
                    user: id,
                }
            })

            setUsers(response.data.users)
        }

        loadUsers()

    }, [id])


    //SOCKET IO (ID DO USER PARA O SERVER)
    useEffect(() => {
        const socket = io('http://192.168.0.110:4444', {
            query: { user: id} //MANDA O ID DO USUER PARA O SERVER
        })

        //AO RECEBER O MATACH
        socket.on('match', dev => {
            setMatchDev(dev)
        })

    }, [id])


    async function handleLogout(){
        await AsyncStorage.clear()

        navigation.navigate('Login')
    }

    //NO MÉTODO POST DO AXIOS O HEADER VAI COMO TERCEIRO PARAMETRO E O BODY COMO SEGUNDO
    async function handleLike(){
        const [user, ...rest] = users

        await api.post(`/devs/${user._id}/likes`, null, {
            headers:{
                user: id,
            }
        })

        //REMOVE O USER DA LISTA QUE JA FORAM DADO LIKE
        setUsers(rest)
    }
    
    async function handleDislike(){
        // O USER PEGA O PRIMEIRO DA LISTA E O ...rest PEGA O RESTO
        const [user, ...rest] = users

        await api.post(`/devs/${user._id}/deslikes`, null, {
            headers:{
                user: id,
            }
        })

        setUsers(rest)
    }

    return(

        <SafeAreaView style={styles.container}>
            
            <TouchableOpacity onPress={handleLogout}>
                <Image style={styles.logo} source={logo} />
            </TouchableOpacity>

            <View style={styles.cardsContainer}>


            {
                users.length === 0 
                ? 
                <Text style={styles.empty}>Acabou :(</Text>
                :
                users.map((user, index) => 
                <View key={user._id} style={[styles.card, {zIndex: users.length - index}]}>
                    <Image style={styles.avatar} source={ {uri: user.avatar} }/>
                    
                    <View style={styles.footer}>
                        <Text style={styles.name}>{user.name}</Text>
                        <Text numberOfLines={3} style={styles.bio}>{user.bio}</Text>
                    </View>
                </View>
                )
            }


            </View>

            {
            users.length > 0 && (
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button} onPress={handleDislike}>
                    <Image source={dislike} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleLike}>
                    <Image source={like} />
                </TouchableOpacity>
            </View>
            )
            }

            {matchDev &&
                <View style={[styles.matchContainer, {zIndex: users.length+1}]}>
                    <Image source={match} />

                    <Image style={styles.matchAvatar} source={{ uri: matchDev.avatar}} />
                    <Text style={styles.matchName}>{matchDev.name}</Text>
                    <Text style={styles.matchBio}>{matchDev.bio}</Text>

                    <TouchableOpacity onPress={() => setMatchDev(null)}>
                        <Text style={styles.matchButton}>FECHAR</Text>
                    </TouchableOpacity>
                </View>
            }

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },

    cardsContainer: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        maxHeight: 500,
    },

    card: {
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        margin: 30,
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#fff',
    },

    avatar: {
        flex: 1,
        height: 300,
    },

    footer: {
        paddingHorizontal: 20,
        paddingVertical: 15,
    },

    name: {
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    bio: {
        color: '#999',
        lineHeight: 20,
    },

    logo: {
        marginTop: 50,
    },

    buttonsContainer: {
        flexDirection: 'row',
        marginBottom: 50,
    },

    button: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderColor: '#DDD',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 15,
        backgroundColor: '#fff',


        //IOS
        shadowRadius: 2,
        shadowColor: '#000',
        shadowOpacity: 0.01,
        shadowOffset: {
            width: 0,
            height: 2,
        }
    },

    empty: {
        flex: 1,
        alignSelf: 'center',
        fontSize: 50,
        fontWeight: 'bold',
        color: '#DDD',
    },


    matchContainer: {
        ...StyleSheet.absoluteFillObject,  //OBJETO PARA PREENCHER TELA
        backgroundColor: 'rgba(0 , 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',

    },
    matchAvatar: {
        width: 160,
        height: 160,
        borderRadius: 80,
        borderWidth: 5,
        borderColor: '#fff',
        marginVertical: 30,
    },
    matchName: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#fff',
    },
    matchBio: {
        marginTop: 10,
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.5)',
        textAlign: 'center',
        paddingHorizontal: 30,
    },
    matchButton: {
        textAlign: 'center',
        padding: 15,
        marginTop: 30,
        color: '#fff',
        fontWeight: 'bold',
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 12,
    }
})


export default Main;