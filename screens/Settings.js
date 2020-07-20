import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  Dimensions,
  View,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import Slider from 'react-native-slider';
import EmailList from './Notificatios';
import {Button, Block, Text, Switch} from '../components';
import {theme, mocks} from '../constants';
import Guid from 'uuid/v4';
import Images from '../assets/Themes/Images';

import url from '../config/config';
import styled from 'styled-components';

const scale = Dimensions.get('window').width / 750;
const MAX_NOTIFICATION = 2;
const DEFAULT_PASSWORD = 'ifyouwantchange';
const pdu = (
  <Image
    source={Images.contactMem}
    style={{width: 55 * scale, height: 55 * scale, tintColor: 'white'}}
  />
);
const NOTIFICATION = (
  <Image
    source={Images.notification}
    style={{width: 35 * scale, height: 50 * scale, tintColor: 'black'}}
  />
);
const FULL_STAR = (
  <Image
    source={Images.fullStart}
    style={{width: 25 * scale, height: 25 * scale, tintColor: '#FEDC26'}}
  />
);
const LOADING = (
  <View style={CENTER_STYLE}>
    <ActivityIndicator size={'large'} animating={true} />
  </View>
);
const CENTER_STYLE = {
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  flex: 1,
};
function convertToJson(res) {
  console.log('printRes', res);
  if (!res) return res;
  return res.json();
}
class Settings extends Component {
  state = {
    budget: 850,
    monthly: 1700,
    notification: false,
    newsletter: false,
    editing: null,
    profile: {},
    modalVisible: false,
    userContactsMember: [],
    phone: '',
    isPassMaxNotification: false,
    password: DEFAULT_PASSWORD,
  };

  async componentDidMount() {
    const {navigation} = this.props;
    let user = navigation.getParam('user');
    console.log('printuser', user);
    let phone = user.phone;
    let email = user.email;
    let userCM = JSON.parse(user.userContactsMember);
    try {
      let res = await fetch(`${url}api/setting?user=${phone}`, {
        method: 'GET',
      });

      let data = await convertToJson(res);
      console.log('printDataFromSettings', data);
      let dataContactsMember = JSON.parse(data.notifiyMembers);
      let notification = JSON.parse(data.notification);
      let userContactsMember =
        dataContactsMember && dataContactsMember.length
          ? dataContactsMember
          : userCM;

      console.log('xxxxprintTest999', userContactsMember);
      //  let test = JSON.parse(data.userContactsMember);
      this.setState({
        profile: this.props.profile,
        userContactsMember,
        notification,
        phone,
        email,
        isExists: true,
      });
    } catch (err) {
      this.setState({
        profile: this.props.profile,
        userContactsMember: userCM,
        phone,
        email,
        isExists: false,
      });
    }
  }

  componentWillUnmount() {
    const {navigation} = this.props;
    let user = navigation.getParam('user');
    let {notification, userContactsMember, isExists} = this.state;
    let body = JSON.stringify({
      user: user.phone,
      notification: JSON.stringify(notification),
      notifiyMembers: JSON.stringify(userContactsMember),
    });
    console.log('printBody999', body);
  }

  handleEdit(name, text) {
    const {profile} = this.state;
    profile[name] = text;

    this.setState({profile});
  }

