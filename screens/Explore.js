//myproject explore backup
import React, { Component } from 'react'
import { Animated, Dimensions, Image, StyleSheet, ScrollView, TouchableOpacity,View,
  TextInput } from 'react-native'
import Icon from 'react-native-vector-icons';

import { Button, Input, Block, Text } from '../components';
import { theme, mocks } from '../constants';

const { width, height } = Dimensions.get('window');
const scale = Dimensions.get('window').width / 750;
const API_KEY='AIzaSyBec195_3M-GvCsL83hXSwQpaDmQruO3HU'
class Explore extends Component {
  constructor(props){
    super(props);
    this.state = { 
      searchFocus: new Animated.Value(0.6),
      searchString: null,
      loading: false,
      data: [],
      pageToken: '',
      refreshing: false,
      siteTitle: ''
 
      
    }
  }

  componentDidMount() {

    this.fetchData();
  }

  fetchData = () => {

    navigator.geolocation.getCurrentPosition(
            (position) => {
  //  const latitude = Number(position.coords.latitude.toFixed(6));
 //   const longitude = Number(position.coords.longitude.toFixed(6));
    const { pageToken } = this.state;

    //https://maps.googleapis.com/maps/api/place/textsearch/json?query=starbucks+seattle&sensor=false&key=YOUR_API_KEY
   // https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+israel+canada&key=YOURAPIKEY
    const urlFirst = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+israel+canada&key=${API_KEY}`;
    const urlNext = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+israel+canada&key=${API_KEY}`;
    
    let url = pageToken === '' ? urlFirst : urlNext
    console.log(url);
    console.log("url");
    this.setState({ loading: true });
    fetch(url)
      .then(res => {
        return res.json()
      })
      .then(res => {

        const arrayData = _.uniqBy( [...this.state.data, ...res.results] , 'id' )

        this.setState({
    //      siteTitle: "Resturants Near By",
          data: arrayData,
          loading: false,
       //   refreshing: false,
       //   pageToken: res.next_page_token
        });

      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false });
      });
    })
  };
updateSearch = search => {
  this.setState({ search });
};

  handleSearchFocus(status) {
    Animated.timing(
      this.state.searchFocus,
      {
        toValue: status ? 0.8 : 0.6, // status === true, increase flex size
        duration: 150, // ms
      }
    ).start();
  }

  renderSearch() {
    const { searchString, searchFocus } = this.state;
    const isEditing = searchFocus && searchString;

    return (
      <View style={{paddingLeft:60*scale,paddingRight:60*scale}}>
           <View style={styles.singleField}>
             <View style={{marginTop:20*scale,lineHight:10}}>
             <Image style={styles.iconBlk}
                source={require('../assets/images/password_icon.png')} />
             </View>
              <TextInput style={styles.textFiled}
                placeholder="Search"
                returnKeyType="go"
                underlineColorAndroid={'transparent'}
                placeholderTextColor="rgba(0,0,0,1)"
                secureTextEntry
                value={this.state.password2}
                onChangeText={(password2) => this.setState({ password2 })}
                ref={(input) => this.passwordInput = input}
              />
            </View>
      </View>
  )
  }

  renderImage(img, index) {
    const { navigation } = this.props;
    const sizes = Image.resolveAssetSource(img);
    const fullWidth = width - (theme.sizes.padding * 2.5);
    const resize = (sizes.width * 100) / fullWidth;
    const imgWidth = resize > 75 ? fullWidth : sizes.width * 1;

    return (
      <TouchableOpacity
        key={`img-${index}`}
        onPress={() => navigation.navigate('Product')}
      >
        <Image
          source={img}
          style={[
            styles.image,
            { minWidth: imgWidth, maxWidth: imgWidth }
          ]}
        />
      </TouchableOpacity>
    )
  }

  renderExplore() {
    const { images, navigation } = this.props;
    const mainImage = images[0];

    return (
      <Block style={{ marginBottom: height / 3 }}>
        <TouchableOpacity
          style={[ styles.image, styles.mainImage ]}
          onPress={() => navigation.navigate('Product')}
        >
          <Image source={mainImage} style={[styles.image, styles.mainImage]} />
        </TouchableOpacity>
        <Block row space="between" wrap>
          {
            images.slice(1).map((img, index) => this.renderImage(img, index))
          }
        </Block>
      </Block>
    )
  }

  renderFooter() {
    return (
      <View
        locations={[0.5, 1]}
        style={styles.footer}
        colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.6)']}
      >
        <Button style={{ width: width / 2.678 }}>
          <Text bold white center>Filter</Text>
        </Button>
      </View>
    )
  }

  render() {
    console.log("printState",this.state.data)
    return (
      <Block>
        <Block flex={false} row center space="between" style={styles.header}>
         <View style={{marginTop:20*scale}}>
         <Text h1 bold>Explore</Text>
           </View>
          
          
        </Block>
        {this.renderSearch()}


        <ScrollView showsVerticalScrollIndicator={false} style={styles.explore}>
          {/*this.renderExplore()*/}
        </ScrollView>

        {this.renderFooter()}
      </Block>
    )
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
    paddingBottom: theme.sizes.base * 2
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
    backgroundColor: 'transparent'
  },
  searchIcon: {
    position: 'absolute',
    right: theme.sizes.base / 1.333,
    top: theme.sizes.base / 1.6,
  },
  explore: {
    marginHorizontal: theme.sizes.padding * 1.25,
  },
  image: {
    minHeight: 100,
    maxHeight: 130,
    maxWidth: width - (theme.sizes.padding * 2.5),
    marginBottom: theme.sizes.base,
    borderRadius: 4,
  },
  mainImage: {
    minWidth: width - (theme.sizes.padding * 2.5),
    minHeight: width - (theme.sizes.padding * 2.5),
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
  }
})
