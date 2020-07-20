//myproject explore backup
import React, {Component} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';

import Icon from 'react-native-vector-icons';
import styled from 'styled-components';

import {Button, Input, Block, Text} from '../components';
import Images from '../assets/Themes/Images';

import {theme, mocks} from '../constants';

const {width, height} = Dimensions.get('window');
const scale = Dimensions.get('window').width / 750;
//const API_KEY = 'AIzaSyBec195_3M-GvCsL83hXSwQpaDmQruO3HU';
const API_KEY = 'AIzaSyA0fEDbq0A9WgBsIPuXWmCEjHdws32mSMs';

const SIZE = 400;
import Carousel from 'react-native-snap-carousel';
import Slider from 'react-native-slider';

import MapView, {Marker, Callout, Circle} from 'react-native-maps';
import StarRating from 'react-native-star-rating';

const ENTRIES1 = [
  {
    title: 'Beautiful and dramatic Antelope Canyon',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
    illustration: 'https://i.imgur.com/UYiroysl.jpg',
  },
  {
    title: 'Earlier this morning, NYC',
    subtitle: 'Lorem ipsum dolor sit amet',
    illustration: 'https://i.imgur.com/UPrs1EWl.jpg',
  },
  {
    title: 'White Pocket Sunset',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
    illustration: 'https://i.imgur.com/MABUbpDl.jpg',
  },
  {
    title: 'Acrocorinth, Greece',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
    illustration: 'https://i.imgur.com/KZsmUi2l.jpg',
  },
  {
    title: 'The lone tree, majestic landscape of New Zealand',
    subtitle: 'Lorem ipsum dolor sit amet',
    illustration: 'https://i.imgur.com/2nCt3Sbl.jpg',
  },
  {
    title: 'Middle Earth, Germany',
    subtitle: 'Lorem ipsum dolor sit amet',
    illustration: 'https://i.imgur.com/lceHsT6l.jpg',
  },
];

