//myproject backup1
import React, {Component} from 'react';
import {
  AppRegistry,
  View,
  StyleSheet,
  TextInput,
  AsyncStorage,
  Image,
  NavigatorIOS,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  Alert,
  Platform,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  PermissionsAndroid,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

import {
  Content,
  Item,
  Tabs,
  Tab,
  Input,
  Button,
  Icon,
  // Text,
} from 'native-base';
import Contacts from 'react-native-contacts';
import Guid from 'uuid/v4';
import SwipeBtn from 'react-native-swipeout';
import {Block, Text} from '../components';
import LinearGradient from 'react-native-linear-gradient';
import url from '../config/config';
//import { Button, Block, Input } from '../components';
import {theme} from '../constants';
import Images from '../assets/Themes/Images';
import {ido, mom, yotam, lior, dad, amit} from '../constants/mocks';
//import {  styleFonts,sizeFonts,typeFonts } from '../assets/Themes/Fonts'
import styled from 'styled-components';

const scale = Dimensions.get('window').width / 750;
const HIGIPRIORITY = 2;
const MEDIUMRIORITY = 1.5;
const LOWPRIORITY = 1.1;
const CENTER_STYLE = {
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  flex: 1,
};
const pdu = (
  <Image
    source={Images.contactMem}
    style={{width: 55 * scale, height: 55 * scale, tintColor: 'white'}}
  />
);

const LOADING = (
  <View style={CENTER_STYLE}>
    <ActivityIndicator size={'large'} animating={true} />
  </View>
);
function convertToJson(res) {
  if (!res) return res;
  return res.json();
}
export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.checkInternetConnection();
    this.state = {
      isLoading: false,
      //  contacts: amit,
      contacts: amit,
      errorMsg: false,
      isSort: false,
      searchStr: '',
      spliceContacts: [],
    };
  }
  checkInternetConnection = () => {
    NetInfo.addEventListener(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
    });
  };
  getContacts() {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: 'Contacts',
      message: 'Smart search app would like to view your contacts.',
      buttonPositive: 'Please accept bare mortal',
    }).then(() => {
      const {navigation} = this.props;
      Contacts.getAll((err, contacts) => {
        if (err === 'denied') {
          navigation.navigate('preSignUp');
        } else {
          if (contacts.length > 0) {
            this.setState({contacts});
          }
        }
      });
    });
  }
  searchContacts = str => {
    let {isSort, contacts, searchStr} = this.state;
    let res = [];
    // if(isSort&&searchStr!==''){
    res = contacts.filter(member => {
      if (
        (member && member.phoneNumbers && member.phoneNumbers.includes(str)) ||
        (member &&
          member.givenName &&
          member.givenName.toLowerCase().includes(str.toLowerCase())) ||
        (member &&
          member.familyName &&
          member.familyName.toLowerCase().includes(str.toLowerCase()))
      ) {
        return member;
      }
    });
    console.log('printRes', res);
    this.setState({spliceContacts: res});
    //  }
    return contacts;
  };

  renderSearch() {
    return (
      <View
        style={{
          paddingLeft: 60 * scale,
          paddingRight: 60 * scale,
          marginTop: 20 * scale,
          marginBottom: 20 * scale,
        }}>
        <View style={styles.singleField}>
          <View style={{marginTop: 30 * scale, lineHight: 10}}>
            <Image
              style={styles.iconBlk}
              source={require('../assets/images/password_icon.png')}
            />
          </View>
          <TextInput
            style={styles.textFiled}
            placeholder="Search"
            returnKeyType="go"
            underlineColorAndroid={'transparent'}
            placeholderTextColor="rgba(0,0,0,1)"
            value={this.state.searchStr}
            onChangeText={searchStr => {
              if (searchStr !== '') {
                this.searchContacts(searchStr);
              }
              this.setState({
                searchStr,
                isSort: searchStr !== '' ? true : false,
              });
            }}
            //  ref={(input) => this.passwordInput = input}
          />
        </View>
      </View>
    );
  }
  async componentDidMount() {
    if (1 !== 1) {
      this.getContacts();
    }
    const fcmToken = await AsyncStorage.getItem('fcmToken');
    this.setState({fcmToken});
  }

  headerBrowser() {
    const {navigation} = this.props;
    let {
      contacts,
      spliceContacts,
      isSort,
      searchStr,
      errorMsg,
      fcmToken,
    } = this.state;
    let phones = [];
    console.log('printContactsphones', phones);
    if (this.state.isLoading) {
      return LOADING;
    }
    let contactsArray = !isSort || searchStr === '' ? contacts : spliceContacts;
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Container>
          <StatusBar barStyle="light-content" />
          <RecipeBackground source={Images.contactsMember2}>
            <SafeAreaView>
              <MainRecipe>
                <TextT title heavy>
                  Contacts member
                </TextT>
                <Divider />
                <TextT address bold>
                  {`Register to our app.`}
                </TextT>
              </MainRecipe>
            </SafeAreaView>
          </RecipeBackground>
          <RecipesContainer style={{zIndex: 444}}>
            <Recipes>
              <ScrollView>
                <View>
                  <View style={styles.header}>
                    <Text bold h4 black>
                      Modifiy priority for your contacts member by swipe left or
                      remove them by swipe right
                    </Text>
                  </View>

                  {this.renderSearch()}
                  {/* <View style={[styles.sectionSeperator]}/>*/}
                  {contactsArray && contactsArray.length > 0
                    ? contactsArray.map(
                        function(member, index) {
                          if (!member || !member.phoneNumbers[0]) return;
                          phones.push(member.phoneNumbers[0].number);
                          let rightOptions = [
                            {
                              text: 'Delete',
                              onPress: function() {
                                let nContactList = [...this.state.contacts];
                                nContactList.splice(index, 1);
                                this.setState({contacts: nContactList});
                              }.bind(this),
                              backgroundColor: '#ff5151',
                            },
                          ];
                          let leftOptions = [
                            {
                              text: 'High',
                              onPress: function() {
                                let nContactList = [...this.state.contacts];
                                nContactList[index].priority = HIGIPRIORITY;
                                this.setState({contacts: nContactList});
                              }.bind(this),
                              backgroundColor: '#51B72B',
                            },
                            ,
                            {
                              text: 'Medium',
                              onPress: function() {
                                let nContactList = [...this.state.contacts];
                                nContactList[index].priority = MEDIUMRIORITY;
                                this.setState({contacts: nContactList});
                              }.bind(this),
                              backgroundColor: '#CCCCCC',
                            },
                            ,
                            {
                              text: 'Low',
                              onPress: function() {
                                let nContactList = [...this.state.contacts];
                                nContactList[index].priority = LOWPRIORITY;
                                this.setState({contacts: nContactList});
                              }.bind(this),
                              backgroundColor: '#CCCCCC',
                            },
                          ];
                          return (
                            <View style={[styles.itemContainerV2]} key={Guid()}>
                              <SwipeBtn
                                autoClose={true}
                                right={rightOptions}
                                left={leftOptions}
                                buttonWidth={44}
                                style={{height: 128 * scale}}>
                                <TouchableOpacity
                                  onLongPress={() => {
                                    /*
                              if (!this.state.contacts[index].highPriority) {
                                console.log('longPressMakeTrue');
                                let nContactList = [...this.state.contacts];
                                nContactList[index].highPriority = true;
                                this.setState({contacts: nContactList});
                              } else {
                                console.log('longPressMakeFalse');
                                let nContactList = [...this.state.contacts];
                                nContactList[index].highPriority = false;
                                this.setState({contacts: nContactList});
                              }
                              */
                                  }}>
                                  <View>
                                    <View>
                                      <View
                                        style={[
                                          !this.state.contacts[index]
                                            .highPriority
                                            ? styles.itemContainer
                                            : styles.itemContainerPress,
                                        ]}>
                                        <View style={styles.itemIconContainer}>
                                          <View
                                            style={styles.itemIconBackground}>
                                            {pdu}
                                          </View>
                                        </View>

                                        <View style={styles.itemMidContainer}>
                                          <Text style={styles.itemMidText}>
                                            {`${
                                              member.givenName
                                                ? member.givenName.replace(
                                                    /\s/g,
                                                    '',
                                                  )
                                                : ''
                                            } ${
                                              member.familyName
                                                ? member.familyName.replace(
                                                    /\s/g,
                                                    '',
                                                  )
                                                : ''
                                            }`}
                                          </Text>
                                          <View
                                            style={
                                              styles.itemMidDescriptionContainer
                                            }>
                                            <Text style={{color: '#6F7374'}}>
                                              {member.phoneNumbers[0].number
                                                ? member.phoneNumbers[0].number.replace(
                                                    /\s/g,
                                                    '',
                                                  )
                                                : 'N/A'}
                                            </Text>
                                          </View>
                                        </View>
                                        <View style={styles.itemRightContainer}>
                                          {/*<Text> {this.props.app && this.props.app.policy && this.props.app.policy.type ? this.props.app.policy.type : ''}</Text>*/}
                                        </View>
                                      </View>
                                    </View>

                                    <View style={[styles.sectionSeperator]} />
                                  </View>
                                </TouchableOpacity>
                              </SwipeBtn>
                            </View>
                          );
                        }.bind(this),
                      )
                    : LOADING}
                </View>

                {errorMsg && (
                  <View>
                    <Text
                      style={{
                        color: 'rgba(200, 0, 0, 0.8)',
                        textAlign: 'center',
                      }}>
                      Failed to register.
                    </Text>
                  </View>
                )}
                <View style={{marginTop: 60 * scale}} />
                <TouchableOpacity
                  onPress={async () => {
                    let userContactsMember = [];
                    contacts.map(member => {
                      if (
                        member &&
                        member.phoneNumbers[0] &&
                        member.phoneNumbers[0].number
                      ) {
                        let phone = member.phoneNumbers[0].number;
                        let name = member.givenName;
                        let priority = member.priority || LOWPRIORITY;
                        let lastName = member.familyName;
                        console.log('printPhoneBefore', priority, name);
                        if (phone.slice(0, 4) === '+972') {
                          phone = phone.replace('+972', '0');
                        }
                        phone = phone.split(' ').join('');
                        phone = phone.split('-').join('');
                        phone = phone.slice(0, 3) + '-' + phone.slice(3);
                        console.log('printPhoneAfter', phone);
                        userContactsMember.push({
                          phone,
                          name,
                          lastName,
                          priority,
                        });
                      }
                    });
                    console.log(
                      'checkuserContactsMember',
                      JSON.stringify(userContactsMember),
                    );

                    let body = JSON.stringify({
                      name: navigation.getParam('name'),
                      lastName: navigation.getParam('lastName'),
                      phone: navigation.getParam('phone'),
                      email: navigation.getParam('email'),
                      password: navigation.getParam('password'),
                      confirmPassword: navigation.getParam('confirmPassword'),
                      userContactsMember: JSON.stringify(userContactsMember),
                      fcmToken,
                    });
                    console.log('printcheckphonenenenene', body);
                    console.log('printUrl', `${url}api/register`);

                    try {
                      const res = await fetch(`${url}api/register`, {
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
                    <Text
                      h3
                      secondary
                      style={[
                        styles.buttonText,
                        {marginTop: theme.sizes.padding / 2},
                      ]}>
                      Confirm
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('preSignUp')}>
                  <Text
                    gray
                    h4
                    center
                    style={{textDecorationLine: 'underline'}}>
                    Back
                  </Text>
                </TouchableOpacity>
                <View style={{marginTop: '3%'}} />
              </ScrollView>
            </Recipes>
          </RecipesContainer>
        </Container>
      </ScrollView>
    );
  }
  render() {
    return <Block>{this.headerBrowser()}</Block>;
  }
}

/*


*/

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
    paddingLeft: 70 * scale,
    paddingTop: 20 * scale,
  },
  itemContainerV2: {
    height: 126 * scale,
    backgroundColor: 'white',
    marginLeft: 20 * scale,
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
  },
  itemContainerPress: {
    height: 128 * scale,
    backgroundColor: '#51B72B',
    flexDirection: 'row',
    opacity: 0.8,
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
  sectionSeperator: {
    height: 2 * scale,
    width: 750 * scale,
    backgroundColor: '#e2e6e7',
  },
  bodycont: {
    flex: 1,
    resizeMode: 'stretch',
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
}); /*
</View>
</View>
</View>
*/ /*}*/

/*
 return (
              <View key={Guid()}>
            <View>
            <View style={styles.itemContainer} >
              <View style={styles.itemIconContainer}>
                <View style={styles.itemIconBackground} >
                  {pdu}
                </View>
              </View>

              <View style={styles.itemMidContainer}>
                <Text style={styles.itemMidText}>
                {`${member.givenName?member.givenName.replace(/\s/g, ''):''} ${member.familyName?member.familyName.replace(/\s/g, ''):''}`}
                </Text>
                <View style={styles.itemMidDescriptionContainer}>
                  <Text style={{color:'#6F7374'}}>
                      {member.phoneNumbers[0].number?member.phoneNumbers[0].number.replace(/\s/g, ''):"N/A"}
                    </Text>
                </View>
              </View>
              <View style={styles.itemRightContainer}>
                {/*<Text> {this.props.app && this.props.app.policy && this.props.app.policy.type ? this.props.app.policy.type : ''}</Text>*/ {
  /*<View style={styles.scheduleItemContainer} >
                  <View style={styles.itemMidContainer}>
                 <Text style={styles.itemMidText}>
                 {`${member.givenName?member.givenName.replace(/\s/g, ''):''} ${member.familyName?member.familyName.replace(/\s/g, ''):''}`}
                 </Text>
                  <View style={styles.itemMidDescriptionContainer}>
                 <Text style={{color:'#ADAFBA'}}> {member.phoneNumbers[0].number?member.phoneNumbers[0].number.replace(/\s/g, ''):"N/A"}</Text>
                  </View>    
                </View>
                
                                  
                                  {/*
                                   <View style={[styles.scheduleItemLeftPan]}>
                                       <Text style={styles.scheduleLeftText}>{`${member.givenName?member.givenName:''} ${member.familyName?member.familyName:''}`}</Text>
                                   </View>
                                   <View style={[styles.itemRightContainer]}>
                                   <Text style={{color:"black",fontWeight:"bold"}}> 
                                       {member.phoneNumbers[0].number?member.phoneNumbers[0].number:"N/A"}
                                       </Text>
    
                                   </View>
                                  */
}
{
  /* </View>*/
}
/*
 <View style={[styles.sectionSeperator]} />
</View>
);

*/
