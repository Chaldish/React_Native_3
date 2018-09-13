import React, { Component } from 'react';
import { TextInput, Alert } from 'react-native';
import firebase from 'firebase';
import Button from '../ortak/Button';
import Card from '../ortak/Card';
import Cardsection from '../ortak/CardSection';
import Spinner from '../ortak/Spinner';

class LoginForm extends Component {
    state ={ email: '', password: '', loading: false };
    clickLogin() {
        this.setState({loading: true});
        const {email, password} = this.state;

if (email === '' || password === '') {
    this.setState({loading: false});
    Alert.alert(
        'Mesaj',
        'Her iki alan dolu olmalı!',
        [
            { text: 'Tamam', onPress: () => null}
        ]
    );
    } else {
        firebase.auth().signInWithEmailAndPassword(email,password)
        .then(this.loginSucces.bind(this))
        .catch(() => {
            firebase.auth().createUserWithEmailAndPassword(email,password)
            .then(this.loginSucces.bind(this))
            .catch(this.loginFail.bind(this));
        });
    }

        
    }

    loginSucces() {
        console.log('s');
        this.setState({loading: false});
    }

    loginFail() {
        console.log('e');
        this.setState({loading: false});
        Alert.alert(
            'Mesaj',
            'Kullanıcı adı veya şifreniz hatalı!',
            [
                { text: 'Tamam', onPress: () => null}
            ]
        );
    }

    renderButton() {
        
        if (!this.state.loading) {
        return (<Button onPress={this.clickLogin.bind(this)}> OK </Button>);
        }
        return (<Spinner size="small" />);
    }

    render() {
        const { inputStyle } = styles;
        return(
            <Card>
                <Cardsection>
                    <TextInput 
                    placeholder="e-mail"
                    style={inputStyle}
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                    />
                </Cardsection>

                <Cardsection>
                    <TextInput 
                    secureTextEntry
                    placeholder="password"
                    style={inputStyle}
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                    />
                </Cardsection>

                <Cardsection>
                    {this.renderButton()}
                </Cardsection>
            </Card>
        );
        
    }
}

const styles = {

    inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 2,
    },
};

export default LoginForm;