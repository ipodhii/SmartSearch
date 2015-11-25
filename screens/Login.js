import React, {Component} from 'react';
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  View,
  Image,
  TextInput,
} from 'react-native';
import {AsyncStorage} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {Block, Text} from '../components';
import {theme} from '../constants';
import Images from '../assets/Themes/Images';

const VALID_EMAIL = 'contact@react-ui-kit.com';
const VALID_PASSWORD = 'subscribe';
const scale = Dimensions.get('window').width / 750;

export default class Login extends Component {
  state = {
    email: 'amit@indorz.co',
    password: '12345678',
    confirmPassword: '12345678',
    errorMsg: false,
    errors: [],
    loading: false,
  };
  isToken(header) {
    if (!header.map || !header.map.authorization) {
      return false;
    }
    return header.map.authorization;
  }
  render() {
    const {navigation} = this.props;
    const {
      loading,
      errors,
      password,
      confirmPassword,
      email,
      errorMsg,
    } = this.state;
    const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);

    return (
      <Block>
        <KeyboardAvoidingView style={styles.login}>
          <Block flex={false} row center space="between" style={styles.header}>
            <Text h1 bold>
              Login
            </Text>
          </Block>

          <View
            style={{
              paddingLeft: 70 * scale,
              paddingRight: 70 * scale,
              paddingTop: 70 * scale,
            }}>
            <View style={styles.singleField}>
              <Image
                style={styles.iconBlk}
                source={require('../assets/images/email_icon.png')}
              />
              <TextInput
                style={styles.textFiled}
                placeholder="Email"
                keyboardType="email-address"
                underlineColorAndroid={'transparent'}
                autoCapitalize="none"
                autoCorrect={false}
                placeholderTextColor="rgba(0,0,0,1)"
                value={email}
                onChangeText={email => this.setState({email})}
              />
            </View>
            <View style={styles.singleField}>
              <Image
                style={styles.iconBlk}
                source={require('../assets/images/password_icon.png')}
              />
              <TextInput
                style={styles.textFiled}
                placeholder="Password"
                underlineColorAndroid={'transparent'}
                placeholderTextColor="rgba(0,0,0,1)"
                secureTextEntry
                value={password}
                onChangeText={password => this.setState({password})}
              />
            </View>
            <View style={styles.singleField}>
              <Image
                style={styles.iconBlk}
                source={require('../assets/images/password_icon.png')}
              />
              <TextInput
                style={styles.textFiled}
                placeholder="Confirm Password"
                returnKeyType="go"
                underlineColorAndroid={'transparent'}
                placeholderTextColor="rgba(0,0,0,1)"
                secureTextEntry
                value={confirmPassword}
                onChangeText={confirmPassword =>
                  this.setState({confirmPassword})
                }
                //ref={(input) => this.passwordInput = input}
              />
            </View>
            {errorMsg && (
              <View>
                <Text
                  style={{color: 'rgba(200, 0, 0, 0.8)', textAlign: 'center'}}>
                  Email or password are incorrect.
                </Text>
              </View>
            )}
            <View style={{marginTop: 60 * scale}} />
            <TouchableOpacity
              onPress={async () => {
                let body = JSON.stringify({
                  email,
                  password,
                  confirmPassword,
                });
                console.log('pressed', body);

                const res = await fetch('http://10.0.0.2:5000/api/login', {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body,
                });
                try {
                  const tmp = await res.json();
                  console.log('123456789', tmp);
                  this.setState({errorMsg: false}, () =>
                    navigation.navigate('Browse', {user: tmp}),
                  );
                } catch (e) {
                  this.setState({errorMsg: true});
                }
              }}>
              <LinearGradient
                start={{x: 4, y: 2}}
                end={{x: 0, y: 0}}
                colors={['#FFFFFF', '#EFEFEF']}
                opacity={0.8}
                style={styles.linearGradient}>
                <Text
                  h3
                  gray2
                  style={[
                    styles.buttonText,
                    {marginTop: theme.sizes.padding / 2},
                  ]}>
                  Login
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Forgot')}>
              <LinearGradient
                start={{x: 4, y: 2}}
                end={{x: 0, y: 0}}
                colors={['#FFFFFF', '#EFEFEF']}
                opacity={0.8}
                style={styles.linearGradient}>
                <Text
                  h3
                  gray2
                  style={[
                    styles.buttonText,
                    {marginTop: theme.sizes.padding / 2},
                  ]}>
                  Forgot your password?
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingLeft: 70 * scale,
    paddingTop: 20 * scale,
  },
  avatar: {
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2,
  },
  textFiled: {
    height: 40,
    backgroundColor: 'transparent',
    alignSelf: 'stretch',
    width: 300,
    padding: 0,
    paddingBottom: 10,
  },
  singleField: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginBottom: 15,
    borderColor: '#e7edef',
    borderBottomWidth: 1,
  },
  iconBlk: {
    width: 18,
    height: 16,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  login: {
    flex: 1,
    //  justifyContent: 'center',
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent,
  },
  sectionSeperator: {
    height: 2 * scale,
    width: 750 * scale,
    backgroundColor: '#FCFAFA',
    //   marginTop:50*scale,
    marginBottom: 100 * scale,
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
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    //   color: '#ffffff',
    backgroundColor: 'transparent',
  },
  stepsContainer: {
    position: 'absolute',
    bottom: theme.sizes.base * 3,
    right: 0,
    left: 0,
  },
  steps: {
    width: 5,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 2.5,
  },
});
