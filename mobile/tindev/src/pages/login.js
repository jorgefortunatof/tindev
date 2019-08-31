import React, {useState, useEffect} from 'react'
import {View, Platform,KeyboardAvoidingView, StyleSheet, TextInput, Text, Image, TouchableOpacity} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';

import logo from '../assets/logo.png';
import api from '../services/api';


function Login ({navigation}){ 
    const [user, setUser] = useState('')

    useEffect( () => {
        //CONFERE SE USUÁRIO JÁ ESTA LOGADO
        AsyncStorage.getItem('user').then( user => {
            if (user) {
                navigation.navigate('Main', {user})
            }
        })
    }, [])

    async function handleLogin () {

        const response = await api.post('/devs', {"username": user})

        //ID DO USUARIO QUE LOGOU 
        const {_id} = response.data
        

        //SALVAR QUE ESTA LOGADO
        await AsyncStorage.setItem('user', _id)

        //PASSANDO PARAMETRO PARA O MAIN
        navigation.navigate('Main', {'user': _id})
    }

    return(
        <KeyboardAvoidingView 
        behavior='padding'
        enabled={Platform.OS === 'ios'}
        style={styles.container}
        >
            <Image source={logo} />

            <TextInput 
                autoCorrect={false}
                autoCapitalize='none'
                placeholder="Digite Seu Usuario do GitHub"
                placeholderTextColor="#999"
                style={styles.input}
                value={user}
                onChangeText={setUser}
            />

            <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
    },
    input: {
        height: 50,
        alignSelf: 'stretch',
        textAlign: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        marginTop: 20,
    },
    button: {
        backgroundColor: '#DF4723',
        alignSelf: 'stretch',
        textAlign: 'center',
        marginTop: 20,
        height: 50,
        justifyContent: 'center',
        borderRadius: 4,
    },
    buttonText: {
      textAlign: 'center',
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 18,
    }
})

export default Login