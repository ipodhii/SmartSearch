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
  Modal,
  Picker,
  AsyncStorage,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {Block, Text} from '../components';
import {theme} from '../constants';
import Images from '../assets/Themes/Images';
import url from '../config/config';
let jsgraphs = require('js-graph-algorithms');
const VALID_EMAIL = 'contact@react-ui-kit.com';
const VALID_PASSWORD = 'subscribe';
const scale = Dimensions.get('window').width / 750;

const TYPE_OPTIONS = [
  {label: 'Restaurants', value: 'Restaurants'},
  {label: 'Touring places', value: 'Touring places'},
  {label: 'Culture', value: 'Culture'},
  // { label: "Appliance status", value: "STATUS" },
];
const RATING_OPTIONS = [
  {label: '1', value: '1'},
  {label: '2', value: '2'},
  {label: '3', value: '3'},
  {label: '4', value: '4'},
  {label: '5', value: '5'},
  // { label: "Appliance status", value: "STATUS" },
];
const API_KEY = 'AIzaSyBec195_3M-GvCsL83hXSwQpaDmQruO3HU';

var WINDOW_HEIGHT = Dimensions.get('window').height;

function convertToJson(res) {
  if (!res) return res;
  return res.json();
}

export default class Advice extends Component {
  state = {
    placeName: 'the first station',
    description: '',
    rating: RATING_OPTIONS[0],
    city: '',
    country: '',
    type: TYPE_OPTIONS[0],
    modalVisible: false,
    loading: false,
    isErrorMsg: false,
    isSaveAdvice: false,
  };
  componentDidMount() {
    let {navigation} = this.props;
    this.setState({user: navigation.getParam('user')});
  }

  async getToken() {
    const token = await AsyncStorage.getItem('token');
    console.log('token', token);
  }

