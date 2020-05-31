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
const _ = require('lodash');

let jsgraphs = require('js-graph-algorithms');
const {width} = Dimensions.get('window');
const scale = Dimensions.get('window').width / 750;
const API_KEY = 'AIzaSyBec195_3M-GvCsL83hXSwQpaDmQruO3HU';
const NAPI_KEY = 'AIzaSyA0fEDbq0A9WgBsIPuXWmCEjHdws32mSMs';
const RESTURANTS = 'resturants';
const CULTURE = 'culture';
const SEARCH_PLACE = 'search place';

const TOURING_PLACES = 'point+of+interest';
import {countries as countriesOptions, googleApiData} from '../constants/mocks';
import ActionButton from 'react-native-action-button';
import cityTimezones from 'city-timezones';
import url from '../config/config';
import StarRating from 'react-native-star-rating';

const pdu = (
  <Image
    source={Images.contactMem}
    style={{width: 55 * scale, height: 55 * scale, tintColor: 'white'}}
  />
);
const fullStart = (
  <Image
    source={Images.fullStart}
    style={{width: 25 * scale, height: 25 * scale, tintColor: '#51B72B'}}
  />
);
const emptyStart = (
  <Image
    source={Images.emptyStart}
    style={{width: 55 * scale, height: 55 * scale}}
  />
);
function convertToJson(res) {
  if (!res) return res;
  return res.json();
}

const cOptions = countriesOptions.map(c => {
  return {label: c.name, value: c.code.toLowerCase()};
});
console.log('countries', cOptions);
class Browse extends Component {
  state = {
    active: 'Restaurants',
    categories: this.props.categories,
    data: [],
    loading: false,
    country: 'il',
    city: '',
    searchText: '',
    countriesOptions: cOptions,
    isFilter: false,
    citiesOptions: [],
    countryObject: {},
    isSearch: false,
  };

