import React, {Component} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  TextInput,
  Picker,
} from 'react-native';

import {Card, Badge, Button, Block, Text} from '../components';
import {theme, mocks} from '../constants';
import Images from '../assets/Themes/Images';
import RNPickerSelect from 'react-native-picker-select';

let jsgraphs = require('js-graph-algorithms');
const {width} = Dimensions.get('window');
const scale = Dimensions.get('window').width / 750;
const API_KEY = 'AIzaSyBec195_3M-GvCsL83hXSwQpaDmQruO3HU';
const RESTURANTS = 'resturants';
const CULTURE = 'culture';
const SEARCH_PLACE = 'search place';

const TOURING_PLACES = 'point+of+interest';
import {countries as countriesOptions} from '../constants/mocks';
import ActionButton from 'react-native-action-button';

const pdu = (
  <Image
    source={Images.contactMem}
    style={{width: 55 * scale, height: 55 * scale, tintColor: 'white'}}
  />
);

function convertToJson(res) {
  if (!res) return res;
  return res.json();
}

const cOptions = countriesOptions.map(c => {
  return {label: c.name, value: c.name};
});
console.log('countries', countriesOptions);
class Browse extends Component {
  state = {
    active: 'Restaurants',
    categories: this.props.categories,
    data: [],
    loading: false,
    country: 'Israel',
    city: 'jerusalem',
    searchText: '',
    countriesOptions: cOptions,
  };

  //get data from google
  componentDidMount() {
    //  this.setState({ categories: this.props.categories });
    let {navigation} = this.props;
    let user = navigation.getParam('user');
    let userContactsMember = JSON.parse(user.userContactsMember);
    this.setState({userContactsMember}, () => this.getData());
  }

  getData = () => {
    let {active} = this.state;
    this.fetchData(active).then(res => {
      this.setState({data: res});
    });
  };


  fetchData = async searchType => {
    let url;
    switch (searchType.toLowerCase()) {
      case RESTURANTS:
        //  url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=places+in+jerusalem+${RESTURANTS}&key=${API_KEY}`;
        break;
      case TOURING_PLACES:
        //    url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=places+in+jerusalem+${TOURING_PLACES}&key=${API_KEY}`;
        break;
      case CULTURE:
        //   url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=places+in+jerusalem+${CULTURE}&key=${API_KEY}`;
        break;
      case CULTURE:
            //   url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=places+in+jerusalem+${CULTURE}&key=${API_KEY}`;
            break;
      default:
        let placeName=searchType;
      //  let url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${placeName}&key=${API_KEY}`;
        break;
    }
    this.setState({loading: true});
    return await fetch(url)
      .then(convertToJson)
      .catch(e => console.log('errororororororor', e));
  };

  handleTab = tab => {
    const {categories} = this.props;
    const filtered = categories.filter(category =>
      category.tags.includes(tab.toLowerCase()),
    );
    console.log('printTabbbbbb', tab);
    this.setState({active: tab, categories: filtered, data: []}, () =>
      this.getData(tab),
    );
  };

