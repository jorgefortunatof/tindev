import React from 'react';


//FAZ O REACT NATIVE IGNORAR OS "ERROS" DO WEBSOCKET
import {YellowBox} from 'react-native'
YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
])


//COMPONENTES
import Routes from './routes'

function App (){
  return (
    <Routes />
  );
}; 


export default App;