  findPlace() {
    let {placeName} = this.state;
    this.fetchData(placeName)
      .then(res => {
        //  let b=res.json()
        console.log('successfindplace', res.results);

        if (res.results[0] && res.results[0].name) {
          this.setState({
            isErrorMsg: false,
            modalVisible: false,
            placeName: res.results[0].name,
          });
        } else {
          this.setState({isErrorMsg: true});
        }
      })
      .catch(err => {
        console.log('errorfindplace', err);

        this.setState({isErrorMsg: true});
      });
  }
  fetchData = placeName => {
    let url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${placeName}&key=${API_KEY}`;
    return fetch(url).then(convertToJson);
  };
  toggleModal(modalVisible){
    this.setState({modalVisible});
  }

  render() {
    const {navigation} = this.props;
    const {
      modalVisible,
      isErrorMsg,
      placeName,
      description,
      rating,
      isSaveAdvice,
      city,
      country,
      type,
    } = this.state;
    console.log('orintState', this.state);
    return (
      <Block>
        <KeyboardAvoidingView style={styles.login}>
          <Block flex={false} row center space="between" style={styles.header}>
            <Text h1 bold>
              Advice Document
            </Text>
          </Block>

          <View
            style={{
              paddingLeft: 70 * scale,
              paddingRight: 70 * scale,
              paddingTop: 70 * scale,
            }}>
            <View style={styles.singleField}>
              <Picker
                onValueChange={type => {
                  return this.setState({type});
                }}
                style={[{width: '100%', height: 70 * scale}]}
                selectedValue={type}
                itemStyle={styles.titleStyle}>
                {TYPE_OPTIONS.map(item => (
                  <Picker.Item
                    key={item.label}
                    value={item}
                    label={item.label}
                  />
                ))}
              </Picker>
            </View>

            <View style={styles.singleField}>
              <Image
                style={styles.iconBlk}
                source={require('../assets/images/password_icon.png')}
              />
              <TextInput
                style={styles.textFiled}
                placeholder="City"
                underlineColorAndroid={'transparent'}
                placeholderTextColor="rgba(0,0,0,1)"
                value={city}
                onChangeText={city => this.setState({city})}
              />
            </View>

            <View style={styles.singleField}>
              <Image
                style={styles.iconBlk}
                source={require('../assets/images/password_icon.png')}
              />
              <TextInput
                style={styles.textFiled}
                placeholder="Country"
                underlineColorAndroid={'transparent'}
                placeholderTextColor="rgba(0,0,0,1)"
                value={country}
                onChangeText={country => this.setState({country})}
              />
            </View>

            <View style={styles.singleField}>
              <Image
                style={styles.iconBlk}
                source={require('../assets/images/email_icon.png')}
              />
              <TouchableOpacity
                onPress={() => {
                  console.log('printpress');
                  return this.toggleModal(true);
                }}>
                <TextInput
                  style={styles.textFiled}
                  placeholder="Place name"
                  editable={false}
                  keyboardType={'numeric'}
                  underlineColorAndroid={'transparent'}
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholderTextColor="rgba(0,0,0,1)"
                  label={'Place name'}
                  value={placeName}
                  //    onChangeText={(placeName) => this.setState({ placeName })}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.singleField}>
              <Image
                style={styles.iconBlk}
                source={require('../assets/images/email_icon.png')}
              />

              <TextInput
                style={styles.textFiled}
                placeholder="Description"
                keyboardType="email-address"
                underlineColorAndroid={'transparent'}
                autoCapitalize="none"
                autoCorrect={false}
                placeholderTextColor="rgba(0,0,0,1)"
                value={description}
                onChangeText={description => this.setState({description})}
              />
            </View>

            <View style={styles.singleField}>
              {/*  <Image style={styles.iconBlk}
                source={require('../assets/images/password_icon.png')} />
              <TextInput style={styles.textFiled}
                placeholder="Rating"
                underlineColorAndroid={'transparent'}
                placeholderTextColor="rgba(0,0,0,1)"
                value={rating}
                onChangeText={(rating) => this.setState({ rating })}
              />
            */}
              <Picker
                onValueChange={rating => {
                  return this.setState({rating});
                }}
                style={[{width: '100%', height: 70 * scale}]}
                selectedValue={rating}
                itemStyle={styles.titleStyle}>
                {RATING_OPTIONS.map(item => (
                  <Picker.Item
                    key={item.label}
                    value={item}
                    label={item.label}
                  />
                ))}
              </Picker>
            </View>

            {isSaveAdvice && (
              <View>
                <Text
                  style={{color: 'rgba(200, 0, 0, 0.8)', textAlign: 'center'}}>
                  Invalid place.
                </Text>
              </View>
            )}

            <View style={{marginTop: 60 * scale}} />
            <TouchableOpacity
              onPress={() => {
                let {user} = this.state;

                let body = JSON.stringify({
                  user: user.id,
                  phone: user.phone,
                  email: user.email,
                  placeName,
                  description,
                  rating: rating.value,
                  country,
                  city,
                  type: type.value,
                });
                this.getToken();

                fetch(`${url}api/advice`, {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: AsyncStorage.getItem('token'),
                  },
                  body,
                })
                  .then(res => {
                    console.log('printNewAdvice', res);
                    if (res.status !== 200) {
                      this.setState({isSaveAdvice: true});
                    } else {
                      this.setState({isSaveAdvice: false}, () =>
                        navigation.navigate('Browse'),
                      );
                    }
                  })
                  .catch(err => {
                    this.setState({isSaveAdvice: true});
                  });
                // navigation.navigate('SignUp')
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
                  Confirm
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>

        <Modal
          animationType={'slide'}
          visible={modalVisible}
          onRequestClose={function() {
            return this.toggleModal.bind(this)(false);
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
                {'Search place name'}
              </Text>

              <View style={styles.itemContainer}>
                <View
                  style={{
                    borderColor: '#E2E6E7',
                    borderWidth: 1 * scale,
                    width: '95%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TextInput
                    numberOfLines={1}
                    style={styles.itemInput}
                    onChangeText={placeName => this.setState({placeName})}
                    underlineColorAndroid={'transparent'}
                    value={placeName}
                    placeholder={'Insert place name'}
                  />
                </View>
              </View>

              {isErrorMsg ? (
                <Text
                  style={{
                    color: 'rgba(200, 0, 0, 0.8)',
                    textAlign: 'center',
                    marginBottom: 20,
                  }}>
                  Invalid place name.
                </Text>
              ) : null}
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
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  titleStyle: {
    fontFamily: 'Lato-Regular',
    fontSize: 68 * scale,
    //   paddingTop:20 * scale,
    //   paddingLeft:100*scale
  },
  itemContainer: {
    height: 98 * scale,
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingLeft: 40 * scale,
    paddingRight: 40 * scale,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    borderRadius: 65 * scale,
    marginBottom: 40 * scale,
    marginTop: 40 * scale,
    height: 90 * scale,
    width: 400 * scale,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: '#51B72B',
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
  buttonCancelText: {
    textAlign: 'center',
    justifyContent: 'center',
    fontFamily: 'Lato-Bold',
    fontSize: 30 * scale,
    color: 'black',
  },
  buttonText: {
    textAlign: 'center',
    justifyContent: 'center',
    fontFamily: 'Lato-Bold',
    fontSize: 30 * scale,
    color: 'white',
  },
  itemInput: {
    borderWidth: 0,
    width: 570 * scale,
    marginLeft: 30 * scale,
    fontFamily: 'Lato-Regular',
    fontSize: 30 * scale,
  },
  dialogBack: {
    width: '90%',
    height: '60%',
    backgroundColor: 'white',
  },
  modalBack: {
    alignItems: 'center',
    paddingTop: 200 * scale,
    backgroundColor: 'rgba(0,0,0,0.6)',
    height: WINDOW_HEIGHT,
  },
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