  async toggleEdit(name) {
    const {editing, password, email} = this.state;
    let body = JSON.stringify({email, newPassword: password});

    console.log('checkckckc', editing, password);
    if (editing === 'location' && password && password.length > 5) {
      fetch(`${url}api/changePassword`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body,
      })
        .then(() => {
          Alert.alert(
            'Password changed successfully',
            '',
            [
              {
                text: 'OK',
                onPress: () => {
                  this.setState({editing: !editing ? name : null});
                },
              },
            ],
            {cancelable: false},
          );
        })
        .catch(err => {
          Alert.alert(
            'Failed to changed password',
            'password length need to be more than 5',
            [
              {
                text: 'OK',
                onPress: () => {},
              },
            ],
            {cancelable: false},
          );
        });
    } else if (editing === 'Edit' || !editing) {
      this.setState({editing: !editing ? name : null, password: ''});
    } else {
      Alert.alert(
        'Failed to changed password',
        'Password size must be more than 5',
        [
          {
            text: 'OK',
            onPress: () => {},
          },
        ],
        {cancelable: false},
      );
    }
  }

  renderEdit(name) {
    const {profile, editing} = this.state;

    if (editing === name) {
      return (
        <TextInput
          defaultValue={profile[name]}
          onChangeText={text => this.handleEdit([name], text)}
        />
      );
    }

    return <Text bold>{profile[name]}</Text>;
  }
  toggleModal(modalVisible) {
    this.setState({modalVisible});
  }
  headerBrowser() {
    const {profile, editing, notification, phone, password, email} = this.state;
    const {navigation} = this.props;
    console.log('9999printnotification', editing);
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Container>
          <StatusBar barStyle="light-content" />
          <RecipeBackground source={Images.settings}>
            <SafeAreaView>
              <MainRecipe>
                <TextT title heavy>
                  Settings
                </TextT>
                <Divider />
                <TextT address bold>
                  {`View and modify your settings.`}
                </TextT>
              </MainRecipe>
            </SafeAreaView>
          </RecipeBackground>
          <RecipesContainer style={{zIndex: 444}}>
            <Recipes>
              <Block style={styles.inputs}>
                <Block
                  row
                  space="between"
                  margin={[10, 0]}
                  style={styles.inputRow}>
                  <Block>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <TextT heavy style={{marginBottom: 10, color: 'black'}}>
                        E-mail
                      </TextT>
                      <TextT bold style={{color: '#6F7374', marginBottom: 10}}>
                        {email}
                      </TextT>
                    </View>
                  </Block>
                </Block>
                <DividerRecepies />

                <Block
                  row
                  space="between"
                  margin={[10, 0]}
                  style={styles.inputRow}>
                  <Block>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <TextT heavy style={{marginBottom: 10, color: 'black'}}>
                        Phone number
                      </TextT>
                      <TextT bold style={{color: '#6F7374', marginBottom: 10}}>
                        {phone}
                      </TextT>
                    </View>
                  </Block>
                </Block>
                <DividerRecepies />

                <Block
                  row
                  space="between"
                  margin={[10, 0]}
                  style={styles.inputRow}>
                  <Block>
                    <TextT heavy style={{color: 'black', marginBottom: 10}}>
                      Password
                    </TextT>
                    <TextInput
                      style={styles.textFiled}
                      underlineColorAndroid={'transparent'}
                      //  placeholderTextColor="rgba(0,0,0,1)"
                      secureTextEntry
                      onChangeText={password => this.setState({password})}
                      value={password}
                    />
                  </Block>
                  <TextT
                    heavy
                    style={{color: 'black', marginBottom: 15 * scale}}
                    onPress={() => this.toggleEdit('location')}>
                    {editing === 'location' ? 'Save' : 'Edit'}
                  </TextT>
                </Block>
              </Block>
            </Recipes>
          </RecipesContainer>
        </Container>
      </ScrollView>
    );
  }

  showContactsMember() {
    let {userContactsMember, notification} = this.state;
    console.log('checkuserContactsMember222notification', userContactsMember);
    return userContactsMember && userContactsMember.length > 0 ? (
      userContactsMember.map(
        function(member, index) {
          console.log('printhhheeeerrreee', member, index);
          return (
            <View style={[styles.itemContainerV2]} key={Guid()}>
              <TouchableOpacity
                onLongPress={() => {
                  if (!member.highPriority) {
                    console.log('longPressMakeTrue');
                    let nuserContactsMember = [...userContactsMember];
                    nuserContactsMember[index].highPriority = true;
                    this.setState({userContactsMember: nuserContactsMember});
                  } else {
                    console.log('longPressMakeFalse');
                    let nuserContactsMember = [...userContactsMember];
                    nuserContactsMember[index].highPriority = false;
                    this.setState({userContactsMember: nuserContactsMember});
                  }
                }}>
                <View>
                  <View>
                    <View
                      style={[
                        !userContactsMember[index].highPriority
                          ? styles.itemContainer
                          : styles.itemContainerPress,
                      ]}>
                      <View style={styles.itemIconContainer}>
                        <View style={styles.itemIconBackground}>{pdu}</View>
                      </View>

                      <View style={styles.itemMidContainer}>
                        <Text style={styles.itemMidText}>{member.name}</Text>
                        <View style={styles.itemMidDescriptionContainer}>
                          <Text style={{color: '#6F7374'}}>{member.phone}</Text>
                        </View>
                      </View>
                      <View style={styles.itemRightContainer}></View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          );
        }.bind(this),
      )
    ) : userContactsMember ? (
      LOADING
    ) : (
      <Text>no contacts members</Text>
    );
  }
  render() {
    return <Block>{this.headerBrowser()}</Block>;
  }
}

