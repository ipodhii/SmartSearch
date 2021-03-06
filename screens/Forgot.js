import React, {Component} from 'react';
import {
  Alert,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Dimensions,
} from 'react-native';

import {Button, Block, Input, Text} from '../components';
import {theme} from '../constants';
import LinearGradient from 'react-native-linear-gradient';
import url from '../config/config';
import styled from 'styled-components';
import images from '../assets/Themes/Images';

const VALID_EMAIL = 'amit@indorz.co';
const scale = Dimensions.get('window').width / 750;

export default class Forgot extends Component {
  state = {
    email: '',
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

  headerBrowser() {
    const {navigation} = this.props;
    const {email} = this.state;
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Container>
          <StatusBar barStyle="light-content" />
          <RecipeBackground source={images.forgot}>
            <SafeAreaView>
              <MainRecipe>
                <TextT title heavy>
                  Forgot password
                </TextT>
                <Divider />
                <TextT address heavy>
                  {`Reset password`}
                </TextT>
              </MainRecipe>
            </SafeAreaView>
          </RecipeBackground>
          <RecipesContainer style={{zIndex: 444}}>
            <Recipes>
              <View>
                <Block padding={[0, theme.sizes.base * 2]}>
                  <Text h6 black bold>
                    Please fill in your email address and we’ll send you a
                    secure link to recover your password
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
                <View style={{marginTop: 50 * scale}}>
                  <Block
                    middle
                    flex={0.5}
                    margin={[0, theme.sizes.padding * 2]}>
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
                          this.setState({isSend: true}, () =>
                            this.handleForgot(),
                          );
                        } catch (e) {
                          console.log('printeeee', e);
                          this.setState({isSend: false}, () =>
                            this.handleForgot(),
                          );
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
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Login')}>
                      <Text
                        gray
                        h4
                        center
                        style={{textDecorationLine: 'underline'}}>
                        Back to Login
                      </Text>
                    </TouchableOpacity>
                  </Block>
                </View>
              </View>
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
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
`;

const ButtonT = styled.TouchableOpacity`
  margin: 0 0 43px 30px;
  background-color: rgba(255, 255, 255, 0.3);
  align-self: flex-start;

  border-radius: 100px;
`;

const MainRecipe = styled.View`
  padding: 0 16px;
  margin: 134px 0 0 0;
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

const MenuBar = styled.ImageBackground`
  flex-direction: row;
  justify-content: flex-end;
  padding: 16px;
`;

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