  async getAdvices(user, country) {
    let {city, active} = this.state;
    let body = JSON.stringify({
      email: user.email,
      type: active,
      country,
      city,
    });
    console.log('printqueries', user.email, active, country, city);
    try {
      let advices = await fetch(`${url}api/useradvices`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body,
      });
      advices = await convertToJson(advices);
      console.log('9999printadvicessssss', advices);
      return advices;
    } catch (err) {
      return [];
    }
  }
  getCityOptions(countryName) {
    const cities = cityTimezones.findFromCityStateProvince(countryName);
    console.log('printcities', countryName, cities);
    let citiesOptions = [];
    cities.map(cityData => {
      citiesOptions.push({label: cityData.city, value: cityData.city});
    });
    return citiesOptions;
  }
  //get data from google
  componentDidMount() {
    //  this.setState({ categories: this.props.categories });
    let {navigation} = this.props;
    let {active} = this.state;
    let user = navigation.getParam('user');
    let userContactsMember = JSON.parse(user.userContactsMember);
    //init city options by country options
    let countryObject = this.state.countriesOptions.find(c => c.value === 'il');

    let citiesOptions = this.getCityOptions(countryObject.label);
    this.getAdvices(user, countryObject.label.toLowerCase());
    this.setState(
      {countryObject, userContactsMember, citiesOptions, user},
      () => this.getData(active),
    );
  }

  isValidObject(countryObject) {
    return countryObject !== undefined;
  }
  getData = async searchType => {
    let {countryObject, user} = this.state;
    try {
      let googleAdvices = await this.fetchData(searchType);
      googleAdvices = googleAdvices ? googleAdvices.results : [];
      let userAdvices = await this.getAdvices(
        user,
        this.isValidObject(countryObject)
          ? countryObject.label.toLowerCase()
          : '',
      );

      let advices = [...userAdvices, ...googleAdvices];
      console.log('printdata', advices);

      this.setState({data: advices});
    } catch (err) {
      console.log('errrrrrrrrrr', err);
    }
  };
  /**
   * get data by query from google places api
   */
  fetchData = async searchType => {
    console.log('printsearchType', searchType);
    let url;
    let {searchText, country, city} = this.state;
    switch (searchType.toLowerCase()) {
      case RESTURANTS:
        //  url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=places+in+jerusalem+${RESTURANTS}&key=${API_KEY}`;
        //dynamic city and country
        //  url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=places+in+${city}+${RESTURANTS}&region=${country}&key=${API_KEY}`;

        break;
      case TOURING_PLACES:
        //    url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=places+in+jerusalem+${TOURING_PLACES}&key=${API_KEY}`;
        //dynamic city and country
        //    url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=places+in+${city}+${TOURING_PLACES}&region=${country}&key=${API_KEY}`;
        break;
      case CULTURE:
        //   url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=places+in+jerusalem+${CULTURE}&key=${API_KEY}`;
        //dynamic city and country
        //   url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=places+in+${city}+${CULTURE}&region=${country}&key=${API_KEY}`;
        break;
      case SEARCH_PLACE:
        //  let url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=places+in+jerusalem+israel+${searchText}&key=${API_KEY}`;
        //dynamic city and country
        //  let url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=places+in+${city}+israel+${searchText}&region=${country}&key=${API_KEY}`;
        break;
      default:
        //  url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=places+in+jerusalem+${RESTURANTS}&key=${API_KEY}`;
        break;
    }

    this.setState({loading: true});
    return await fetch(url)
      .then(convertToJson)
      .catch(e => {
        if (!url) {
          url = googleApiData;
        }
        return url;
      });
  };

  handleTab = tab => {
    const {categories} = this.props;
    const filtered = categories.filter(category =>
      category.tags.includes(tab.toLowerCase()),
    );
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
        <Text size={16} medium gray={!isActive} tertiary={isActive}>
          {tab}
        </Text>
      </TouchableOpacity>
    );
  }

  handleSearch(searchText) {
    let isSearcEmpty = searchText !== '' || !searchText ? true : false;
    this.setState({searchText, isSearch: isSearcEmpty});
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
            onChangeText={searchText => this.handleSearch(searchText)}
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

    console.log(
      'printsearchText',
      this.state.country,
      this.state.city,
      this.state.active,
    );
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
              value={this.state.country}
              placeholder={{label: 'country', value: ''}}
              onValueChange={country => {
                let countryObject = this.state.countriesOptions.find(
                  c => c.value === country,
                );
                console.log('printcountryyyy999', country, countryObject);

                let nCityOptions = this.isValidObject(countryObject)
                  ? this.getCityOptions(countryObject.label)
                  : [];
                this.setState({
                  countryObject: this.isValidObject(countryObject)
                    ? countryObject
                    : '',
                  country: this.isValidObject(country) ? country : '',
                  citiesOptions: nCityOptions,
                  city: '',
                });
              }}
              items={this.state.countriesOptions}
            />
          </View>
          <View style={{width: '32%', color: '3B2BE9'}}>
            <RNPickerSelect
              value={this.state.city}
              style={{color: '3B2BE9', backgroundColor: '3B2BE9'}}
              useNativeAndroidPickerStyle={{
                color: '3B2BE9',
                backgroundColor: '3B2BE9',
              }}
              placeholder={{label: 'city', value: ''}}
              onValueChange={city => this.setState({city})}
              items={this.state.citiesOptions}
              disabled={!this.state.country ? true : false}
            />
          </View>

          <View
            style={{
              width: '12%',
              height: 50,
              // height: '60%',
              backgroundColor: '#3B2BE9',
              //  marginTop: '4%',
              justifyContent: 'center',

              alignItems: 'center',
              borderRadius: 40,
              shadowOpacity: 30,
            }}>
            <TouchableOpacity
              onPress={() =>
                this.setState({isFilter: true}, () => {
                  this.getData(SEARCH_PLACE);
                })
              }>
              <Text white center>
                Filter
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {this.renderSearch()}

        <ScrollView
          showsVerticalScrollIndicator={false}
          // style={{ paddingVertical: theme.sizes.base * 2}}
        >
          <Block>
            {/*categories.map(category => (
              <TouchableOpacity
                key={category.name}
                onPress={() =>
                  navigation.navigate('Explore', {category})
                }></TouchableOpacity>
              ))*/}

            {data && data.length
              ? data.map(place => {
                  console.log('printPlace', place);
                  return (
                    <Block>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('Explore', {
                            user: navigation.getParam('user'),
                            place,
                          })
                        }>
                        <View style={[styles.itemContainer]}>
                          <View style={[styles.itemMidContainer]}>
                            <Text style={[styles.itemMidText]}>
                              {place.placeName ? fullStart : null}
                              {`${place.name ? place.name : place.placeName}`}
                            </Text>

                            <View style={styles.itemMidDescriptionContainer}>
                              <Text
                                numberOfLines={1}
                                style={{
                                  color: '#6F7374',
                                  marginLeft: 80 * scale,
                                }}>
                                {this.isValidObject(place.formatted_address)
                                  ? place.formatted_address
                                  : 'n/a'}
                              </Text>
                            </View>
                          </View>
                          <View style={styles.itemRightContainer}>
                            <StarRating
                              disabled={false}
                              maxStars={5}
                              rating={place.rating}
                              starSize={20}
                            />
                          </View>
                        </View>
                        <View style={[styles.sectionSeperator]} />
                      </TouchableOpacity>
                    </Block>
                  );
                })
              : null}
          </Block>
          <Block center>
            <View style={{width: '32%', color: '3B2BE9'}}>
              <RNPickerSelect
                value={this.state.city}
                style={{color: '3B2BE9', backgroundColor: '3B2BE9'}}
                useNativeAndroidPickerStyle={{
                  color: '3B2BE9',
                  backgroundColor: '3B2BE9',
                }}
                placeholder={{label: 'city', value: ''}}
                onValueChange={city => this.setState({city})}
                items={this.state.citiesOptions}
                disabled={!this.state.country ? true : false}
              />
            </View>
          </Block>
        </ScrollView>

        <ActionButton
          buttonColor="#51B72B"
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
    top: 46 * scale,
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
