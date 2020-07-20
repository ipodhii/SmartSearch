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
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import {AsyncStorage} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import url from '../config/config';
import {Block, Text} from '../components';
import {theme} from '../constants';
import Images from '../assets/Themes/Images';
const VALID_EMAIL = 'contact@react-ui-kit.com';
const VALID_PASSWORD = 'subscribe';
const scale = Dimensions.get('window').width / 750;
import {amitInfo, idoInfo, liorInfo} from '../constants/mocks';
import styled from 'styled-components';

function convertToJson(res) {
  if (!res) return res;
  return res.json();
}
export default class Login extends Component {
  constructor(props) {
    super(props);
    let {email, password, confirmPassword} = amitInfo;
    
     this.state = {
      email,
      password,
      confirmPassword: '',
      errorMsg: false,
      errors: [],
      loading: false,
    };
    
/*
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      errorMsg: false,
      errors: [],
      loading: false,
    };
    */
  }

  isToken(header) {
    if (!header.map || !header.map.authorization) {
      return false;
    }
    return header.map.authorization;
  }
  async componentDidMount() {
    const fcmToken = await AsyncStorage.getItem('fcmToken');
    this.setState({fcmToken});
  }

  headerBrowser() {
    const {navigation} = this.props;
    const {
      loading,
      errors,
      password,
      confirmPassword,
      email,
      errorMsg,
      fcmToken,
    } = this.state;
    const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Container>
          <StatusBar barStyle="light-content" />
          <RecipeBackground source={Images.login}>
            <SafeAreaView>
              <MainRecipe>
                <TextT title heavy>
                  Login
                </TextT>
                <Divider />
                <TextT address bold>
                  {`Enter your email and password.`}
                </TextT>
              </MainRecipe>
            </SafeAreaView>
          </RecipeBackground>
          <RecipesContainer style={{zIndex: 444}}>
            <Recipes>
              <Block>
                <Block>
                  <KeyboardAvoidingView style={styles.login}>
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
                      {/*<View style={styles.singleField}>
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
                        </View>*/}
                      {errorMsg && (
                        <View>
                          <Text
                            style={{
                              color: 'rgba(200, 0, 0, 0.8)',
                              textAlign: 'center',
                            }}>
                            Email or password are incorrect.
                          </Text>
                        </View>
                      )}
                    </View>
                  </KeyboardAvoidingView>
                </Block>
                <Block middle flex={0.5} margin={[0, theme.sizes.padding * 2]}>
                  <TouchableOpacity
                    onPress={async () => {
                      let body = JSON.stringify({
                        email,
                        password,
                        confirmPassword: password,
                        fcmToken,
                      });
                      console.log('pressed', body);

                      try {
                        const res = await fetch(`${url}api/login`, {
                          method: 'POST',
                          headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                          },
                          body,
                        });
                        const tmp = await convertToJson(res);
                        this.setState({errorMsg: false}, () =>
                          navigation.navigate('Browse', {user: tmp}),
                        );
                      } catch (e) {
                        console.log('printeeee', e);
                        this.setState({errorMsg: true});
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
                          Login
                        </Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                  <View style={{marginTop: '3%'}} />
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Forgot')}>
                    <Text
                      gray
                      h4
                      center
                      style={{textDecorationLine: 'underline'}}>
                      Forgot password?
                    </Text>
                  </TouchableOpacity>
                </Block>
              </Block>
            </Recipes>
          </RecipesContainer>
        </Container>
      </ScrollView>
    );
  }

  render() {
    return <View>{this.headerBrowser()}</View>;
  }
}

const RecipeInfo = styled.View`
  flex: 1;
  margin-left: 12px;
`;
const RecipeImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 8px;
`;
const Recipe = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
`;
const Recipes = styled.View`
  margin-top: 16px;
`;

const RecipesContainer = styled.View`
  margin-top: -24px;
  background-color: #fff;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  border-bottom-left-radius: 44px;
  border-bottom-right-radius: 44px;
`;

const ButtonT = styled.TouchableOpacity`
  margin: 0 0 43px 30px;
  background-color: rgba(255, 255, 255, 0.3);
  align-self: flex-start;

  border-radius: 100px;
`;

const MainRecipe = styled.View`
  padding: 0 16px;
  margin: 135px 0 0 0;
`;
const Divider = styled.View`
  border-bottom-color: #fff;
  border-bottom-width: 2px;
  width: 150px;
  margin: 8px 0;
`;
const DividerRecepies = styled.View`
  border-bottom-color: #e7edef;
  border-bottom-width: 2px;
  width: 100%;
  margin: 8px 0px;
`;
const TextT = styled.Text`
  color: ${props => (props.dark ? '#000' : '#FFF')};
  font-family: 'AvenirNext-Regular';

  ${({title, address, large, small}) => {
    switch (true) {
      case title:
        return `font-size: 32px`;
      case address:
        return `font-size: 16px`;
      case large:
        return `font-size: 20px`;
      case small:
        return `font-size: 13px`;
    }
  }}

  ${({bold, heavy}) => {
    switch (true) {
      case bold:
        return `font-weight: 600`;
      case heavy:
        return `font-weight: 700`;
    }
  }}
`;
const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;
const RecipeBackground = styled.ImageBackground`
  width: 100%;
  height: 250px;
`;

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
    tintColor: 'black',
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
    marginLeft: '20%',
    marginBottom: '5%',
    //   color: '#ffffff',
    backgroundColor: 'transparent',
  },
  buttonTextForgotStyle: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    marginLeft: '10%',
    marginBottom: '5%',
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
