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
  Modal,
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
var WINDOW_HEIGHT = Dimensions.get('window').height;

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
      isOpenEditModal: false,
      chosenMember: {},
      memberIndex: 0,
      memberName: '',
      memberLastName: '',
    };
  }

  checkInternetConnection = () => {
    NetInfo.addEventListener(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
    });
  };

  componentDidMount() {
    const {navigation} = this.props;
    let user = navigation.getParam('user');
    console.log('printUser', user);
    let contactsArray = JSON.parse(user.userContactsMember);
    this.setState({contactsArray, user});
  }

  getPriority(priority) {
    if (priority === 2) return 'H';
    if (priority === 1.5) return 'M';
    return 'L';
  }
  updateUser(tmp) {
    console.log('printuserRestmp', tmp);
    let {navigation} = this.props;
    return new Promise((resolve, reject) => {
      resolve(
        this.setState({errorMsg: false}, () =>
          navigation.navigate('Browse', {user: tmp}),
        ),
      );
    });
  }
  headerBrowser() {
    const {navigation} = this.props;
    let {
      contacts,
      errorMsg,
      fcmToken,
      contactsArray,
      spliceContacts,
    } = this.state;
    let phones = [];

    console.log('printContactsphones', contactsArray);
    if (this.state.isLoading) {
      return LOADING;
    }
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Container>
          <StatusBar barStyle="light-content" />
          <RecipeBackground source={Images.contactsMember}>
            <SafeAreaView>
              <MainRecipe>
                <TextT title heavy>
                  Contact list
                </TextT>
                <Divider />
                <TextT address bold>
                  {`Update priority to members`}
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

                  {/*this.renderSearch()*/}
                  {/* <View style={[styles.sectionSeperator]}/>*/}
                  <View style={{marginTop: 60 * scale}} />
                  {contactsArray && contactsArray.length > 0
                    ? contactsArray.map(
                        function(member, index) {
                          if (!member || !member.phone) return;
                          console.log('printMember', member);
                          phones.push(member.phone);
                          let rightOptions = [
                            {
                              text: 'Delete',
                              onPress: function() {
                                let contactsArray = [
                                  ...this.state.contactsArray,
                                ];
                                contactsArray.splice(index, 1);
                                this.setState({contactsArray});
                              }.bind(this),
                              backgroundColor: '#ff5151',
                            },
                          ];
                          let leftOptions = [
                            {
                              text: 'High',
                              onPress: function() {
                                let contactsArray = [
                                  ...this.state.contactsArray,
                                ];
                                contactsArray[index].priority = HIGIPRIORITY;
                                this.setState({contactsArray});
                              }.bind(this),
                              backgroundColor: '#51B72B',
                            },
                            ,
                            {
                              text: 'Medium',
                              onPress: function() {
                                let contactsArray = [
                                  ...this.state.contactsArray,
                                ];
                                contactsArray[index].priority = MEDIUMRIORITY;
                                this.setState({contactsArray});
                              }.bind(this),
                              backgroundColor: '#CCCCCC',
                            },
                            ,
                            {
                              text: 'Low',
                              onPress: function() {
                                let contactsArray = [
                                  ...this.state.contactsArray,
                                ];
                                contactsArray[index].priority = LOWPRIORITY;
                                this.setState({contactsArray});
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
                                  onPress={() => {
                                    this.setState({
                                      isOpenEditModal: true,
                                      memberIndex: index,
                                      chosenMember: member,
                                      memberName: member.name,
                                      memberLastName: member.lastName,
                                    });
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

                                        <View style={[styles.itemMidContainer]}>
                                          <View
                                            style={{
                                              flexDirection: 'row',
                                            }}>
                                            <Text style={[styles.itemMidText]}>
                                              {`${
                                                member.name
                                                  ? member.name.replace(
                                                      /\s/g,
                                                      '',
                                                    )
                                                  : ''
                                              } ${
                                                member.lastName
                                                  ? member.lastName.replace(
                                                      /\s/g,
                                                      '',
                                                    )
                                                  : ''
                                              }`}
                                            </Text>
                                            <Text
                                              style={{
                                                position: 'absolute',
                                                left: 450 * scale,
                                                top: 20 * scale,
                                                fontWeight: 'bold',
                                                fontSize: 26 * scale,
                                                color:
                                                  this.getPriority(
                                                    member.priority,
                                                  ) === 'H'
                                                    ? '#51B72B'
                                                    : '#CCCCCC',
                                              }}>{`(${this.getPriority(
                                              member.priority,
                                            )})`}</Text>
                                          </View>
                                          <View
                                            style={
                                              styles.itemMidDescriptionContainer
                                            }>
                                            <Text style={{color: '#6F7374'}}>
                                              {member.phone
                                                ? member.phone.replace(
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
                      Failed to save.
                    </Text>
                  </View>
                )}
                <View style={{marginTop: 60 * scale}} />
                <TouchableOpacity
                  onPress={async () => {
                    let {user} = this.state;
                    let body = JSON.stringify({
                      id: user.id,
                      userContactsMember: JSON.stringify(contactsArray),
                    });
                    console.log('printBody', body);
                    console.log('printUrl', `${url}api/user`);

                    try {
                      const res = await fetch(`${url}api/user`, {
                        method: 'PUT',
                        headers: {
                          Accept: 'application/json',
                          'Content-Type': 'application/json',
                        },
                        body,
                      });
                      const tmp = await convertToJson(res);
                      await this.updateUser(tmp);
                      /*
                      this.setState({errorMsg: false}, () =>
                        navigation.navigate('Menu', {user: userRes}),
                      );
                      */
                    } catch (e) {
                      console.log('printeeeeeeeee', e);
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
                  onPress={() =>
                    navigation.navigate('Menu', {
                      user: this.props.navigation.getParam('user'),
                    })
                  }>
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
        <Modal
          animationType={'slide'}
          visible={this.state.isOpenEditModal}
          onRequestClose={function() {
            this.setState({
              isOpenEditModal: false,
            });
          }.bind(this)}>
          <View style={[styles.modalBack]}>
            <View style={[styles.dialogBack]}>
              <Text
                style={[
                  styles.header,
                  {
                    marginBottom: 50 * scale,
                    marginTop: 40 * scale,
                    textAlign: 'center',
                    marginRight: 70 * scale,
                  },
                ]}
                h1>
                Edit member
              </Text>
              <View style={[styles.singleField]}>
                <TextInput
                  // enabled={this.state.isOpenEditModal}
                  style={[
                    styles.textFiled,
                    {
                      fontSize: 30 * scale,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      color: 'black',
                    },
                  ]}
                  placeholder="name"
                  underlineColorAndroid={'transparent'}
                  placeholderTextColor="rgba(0,0,0,1)"
                  value={this.state.memberName}
                  onChangeText={memberName => this.setState({memberName})}
                />
              </View>

              <View style={[styles.singleField]}>
                <TextInput
                  // enabled={this.state.isOpenEditModal}
                  style={[
                    styles.textFiled,
                    {
                      fontSize: 30 * scale,
                      textAlign: 'center',
                      fontWeight: 'bold',
                      color: 'black',
                    },
                  ]}
                  placeholder="Last name"
                  underlineColorAndroid={'transparent'}
                  placeholderTextColor="rgba(0,0,0,1)"
                  value={this.state.memberLastName}
                  onChangeText={memberLastName =>
                    this.setState({memberLastName})
                  }
                />
              </View>

              <View style={{marginTop: 30 * scale}} />
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={async () => {
                    let {
                      chosenMember,
                      memberIndex,
                      memberLastName,
                      memberName,
                    } = this.state;
                    chosenMember.lastName = memberLastName;
                    chosenMember.name = memberName;
                    let nContactsArray = [...contactsArray];
                    console.log('printchosenMember1', chosenMember);
                    nContactsArray[memberIndex] = chosenMember;
                    console.log(
                      'printchosenMember12',
                      nContactsArray[memberIndex],
                    );
                    this.setState({
                      isOpenEditModal: false,
                      memberIndex: 0,
                      chosenMember: {},
                      contactsArray: nContactsArray,
                    });
                  }}>
                  <Text style={[styles.buttonText]}>{'APPLY'}</Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  style={styles.Cancelbutton}
                  onPress={function() {
                    this.setState({
                      isOpenEditModal: false,
                      chosenNote: {},
                      memberIndex: 0,
                      memberName: '',
                      memberLastName: '',
                    });
                  }.bind(this)}>
                  <Text style={styles.buttonCancelText}>{'CANCEL'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
  dialogBack: {
    width: '90%',
    height: '60%',
    backgroundColor: 'white',
  },
  buttonCancelText: {
    textAlign: 'center',
    justifyContent: 'center',
    fontFamily: 'Lato-Bold',
    fontSize: 30 * scale,
    color: 'black',
  },
  Cancelbutton: {
    borderRadius: 65 * scale,
    marginBottom: 40 * scale,
    marginTop: 40 * scale,
    height: 90 * scale,
    width: 400 * scale,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  },
  modalBack: {
    alignItems: 'center',
    paddingTop: 200 * scale,
    backgroundColor: 'rgba(0,0,0,0.6)',
    height: WINDOW_HEIGHT,
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
}); /*}*/ /*
</View>
</View>
</View>
*/

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