Settings.defaultProps = {
  profile: mocks.profile,
};

export default Settings;

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
  margin: 105px 0 0 0;
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
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    //   color: '#ffffff',
    backgroundColor: 'transparent',
  },
  linearGradient: {
    width: '85%',
    // height:100*scale,
    //  flex: 0.3,
    marginLeft: 50 * scale,
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
  header: {
    paddingHorizontal: theme.sizes.base * 2,
  },
  itemContainerV2: {
    height: 126 * scale,
    //  backgroundColor: 'white',
    marginLeft: -40 * scale,
  },
  itemIconBackground: {
    width: 90 * scale,
    height: 90 * scale,
    borderRadius: 45 * scale,
    backgroundColor: '#E2E6E7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemMidContainer: {
    width: 380 * scale,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  itemIconContainer: {
    width: 168 * scale,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemIconContainerV2: {
    width: 128 * scale,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    height: 128 * scale,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#F5F5F5',
  },
  itemContainerPress: {
    height: 128 * scale,
    backgroundColor: '#51B72B',
    flexDirection: 'row',
    opacity: 0.8,
    borderBottomWidth: 2,
    borderBottomColor: '#F5F5F5',
  },
  itemMidText: {
    color: 'black',
    marginBottom: 5 * scale,
    fontWeight: 'bold',
    //marginLeft:40*scale
  },
  itemMidDescriptionContainer: {
    flexDirection: 'row',
    // marginLeft:40*scale,
    //  marginBottom: 10 * scale,
    color: '#F7F7F7',
  },
  itemRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '40%',
    marginLeft: 80 * scale,
  },
  navigateBack: {
    width: 150 * scale,
    height: 100 * scale,
    position: 'absolute',
    left: 38 * scale,
    top: 66 * scale,
  },
  sectionSeperator: {
    height: 2 * scale,
    width: 750 * scale,
    backgroundColor: '#F5F5F5',
  },
  scheduleItemContainer: {
    height: 138 * scale,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  scheduleItemLeftPan: {
    width: '40%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 20 * scale,
  },
  scheduleLeftText: {
    // fontFamily: typeFonts.base,
    // fontSize: sizeFonts.itemText,
    color: 'black',
    marginLeft: 34 * scale,
  },

  bodycont: {
    flex: 1,
    resizeMode: 'stretch',
  },
  container: {
    flex: 2,
  },
  headerBlk: {
    flex: 1,
  },
  tab: {
    backgroundColor: '#00DFDE',
  },
  tabbar: {
    backgroundColor: '#00DFDE',
  },
  gradeBlk: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    flex: 1,
    marginTop: 40,
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
  },
  filedsOuter: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignSelf: 'stretch',
    padding: 20,
    paddingTop: 30,
  },
  textedit: {
    height: 40,
    backgroundColor: 'transparent',
    alignSelf: 'stretch',
    width: 300,
    padding: 0,
    paddingBottom: 10,
  },
  textFiled: {
    height: 40,
    backgroundColor: 'transparent',
    alignSelf: 'stretch',
    width: 300,
    padding: 0,
    color: '#6F7374',
    //  paddingBottom: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
    paddingTop: 20,
  },
  submitButton: {
    backgroundColor: '#00e0ee',
    borderRadius: 30,
    padding: 15,
    paddingLeft: 30,
    paddingRight: 30,
    width: 200,
    flexDirection: 'row',
  },
  submitButtonText: {
    fontSize: 15,
    textAlign: 'center',
    color: '#FFF',
    fontWeight: 'bold',
    flex: 1,
  },

  singleField: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    //   marginBottom: 15,
    borderColor: '#e7edef',
    borderBottomWidth: 1,
  },
  forgotField: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginBottom: 15,
  },

  buttonField: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginBottom: 0,
  },
  inputIcon: {
    padding: 10,
  },

  forgotPass: {
    color: '#00a2ee',
    fontSize: 14,
    textDecorationLine: 'underline',
  },

  iconBlk: {
    width: 18,
    height: 16,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  avatar: {
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2,
  },
  inputs: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2,
  },

  inputRow: {
    alignItems: 'flex-end',
  },

  sliders: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2,
  },

  thumb: {
    width: theme.sizes.base,
    height: theme.sizes.base,
    borderRadius: theme.sizes.base,
    borderColor: 'white',
    borderWidth: 3,
    backgroundColor: theme.colors.secondary,
  },

  toggles: {
    paddingHorizontal: theme.sizes.base * 2,
  },
});
