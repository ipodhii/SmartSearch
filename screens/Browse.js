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
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';

import {Card, Badge, Button, Block, Text} from '../components';
import {theme, mocks} from '../constants';
import Images from '../assets/Themes/Images';
import RNPickerSelect from 'react-native-picker-select';
const _ = require('lodash');

const {width} = Dimensions.get('window');
const scale = Dimensions.get('window').width / 750;
//const API_KEY = 'AIzaSyBec195_3M-GvCsL83hXSwQpaDmQruO3HU';
const API_KEY = 'AIzaSyA0fEDbq0A9WgBsIPuXWmCEjHdws32mSMs';

const RESTURANTS = 'restaurants';
const CULTURE = 'culture';
const SEARCH_PLACE = 'search place';

const TOURING_PLACES = 'point+of+interest';
import {countries as countriesOptions, googleApiData} from '../constants/mocks';
import ActionButton from 'react-native-action-button';
import cityTimezones from 'city-timezones';
import url from '../config/config';
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons';
import styled from 'styled-components';

const FULL_STAR = (
  <Image
    source={Images.fullStart}
    style={{width: 25 * scale, height: 25 * scale, tintColor: '#FEDC26'}}
  />
);
const DOWN_ARROW = (
  <Image
    source={Images.down}
    style={{width: 20 * scale, height: 20 * scale, tintColor: 'black'}}
  />
);

const CENTER_STYLE = {
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  flex: 1,
};

const LOADING = (
  <View style={CENTER_STYLE}>
    <ActivityIndicator size={'large'} animating={true} />
  </View>
);

function convertToJson(res) {
  if (!res) return res;
  return res.json();
}

const cOptions = countriesOptions.map(c => {
  return {label: c.name, value: c.code.toLowerCase()};
});
class Browse extends Component {
  state = {
    active: 'Restaurants',
    categories: this.props.categories,
    data: [],
    loading: true,
    country: 'il',
    city: '',
    searchText: '',
    countriesOptions: cOptions,
    isFilter: false,
    citiesOptions: [],
    countryObject: {},
    isSearch: false,
    page: 1,
    next: '',
    previous: '',
    dataDictionary: {},
    currentUrl: '',
    nextPageReference: '',
    isValidLoad: true,
  };