const FULL_STAR = (
  <Image
    source={Images.fullStart}
    style={{width: 25 * scale, height: 25 * scale, tintColor: '#51B72B'}}
  />
);
const recepies = [
  {
    name: 'a1',
    info: 'blabla',
    image: {},
  },
  {
    name: 'a1',
    info: 'blabla',
    image: {},
  },
  {
    name: 'a1',
    info: 'blabla',
    image: {},
  },
];
function convertToJson(res) {
  if (!res) return res;
  return res.json();
}
class Explore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      siteTitle: '',
      place: '',
      img: '',
      googleAdvices: [],
      expandDictionary: {},
      contactsMembersDictionary: {},
    };
  }

  async fetchData() {
    let {place} = this.state;

    let urlImage = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${SIZE}&photoreference=${place.photos[0].photo_reference}&sensor=false&key=${API_KEY}`;
    let urlAdvices = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=name,rating,reviews&key=${API_KEY}`;

    console.log('fetchData');
    try {
      let image = await fetch(urlImage);
      let advices = await fetch(urlAdvices);
      advices = await convertToJson(advices);
      console.log('printadvicesadvices', advices);
      this.setState({img: image.url, googleAdvices: advices.result.reviews});

      /*
      let advices = mocks.reviews;
      console.log('printadvicesadvices99', advices.result.reviews);
      this.setState({googleAdvices: advices.result.reviews});
      */
    } catch (e) {
      console.log('printerrrrexplore', e);
    }
  }

  componentWillMount() {
    let {navigation} = this.props;
    let place = navigation.getParam('place');
    console.log('99printplaaaaccceeee', place);
    this.setState({place}, () => this.fetchData());
  }
  handleExpand(index) {
    let {expandDictionary} = this.state;
    expandDictionary[index] = !expandDictionary[index]
      ? true
      : !expandDictionary[index];
    this.setState({expandDictionary});
  }
  handleContactsExpand(index) {
    let {contactsMembersDictionary} = this.state;
    contactsMembersDictionary[index] = !contactsMembersDictionary[index]
      ? true
      : !contactsMembersDictionary[index];
    this.setState({contactsMembersDictionary});
  }

  getMemberDetails(member) {
    let {navigation} = this.props;
    let user = navigation.getParam('user');
    let userContactsMember = JSON.parse(user.userContactsMember);
    let res = userContactsMember.find(m => m.phone === member.phone);
    console.log('getMemberDetails', res);
    let name = res.name ? res.name : null;
    let lastName = res.lastName ? res.lastName : null;
    let textRes = '';
    if (name) textRes += `${name} `;
    if (lastName) textRes += `${lastName}`;
    return textRes;
  }
  render() {
    let {
      place,
      googleAdvices,
      expandDictionary,
      contactsMembersDictionary,
    } = this.state;
    console.log('printState', place.icon);

    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Container>
          <StatusBar barStyle="light-content" />
          <RecipeBackground source={{uri: this.state.img}}>
            <SafeAreaView>
              <MainRecipe>
                <TextT title heavy>
                  {place.name}
                </TextT>
                <Divider />
                <TextT address bold>
                  {place.formatted_address}
                </TextT>
              </MainRecipe>
              <View style={{flexDirection: 'row'}}>
                {place && place.types
                  ? place.types.map(tag => (
                      <ButtonT key={`tag-${tag}`}>
                        <TextT bold small>
                          {tag}
                        </TextT>
                      </ButtonT>
                    ))
                  : null}
              </View>
            </SafeAreaView>
          </RecipeBackground>
          <RecipesContainer style={{zIndex: 444}}>
            <Text h6 secondary style={{marginBottom: 25 * scale}}>
              For full description please press on relevant reviews
            </Text>
            <DividerRecepies />
            <TextT dark heavy>
              Contacts mebmers reviews
            </TextT>

            <Recipes>
              {place.userAdvices && place.userAdvices.length ? (
                place.userAdvices.map((place, index) => {
                  console.log('printplaaaace', place);
                  // this.getMemberDetails(place);
                  return (
                    <View>
                      <TouchableOpacity
                        onPress={() => this.handleContactsExpand(index)}>
                        <View
                          style={[
                            styles.itemContainer,
                            contactsMembersDictionary[index]
                              ? {height: 'auto'}
                              : {height: 128 * scale},
                          ]}>
                          <View style={[styles.itemMidContainer]}>
                            <Text
                              style={[styles.itemMidText, {textAlign: 'left'}]}
                              numberOfLines={1}>
                              {this.getMemberDetails(place)}
                              {FULL_STAR}
                            </Text>

                            <View style={styles.itemMidDescriptionContainer}>
                              <Text
                                numberOfLines={
                                  contactsMembersDictionary[index] ? 100000 : 1
                                }
                                style={{
                                  color: '#6F7374',
                                  //  marginLeft: 80 * scale,
                                }}>
                                {place.description}
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
                      </TouchableOpacity>
                    </View>
                  );
                })
              ) : (
                <Text>None</Text>
              )}
            </Recipes>
          </RecipesContainer>
          <RecipesContainer style={{zIndex: 444}}>
            <DividerRecepies />

            <View>
              <TextT dark heavy>
                Google reviews
              </TextT>
            </View>

            <Recipes>
              {googleAdvices && googleAdvices.length ? (
                googleAdvices.map((place, index) => {
                  console.log('printplaaaace', place);
                  return (
                    <View>
                      <TouchableOpacity
                        onPress={() => this.handleExpand(index)}>
                        <View
                          style={[
                            styles.itemContainer,
                            expandDictionary[index]
                              ? {height: 'auto'}
                              : {height: 128 * scale},
                          ]}>
                          <View style={[styles.itemMidContainer]}>
                            <Text
                              style={[styles.itemMidText]}
                              numberOfLines={1}>
                              {place.author_name || 'n/a'}
                            </Text>

                            <View style={styles.itemMidDescriptionContainer}>
                              <Text
                                numberOfLines={
                                  expandDictionary[index] ? 100000 : 1
                                }
                                style={{
                                  color: '#6F7374',
                                  //  marginLeft: 80 * scale,
                                }}>
                                {place.text}
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
                      </TouchableOpacity>
                    </View>
                  );
                })
              ) : (
                <Text>None</Text>
              )}
            </Recipes>
          </RecipesContainer>
          <RecipesContainer style={{zIndex: 444}}>
            <DividerRecepies />

            <View>
              <TextT dark heavy>
                Price level
              </TextT>
            </View>

            <Recipes>
              <Text h6 secondary>
                {`The price level is ${place.price_level}`}
              </Text>
              <View style={[styles.containerSlider, {marginTop: 10 * scale}]}>
                <Slider
                  minimumValue={0}
                  maximumValue={5}
                  style={{height: 19}}
                  thumbStyle={styles.thumb}
                  trackStyle={{height: 6, borderRadius: 6}}
                  minimumTrackTintColor={theme.colors.secondary}
                  maximumTrackTintColor="rgba(157, 163, 180, 0.10)"
                  value={place.price_level}
                  disabled={true}
                />
                <View style={styles.textCon}>
                  <Text caption gray right>
                    0
                  </Text>
                  <Text caption gray right>
                    2.5
                  </Text>
                  <Text caption gray right>
                    5
                  </Text>
                </View>
              </View>
            </Recipes>
          </RecipesContainer>

          {place.geometry ? (
            <MapView
              style={[styles.map, {marginTop: -24, zIndex: 1}]}
              initialRegion={{
                latitude: place.geometry.location.lat,
                longitude: place.geometry.location.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}>
              <Circle
                center={{
                  latitude: place.geometry.location.lat,
                  longitude: place.geometry.location.lng,
                }}
                fillColor={'rgba(200,300,200,0.5)'}
                radius={1000}
              />
              <Marker
                coordinate={{
                  latitude: place.geometry.location.lat,
                  longitude: place.geometry.location.lng,
                }}>
                <Callout>
                  <Text>{place.name}</Text>
                  <Text> {place.formatted_address}</Text>
                </Callout>
              </Marker>
            </MapView>
          ) : null}
        </Container>
      </ScrollView>
    );
  }
}

