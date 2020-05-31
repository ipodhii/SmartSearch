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
} from 'react-native';
import Slider from 'react-native-slider';
import EmailList from './emailList';
import {Divider, Button, Block, Text, Switch} from '../components';
import {theme, mocks} from '../constants';
import Guid from 'uuid/v4';
import Images from '../assets/Themes/Images';
import url from '../config/config';

const scale = Dimensions.get('window').width / 750;
const MAX_NOTIFICATION = 2;
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
const CENTER_STYLE = {
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  flex: 1,
};
class Settings extends Component {
  state = {
    budget: 850,
    monthly: 1700,
    notifications: true,
    newsletter: false,
    editing: null,
    profile: {},
    modalVisible: false,
    userContactsMember: [],
    phone: '',
    isPassMaxNotification: false,
    password: 'ifyouwantchange',
  };

  componentDidMount() {
    const {navigation} = this.props;
    let user = navigation.getParam('user');
    console.log('printuser', user);
    let phone = user.phone;
    let userContactsMember = JSON.parse(user.userContactsMember);
    this.setState({profile: this.props.profile, userContactsMember, phone});
  }

  handleEdit(name, text) {
    const {profile} = this.state;
    profile[name] = text;

    this.setState({profile});
  }

  toggleEdit(name) {
    const {editing, password} = this.state;
    if (editing === 'location' && password && password.length > 5) {
      this.setState({editing: !editing ? name : null});
    } else if (editing === 'Edit' || !editing) {
      this.setState({editing: !editing ? name : null, password: ''});
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
  showMailOption() {
    let {modalVisible} = this.state;
    return (
      <Modal
        animationType={'slide'}
        visible={modalVisible}
        onRequestClose={function() {
          return this.toggleModal.bind(this)(false);
        }.bind(this)}>
        <View style={[styles.modalBack]}>
          <View style={[styles.dialogBack]}>
            <EmailList />
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  console.log('press confirm');
                  this.findPlace();
                }}>
                <Text style={styles.buttonText}>{'APPLY'}</Text>
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
                  this.setState({modalVisible: false, placeName: ''});
                }.bind(this)}>
                <Text style={styles.buttonCancelText}>{'CANCEL'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  showContactsMember() {
    let {userContactsMember} = this.state;
    console.log('checkuserContactsMember222', userContactsMember);
    return userContactsMember && userContactsMember.length > 0 ? (
      userContactsMember.map(
        function(member, index) {
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

                  <View style={[styles.sectionSeperator]} />
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
    const {profile, editing, notifications, phone, password} = this.state;
    const {navigation} = this.props;
    console.log('printpassword', password);
    return (
      <Block>
        <Block flex={false} row center space="between" style={styles.header}>
          <View style={{marginTop: 20 * scale}}>
            <Text h1 bold>
              Settings
            </Text>
          </View>
        </Block>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Block style={styles.inputs}>
            <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
              <Block>
                <Text gray2 style={{marginBottom: 10}}>
                  E-mail
                </Text>
                <Text bold>amitdanonmail@gmail.com</Text>
              </Block>
            </Block>

            <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
              <Block>
                <Text gray2 style={{marginBottom: 10}}>
                  Phone number
                </Text>
                <Text bold>{phone}</Text>
              </Block>
            </Block>
            <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
              <Block>
                <Text gray2 style={{marginBottom: 10}}>
                  Password
                </Text>
                <TextInput
                  style={styles.textFiled}
                  underlineColorAndroid={'transparent'}
                  placeholderTextColor="rgba(0,0,0,1)"
                  secureTextEntry
                  onChangeText={password => this.setState({password})}
                  value={password}
                />
              </Block>
              <Text
                medium
                secondary
                onPress={() => this.toggleEdit('location')}>
                {editing === 'location' ? 'Save' : 'Edit'}
              </Text>
            </Block>

            <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
              <TouchableOpacity
                onPress={() => {
                  console.log('presssss');
                  navigation.navigate('Chat', {
                    user: navigation.getParam('user'),
                  });
                }}>
                <Block>
                  <Text secondary style={{marginBottom: 10}}>
                    Enter chat room
                  </Text>
                </Block>
              </TouchableOpacity>
            </Block>
          </Block>

          <Divider margin={[theme.sizes.base, theme.sizes.base * 2]} />

          <Block style={styles.toggles}>
            <Block
              row
              center
              space="between"
              style={{marginBottom: theme.sizes.base * 2}}>
              <Text gray2>Notifications</Text>
              <Switch
                value={this.state.notifications}
                onValueChange={value => this.setState({notifications: value})}
              />
            </Block>
            {notifications ? (
              <Text h6 secondary>
                Long press on member will notify you when the member wrote a
                advice.
              </Text>
            ) : null}
            {notifications ? this.showContactsMember() : null}
          </Block>
        </ScrollView>
      </Block>
    );
  }
}

Settings.defaultProps = {
  profile: mocks.profile,
};

export default Settings;

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
    backgroundColor: 'white',
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