  async getAdvices(user, country) {
    let {city, active, isSearch} = this.state;
    let body = JSON.stringify({
      email: user.email,
      type: active,
      country,
      city: city.toLowerCase(),
      isSearch,
    });
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
      console.log('printAdvicessss', advices);
      return advices;
    } catch (err) {
      return [];
    }
  }
  getCityOptions(countryName) {
    const cities = cityTimezones.findFromCityStateProvince(countryName);
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
    console.log('printUseerrrrrr', user);
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
    let {countryObject, user, city} = this.state;
    let nextPageReference = '';
    console.log('printUserrrrrrcheck', JSON.stringify(user));
    try {
      let googleAdvices = await this.fetchData(searchType);
      if (googleAdvices && googleAdvices.next_page_token) {
        nextPageReference = googleAdvices.next_page_token;
      }
      googleAdvices = googleAdvices ? googleAdvices.results : [];

      let userAdvices = await this.getAdvices(
        user,
        this.isValidObject(countryObject)
          ? countryObject.label.toLowerCase()
          : '',
      );
      if (userAdvices && googleAdvices && googleAdvices.length) {
        console.log('printGoogleAdvices999999', JSON.stringify(googleAdvices));
        console.log('printGoogleAdvices888888', JSON.stringify(userAdvices));

        googleAdvices = googleAdvices.map(place => {
          if (userAdvices[place.id]) {
            // let userA = JSON.stringify(userAdvices[place.id]);
            place.userAdvices = _.cloneDeep(userAdvices[place.id]);
          }
          return place;
        });
      }

      this.setState({
        data: googleAdvices,
        loading: false,
        nextPageReference,
        isFilter: false,
        isValidLoad: googleAdvices.length ? true : false,
      });
    } catch (err) {
      console.log('errrrrrrrrrr', err);
    }
  };

  /**
   * get data by query from google places api
   */
  getCity() {
    let {city} = this.state;
    console.log('printCity', city);
    return city ? `in+${city}+` : ``;
  }
  getCountry() {
    let {countryObject} = this.state;
    console.log('printcountryObject', countryObject);
    return countryObject ? `region=${countryObject.label}&` : ``;
  }
  getSearch() {
    let {searchText, active} = this.state;
    return searchText ? searchText : active;
  }
  fetchData = async searchType => {
    console.log(
      'printsearchTypeCompare',
      searchType.toLowerCase(),
      SEARCH_PLACE,
      searchType.toLowerCase() === SEARCH_PLACE,
    );
    let url;
    let {searchText, country, city} = this.state;
    switch (searchType.toLowerCase()) {
      case 'restaurants':
        // url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=places+in+jerusalem+${RESTURANTS}&key=${API_KEY}`;
        //dynamic city and country
           url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=places+${this.getCity()}${RESTURANTS}&${this.getCountry()}key=${API_KEY}`;
        break;
      case 'touring places':
        //    url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=places+in+jerusalem+${TOURING_PLACES}&key=${API_KEY}`;
        //    url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=places+in+${city}+${TOURING_PLACES}&region=${country}&key=${API_KEY}`;
        //dynamic city and country
        url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=places+${this.getCity()}&${this.getCountry()}key=${API_KEY}`;

        break;
      case 'culture':
        //   url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=places+in+jerusalem+${CULTURE}&key=${API_KEY}`;
        //   url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=places+in+${city}+${CULTURE}&region=${country}&key=${API_KEY}`;

        //dynamic city and country
        url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=places+${this.getCity()}${TOURING_PLACES}&${this.getCountry()}key=${API_KEY}`;

        break;
      case SEARCH_PLACE:
        console.log('hehehehehehhehehehehe');
        //  let url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=places+in+jerusalem+israel+${searchText}&key=${API_KEY}`;
        //  let url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=places+in+${city}+${searchText}&region=${country}&key=${API_KEY}`;
        //dynamic city and country
        url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=places+${this.getCity()}${this.getSearch()}&${this.getCountry()}key=${API_KEY}`;

        break;
      default:
        //  url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=places+in+jerusalem+${RESTURANTS}&key=${API_KEY}`;
        //dynamic city and country
        url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=places+${this.getCity()}${RESTURANTS}&${this.getCountry()}key=${API_KEY}`;
        break;
    }
    console.log('printurllllll', url);
    this.setState({loading: true, currentUrl: url});
    return await fetch(url)
      .then(convertToJson)
      .catch(e => {
        console.log('printerrrrrrr', e);
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
        <Text size={16} gray4={!isActive} tertiary2={isActive} bold={isActive}>
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
            <Image style={styles.iconBlk} source={Images.search} />
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

  handlePrevious() {
    let {page, dataDictionary} = this.state;
    if (page > 1) {
      let data = dataDictionary[page];
      this.setState({data});
    }
  }
  async handleNext() {
    let {nextPageReference, currentUrl, data, user, countryObject} = this.state;
    console.log('printCurrentUrl1', currentUrl);

    try {
      currentUrl = `${currentUrl}&pagetoken=${nextPageReference}`;
      let googleAdvices = await fetch(currentUrl);
      googleAdvices = await convertToJson(googleAdvices);
      let nNextPageReference;
      if (googleAdvices && googleAdvices.next_page_token) {
        nNextPageReference = googleAdvices.next_page_token;
      }
      googleAdvices = googleAdvices ? googleAdvices.results : [];

      let userAdvices = await this.getAdvices(
        user,
        this.isValidObject(countryObject)
          ? countryObject.label.toLowerCase()
          : '',
      );
      if (userAdvices && googleAdvices && googleAdvices.length) {
        googleAdvices = googleAdvices.map(place => {
          if (userAdvices[place.id]) {
            // let userA = JSON.stringify(userAdvices[place.id]);
            place.userAdvices = _.cloneDeep(userAdvices[place.id]);
          }
          return place;
        });
      }
      data = [...data, ...googleAdvices];
      this.setState({
        data,
        loading: false,
        nextPageReference: nNextPageReference,
      });
    } catch (err) {
      console.log('errrrrrrrrrr', err);
    }

    /*
    if (nextPageReference !== '') {
      currentUrl = `${currentUrl}&pagetoken=${nextPageReference}`;
      console.log('printCurrentUrl12', currentUrl);
      await fetch(currentUrl)
        .then(convertToJson)
        .then(ndata => {
          console.log('printcheck', ndata.next_page_token);
          let nNextPageReference = ndata.next_page_token;
          console.log('printcheck122129', ndata);
          data = [...data, ...ndata];
          this.setState({
            data,
            nextPageReference: nNextPageReference,
          });
        })
        .catch(e => {
          console.log('errrrrrrr', e);
        });
    }
    */

    console.log('printnextPageReference', nextPageReference, currentUrl);
  }

  async componentWillReceiveProps(props) {
    console.log('testcomponentWillReceiveProps99999');
    let {tab} = this.state;
    let {user, active, loading} = this.state;
    if (!loading) {
      const res = await fetch(`${url}api/user?email=${user.email}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const nUser = await convertToJson(res);
      let userContactsMember = JSON.parse(nUser.userContactsMember);
      //init city options by country options
      let countryObject = this.state.countriesOptions.find(
        c => c.value === 'il',
      );

      let citiesOptions = this.getCityOptions(countryObject.label);
      this.getAdvices(user, countryObject.label.toLowerCase());
      this.setState(
        {countryObject, userContactsMember, citiesOptions, user: nUser},
        () => this.getData(active),
      );
    }
  }
  getImage(activeTab) {
    console.log('printactiveTab', activeTab);
    if (activeTab === RESTURANTS) {
      return Images.restaurants;
    }
    if (activeTab === 'touring places') {
      return Images.placeTouring;
    }
    if (activeTab === CULTURE) {
      return Images.culture;
    }
    return Images.restaurants;
  }
  headerBrowser() {
    const {profile, navigation} = this.props;
    const {
      categories,
      datamactive,
      active,
      data,
      country,
      loading,
      city,
      searchText,
      countryObject,
      isValidLoad,
    } = this.state;
    const tabs = ['Restaurants', 'Touring places', 'Culture'];
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Container>
          <StatusBar barStyle="light-content" />
          <RecipeBackground source={this.getImage(active.toLowerCase())}>
            <SafeAreaView>
              <MenuBar>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Menu', {
                      user: navigation.getParam('user'),
                    })
                  }>
                  <Image source={Images.menu} style={styles.avatar} />
                </TouchableOpacity>
              </MenuBar>
              <MainRecipe>
                <TextT title heavy>
                  {active}
                </TextT>
                <Divider />
                <TextT address heavy>
                  {`Explore all over the world.`}
                </TextT>
              </MainRecipe>
            </SafeAreaView>
          </RecipeBackground>
          <RecipesContainer style={{zIndex: 444}}>
            <Recipes>
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
                    backgroundColor: '#000',
                    justifyContent: 'center',
                    borderRadius: 40,
                    alignItems: 'center',
                    shadowOffset: {width: 5, height: 9},
                    shadowColor: 'rgba(255,22,84,0.24)',
                    shadowOpacity: 10,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      !this.state.city || !this.state.country
                        ? Alert.alert(
                            'Filter error',
                            'Please fill coutry and city.',
                            [
                              {
                                text: 'OK',
                                onPress: () => {},
                              },
                            ],
                            {cancelable: false},
                          )
                        : this.setState({isFilter: true, loading: true}, () => {
                            this.getData(SEARCH_PLACE);
                          });
                    }}>
                    <TextT heavy style={{color: '#FEDC26'}}>
                      Filter
                    </TextT>
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

                  {!loading && data && data.length ? (
                    data.map(place => {
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
                                <Text
                                  style={[styles.itemMidText]}
                                  numberOfLines={1}>
                                  {place.userAdvices ? FULL_STAR : null}
                                  {`${place.name}`}
                                </Text>

                                <View
                                  style={styles.itemMidDescriptionContainer}>
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
                  ) : !isValidLoad ? (
                    <Text
                      style={{
                        color: 'rgba(200, 0, 0, 0.8)',
                        textAlign: 'center',
                      }}>
                      No data
                    </Text>
                  ) : (
                    LOADING
                  )}
                </Block>
                <Block center>
                  <View
                    style={{
                      flexDirection: 'row',
                      color: '3B2BE9',
                      height: 128 * scale,
                      alignItems: 'center',
                      fontWeight: 700,
                    }}>
                    {!loading && data && data.length > 2 ? (
                      <TouchableOpacity onPress={() => this.handleNext()}>
                        <Text h4 style={{color: '#000'}}>
                          {DOWN_ARROW} Load more
                        </Text>
                      </TouchableOpacity>
                    ) : null}
                  </View>
                </Block>
              </ScrollView>
            </Recipes>
          </RecipesContainer>
        </Container>
      </ScrollView>
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
      loading,
      city,
      searchText,
      countryObject,
    } = this.state;
    const tabs = ['Restaurants', 'Touring places', 'Culture'];
    console.log('printcountry', countryObject, country, city);
    return (
      <View style={{flex: 1}}>
        {this.headerBrowser()}
        <ActionButton
          buttonTextStyle={{color: '#FEDC26'}}
          buttonColor="#000"
          onPress={() => {
            navigation.navigate('Advice', {
              user: navigation.getParam('user'),
            });
          }}
        />
      </View>
    );
  }
}

Browse.defaultProps = {
  profile: mocks.profile,
  categories: mocks.categories,
};

export default Browse;

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
  margin: 64px 0 0 0;
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
    tintColor: 'white',
  },
  tabs: {
    borderBottomColor: theme.colors.blackFull,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: theme.sizes.base,
    marginHorizontal: theme.sizes.base * 2,
  },
  tab: {
    marginRight: theme.sizes.base * 2,
    paddingBottom: theme.sizes.base,
  },
  active: {
    borderBottomColor: theme.colors.blackFull,
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