Explore.defaultProps = {
  images: mocks.explore,
};

export default Explore;

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
  padding: 32px;
  background-color: #fff;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  border-bottom-left-radius: 44px;
  border-bottom-right-radius: 44px;
`;

const ButtonT = styled.TouchableOpacity`
  margin: -10px 0 43px 24px;
  background-color: rgba(255, 255, 255, 0.3);
  align-self: flex-start;

  border-radius: 100px;
`;

const MainRecipe = styled.View`
  padding: 0 22px;
  margin: 140px 0 32px 0;
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
  height: 330px;
`;
const RecipeBackgroundTest = styled.ImageBackground`
  width: 100%;
  height: 350 * scale;
`;
const MenuBar = styled.ImageBackground`
  flex-direction: row;
  justify-content: space-between;
  padding: 16px;
`;

const styles = StyleSheet.create({
  containerSlider: {
    flex: 1,
    // justifyContent: 'center',
    //   alignItems: 'center',
    //   backgroundColor: '#000',
  },
  textCon: {
    width: 320,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  itemContainer: {
    //  height: 'auto',
    //height: 128 * scale,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  itemMidContainer: {
    width: 380 * scale,
    alignItems: 'flex-start',
    justifyContent: 'center',
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
    //  marginRight: 30 * scale,
    marginTop: 20 * scale,
    // marginLeft: 80 * scale
  },
  itemMidText: {
    color: 'black',
    // marginTop:  * scale,
    fontWeight: 'bold',
    //   marginLeft: 80 * scale,
    marginTop: 30 * scale,
  },
  header: {
    paddingHorizontal: theme.sizes.base * 2,
    paddingBottom: theme.sizes.base * 2,
  },
  search: {
    height: theme.sizes.base * 2,
    width: width - theme.sizes.base * 2,
  },
  searchInput: {
    fontSize: theme.sizes.caption,
    height: theme.sizes.base * 2,
    backgroundColor: 'rgba(142, 142, 147, 0.06)',
    borderColor: 'rgba(142, 142, 147, 0.06)',
    paddingLeft: theme.sizes.base / 1.333,
    paddingRight: theme.sizes.base * 1.5,
  },
  searchRight: {
    top: 0,
    marginVertical: 0,
    backgroundColor: 'transparent',
  },
  searchIcon: {
    position: 'absolute',
    right: theme.sizes.base / 1.333,
    top: theme.sizes.base / 1.6,
  },
  explore: {
    marginHorizontal: theme.sizes.padding * 1.25,
  },
  map: {
    width: '100%',
    height: 450 * scale,
  },
  mainImage: {
    minWidth: width - theme.sizes.padding * 2.5,
    minHeight: width - theme.sizes.padding * 2.5,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    overflow: 'visible',
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.1,
    width,
    paddingBottom: theme.sizes.base * 4,
  },

  product: {
    paddingHorizontal: theme.sizes.base * 2,
    paddingVertical: theme.sizes.padding,
  },
  tag: {
    borderColor: theme.colors.gray2,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: theme.sizes.base,
    paddingHorizontal: theme.sizes.base * 0.5,
    paddingVertical: theme.sizes.base / 2.5,
    marginRight: theme.sizes.base * 0.6,
  },
  image: {
    width: width / 3.26,
    height: width / 3.26,
    marginRight: theme.sizes.base,
  },
  more: {
    width: 55,
    height: 55,
  },
});
