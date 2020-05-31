//myproject explore backup
import React, {Component} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons';

import {Button, Divider, Input, Block, Text} from '../components';

import {theme, mocks} from '../constants';

const {width, height} = Dimensions.get('window');
const scale = Dimensions.get('window').width / 750;
const API_KEY = 'AIzaSyBec195_3M-GvCsL83hXSwQpaDmQruO3HU';
const SIZE = 400;
import Carousel from 'react-native-snap-carousel';
import {sliderWidth, itemWidth} from '../utils/SliderEntry';
import MapView, {Marker, Callout, Circle} from 'react-native-maps';

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
    };
  }

  async fetchData() {
    let {place} = this.state;
    let url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${SIZE}&photoreference=${place.photos[0].photo_reference}&sensor=false&key=${API_KEY}`;
    console.log('fetchData');

    await fetch(url)
      .then(async res => {
        console.log('rrreeeessssssss', res);
        //      let img = await convertToJson(res);
        this.setState({img: res.url});
      })
      .catch(e => {
        console.log('printerrrrexplore', e);
      });
  }
  componentDidMount() {
    console.log('componentDidMount');
    this.fetchData();
  }

  componentWillMount() {
    let {navigation} = this.props;
    let place = navigation.getParam('place');
    console.log('99printplaaaaccceeee', place);
    this.setState({place}, () => this.fetchData());
  }

  render() {
    let {place} = this.state;
    console.log('printState', place.icon);

    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block style={styles.product}>
          <Text h2 bold>
            {place.name}
          </Text>
          <Block
            flex={false}
            style={{display: 'flex', width: 100}}
            row
            margin={[theme.sizes.base, 0]}>
            {place && place.types
              ? place.types.map(tag => (
                  <Text
                    style={{display: 'flex'}}
                    key={`tag-${tag}`}
                    caption
                    gray
                    style={styles.tag}>
                    {tag}
                  </Text>
                ))
              : null}
          </Block>
          <Text gray light height={22}>
            {place.description}
          </Text>

          <Block>
            <Text semibold>Gallery</Text>
            <Block row margin={[theme.sizes.padding * 0.9, 0]}>
              {console.log('printplacephotops', place.photos)}
              <Divider margin={[theme.sizes.padding * 0.9, 0]} />

              {place.photos ? (
                <Image
                  source={{
                    width: 350,
                    height: 350,
                    uri: this.state.img,
                  }}
                />
              ) : (
                <Text>No images</Text>
              )}
            </Block>

            <Text semibold>Map</Text>
            <Block row margin={[theme.sizes.padding * 0.9, 0]}>
              {console.log('printlocation', place.location)}
              {place.geometry ? (
                <MapView
                  style={styles.map}
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
                    </Callout>
                  </Marker>
                </MapView>
              ) : null}
              {console.log('printplacephotops', place.photos)}
              <Divider margin={[theme.sizes.padding * 0.9, 0]} />
            </Block>
          </Block>
        </Block>
      </ScrollView>
    );
  }
}

Explore.defaultProps = {
  images: mocks.explore,
};

export default Explore;

const styles = StyleSheet.create({
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
    width: 350,
    height: 350,
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
    paddingHorizontal: theme.sizes.base,
    paddingVertical: theme.sizes.base / 2.5,
    marginRight: theme.sizes.base * 0.625,
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