  renderTab(tab) {
    const {active} = this.state;
    const isActive = active === tab;

    return (
      <TouchableOpacity
        key={`tab-${tab}`}
        onPress={() => this.handleTab(tab)}
        style={[styles.tab, isActive ? styles.active : null]}>
        <Text size={16} medium gray={!isActive} secondary={isActive}>
          {tab}
        </Text>
      </TouchableOpacity>
    );
  }
  renderRestaurants(strSearch) {
    let {data} = this.state;
    // console.log("printData",data.results);
    data && data.results
      ? data.results.map(place => {
          //    console.log("printPlace",place);
          return (
            <View>
              <View>
                <View style={[styles.itemContainer]}>
                  <View style={styles.itemIconContainer}>
                    <View style={styles.itemIconBackground}>{pdu}</View>
                  </View>

                  <View style={styles.itemMidContainer}>
                    <Text style={styles.itemMidText}>{`${place.name}`}</Text>
                    <View style={styles.itemMidDescriptionContainer}>
                      <Text style={{color: '#6F7374'}}>
                        {place.formatted_address}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.itemRightContainer}>{place.rating}</View>
                </View>
              </View>
              <View style={[styles.sectionSeperator]} />
            </View>
          );
        })
      : null;
  }

  renderSearch() {
    return (
      <View style={{paddingLeft: 60 * scale, paddingRight: 60 * scale}}>
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
            value={this.state.searchText}
            onChangeText={searchText => this.setState({searchText})}
            //  ref={input => (this.passwordInput = input)}
          />
        </View>
      </View>
    );
  }
  render() {
    const {profile, navigation} = this.props;
    const {
      categories,
      datamactive,
      active,
      data,
      country,
      searchText,
    } = this.state;
    const tabs = ['Restaurants', 'Touring places', 'Culture'];

    console.log('printsearchText', searchText, active);
    return (
      <Block>
        <Block flex={false} row center space="between" style={styles.header}>
          <Text h1 bold>
            Browse
          </Text>
          <Button
            onPress={() =>
              navigation.navigate('Settings', {
                user: navigation.getParam('user'),
              })
            }>
            <Image source={Images.menu} style={styles.avatar} />
          </Button>
        </Block>

        <Block flex={false} row style={styles.tabs}>
          {tabs.map(tab => this.renderTab(tab))}
        </Block>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <View style={{width: '40%'}}>
            <RNPickerSelect
              placeholder={{label: 'country', value: ''}}
              onValueChange={country => this.setState({country})}
              items={this.state.countriesOptions}
            />
          </View>
          <View style={{width: '40%'}}>
            <RNPickerSelect
              placeholder={{label: 'city', value: ''}}
              onValueChange={country => this.setState({country})}
              items={this.state.countriesOptions}
            />
          </View>
        </View>

        {this.renderSearch()}

        <ScrollView
          showsVerticalScrollIndicator={false}
          // style={{ paddingVertical: theme.sizes.base * 2}}
        >
          <Block>
            {categories.map(category => (
              <TouchableOpacity
                key={category.name}
                onPress={() =>
                  navigation.navigate('Explore', {category})
                }></TouchableOpacity>
            ))}

            {data && data.results
              ? data.results.map(place => {
                  // console.log("printPlace",place);
                  return (
                    <Block>
                      <View style={[styles.itemContainer]}>
                        <View style={styles.itemMidContainer}>
                          <Text style={styles.itemMidText}>
                            {`${place.name}`}
                          </Text>
                          <View style={styles.itemMidDescriptionContainer}>
                            <Text
                              style={{
                                color: '#6F7374',
                                marginLeft: 80 * scale,
                              }}>
                              {/*place.formatted_address*/}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.itemRightContainer}>
                          <Text> {place.rating}</Text>
                        </View>
                      </View>
                      <View style={[styles.sectionSeperator]} />
                    </Block>
                  );
                })
              : null}
          </Block>
        </ScrollView>

        <ActionButton
          buttonColor="#2BDA8E"
          onPress={() => {
            navigation.navigate('Advice', {user: navigation.getParam('user')});
          }}
        />
      </Block>
    );
  }
}

Browse.defaultProps = {
  profile: mocks.profile,
  categories: mocks.categories,
};

export default Browse;

const styles = StyleSheet.create({
  titleStyle: {
    fontFamily: 'Lato-Regular',
    fontSize: 68 * scale,
    //   paddingTop:20 * scale,
    //   paddingLeft:100*scale
  },
  sectionSeperator: {
    height: 2 * scale,
    width: 750 * scale,
    backgroundColor: '#F5F5F5',
  },
  itemContainer: {
    height: 128 * scale,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  itemIconContainer: {
    width: 168 * scale,
    alignItems: 'center',
    justifyContent: 'center',
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
  itemMidText: {
    color: 'black',
    // marginTop:  * scale,
    fontWeight: 'bold',
    marginLeft: 80 * scale,
    marginTop: 30 * scale,
  },
  itemMidDescriptionContainer: {
    flexDirection: 'row',
    // marginLeft:40*scale,
    //  marginBottom: 10 * scale,
    width: 'auto',
    color: '#F7F7F7',
  },
  itemRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'absolute',
    right: 0,
    top: 50 * scale,
    marginRight: 60 * scale,
    // marginLeft: 80 * scale
  },
  iconBlk: {
    width: 18,
    height: 16,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  singleField: {
    flexDirection: 'row',
    //  justifyContent: 'center',
    // alignItems: 'center',
    alignSelf: 'stretch',
    marginBottom: 15,
    borderColor: '#e7edef',
    borderBottomWidth: 1,
  },
  header: {
    paddingHorizontal: theme.sizes.base * 2,
  },
  avatar: {
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2,
  },
  tabs: {
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: theme.sizes.base,
    marginHorizontal: theme.sizes.base * 2,
  },
  tab: {
    marginRight: theme.sizes.base * 2,
    paddingBottom: theme.sizes.base,
  },
  active: {
    borderBottomColor: theme.colors.secondary,
    borderBottomWidth: 3,
  },
  categories: {
    flexWrap: 'wrap',
    paddingHorizontal: theme.sizes.base * 2,
    marginBottom: theme.sizes.base * 3.5,
  },
  category: {
    // this should be dynamic based on screen width
    minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
  },
});
