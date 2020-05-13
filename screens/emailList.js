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
  Text,
  PermissionsAndroid,
} from 'react-native';

const CENTER_STYLE = {
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  flex: 1,
};
import Guid from 'uuid/v4';
import {Block} from '../components';

//import { Button, Block, Input } from '../components';
import Images from '../assets/Themes/Images';

//import {  styleFonts,sizeFonts,typeFonts } from '../assets/Themes/Fonts'

const scale = Dimensions.get('window').width / 750;

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
export default class EmailList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      contacts: [],
      errorMsg: false,
    };
  }

  componentDidMount() {
    this.setState({contacts: this.props.userContactsMember, isLoading: false});
  }

  render() {
    let {contacts, errorMsg, isLoading} = this.state;
    console.log('orintcontacts', contacts);
    if (isLoading) {
      return LOADING;
    }

    return (
      <Block>
        <ScrollView>
          <View>
            {/* <View style={[styles.sectionSeperator]}/>*/}
            {contacts && contacts.length > 0
              ? contacts.map(
                  function(member, index) {
                    if (!member || !member.phoneNumbers[0]) return;
                    return (
                      <View style={[styles.itemContainerV2]} key={Guid()}>
                        <TouchableOpacity
                          onLongPress={() => {
                            console.log('press');
                          }}>
                          <View>
                            <View>
                              <View style={[styles.itemContainer]}>
                                <View style={styles.itemIconContainer}>
                                  <View style={styles.itemIconBackground}>
                                    {pdu}
                                  </View>
                                </View>

                                <View style={styles.itemMidContainer}>
                                  <Text style={styles.itemMidText}>
                                    {`${
                                      member.givenName
                                        ? member.givenName.replace(/\s/g, '')
                                        : ''
                                    } ${
                                      member.familyName
                                        ? member.familyName.replace(/\s/g, '')
                                        : ''
                                    }`}
                                  </Text>
                                  <View
                                    style={styles.itemMidDescriptionContainer}>
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
              : LOADING}
          </View>

          {errorMsg && (
            <View>
              <Text
                style={{color: 'rgba(200, 0, 0, 0.8)', textAlign: 'center'}}>
                No contact members.
              </Text>
            </View>
          )}
          <View style={{marginTop: 60 * scale}} />
        </ScrollView>
      </Block>
    );
  }
}
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
    backgroundColor: '#05f2b3',
    flexDirection: 'row',
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
});
