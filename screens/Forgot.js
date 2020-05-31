import React, {Component} from 'react';
import {
  Alert,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';

import {Button, Block, Input, Text} from '../components';
import {theme} from '../constants';
import LinearGradient from 'react-native-linear-gradient';
import url from '../config/config';

const VALID_EMAIL = 'amit@indorz.co';

export default class Forgot extends Component {
  state = {
    email: VALID_EMAIL,
    isSend: false,
    loading: false,
  };

  handleForgot() {
    const {navigation} = this.props;
    const {email, isSend} = this.state;

    if (isSend) {
      Alert.alert(
        'Password sent!',
        'Please check you email.',
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('Login');
            },
          },
        ],
        {cancelable: false},
      );
    } else {
      Alert.alert(
        'Error',
        'Please check you Email address.',
        [{text: 'Try again'}],
        {cancelable: false},
      );
    }
  }

  render() {
    const {navigation} = this.props;
    const {email} = this.state;
    return (
      <Block>
        <Block padding={[0, theme.sizes.base * 2]}>
          <Text h1 bold style={{marginTop: '5%'}}>
            Forgot your password?
          </Text>
          <View style={{marginTop: '4%'}} />

          <Text h6 secondary>
            Please fill in your email address and we’ll send you a secure link
            to recover your password
          </Text>
          <View style={{marginTop: '10%'}} />
          <Block top>
            <Input
              label="Email"
              style={[styles.input]}
              defaultValue={email}
              onChangeText={email => this.setState({email})}
            />
          </Block>
        </Block>
        <Block middle flex={0.5} margin={[0, theme.sizes.padding * 2]}>
          <TouchableOpacity
            onPress={async () => {
              let body = JSON.stringify({
                email,
              });
              try {
                await fetch(`${url}api/setPasswordMail`, {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body,
                });
                this.setState({isSend: true}, () => this.handleForgot());
              } catch (e) {
                console.log('printeeee', e);
                this.setState({isSend: false}, () => this.handleForgot());
              }
            }}>
            <LinearGradient
              start={{x: 4, y: 2}}
              end={{x: 0, y: 0}}
              colors={['#FFFFFF', '#EFEFEF']}
              opacity={0.8}
              style={styles.linearGradient}>
              <View style={{width: '80%'}}>
                <Text
                  h3
                  secondary
                  style={[
                    styles.buttonText,
                    {marginTop: theme.sizes.padding / 2},
                  ]}>
                  Reset password
                </Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
          <View style={{marginTop: '3%'}} />
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text gray h4 center style={{textDecorationLine: 'underline'}}>
              Back to Login
            </Text>
          </TouchableOpacity>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    marginLeft: '20%',
    marginBottom: '5%',
    //   color: '#ffffff',
    backgroundColor: 'transparent',
  },
  linearGradient: {
    width: '100%',
    // height:100*scale,
    //  flex: 0.3,
    borderRadius: 6,
    height: 16 * 3,
    justifyContent: 'center',
    marginVertical: 25 / 3,
    // marginTop: 0 * scale,
    shadowColor: '#323643',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  forgot: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.grayn,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent,
  },
});
