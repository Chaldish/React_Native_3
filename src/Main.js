import React, {Component} from 'react';
import {View} from 'react-native';
import {Provider} from 'react-redux';
import firebase from 'firebase';
import {createStore} from 'redux';
import reducers from './reducers';
import LoginForm from './components/LoginForm';

class Main extends Component{

    componentWillMount() {
        firebase.initializeApp({
            apiKey:             '********',
            authDomain:         '********',
            databaseURL:        '********',
            projectId:          '********',
            storageBucket:      '********',
            messagingSenderId:  '********'});
            //you have to put your firebase information instead of ******** 
            
    }

    render () {
        return(
            <Provider store={createStore(reducers)}>
            <View>
                <LoginForm />
            </View>
            </Provider>
        );
    }
}

export default Main;