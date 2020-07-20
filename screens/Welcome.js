import React, {Component} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  FlatList,
  Modal,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {
  Container,
  Content,
  Item,
  Tabs,
  Tab,
  Input,
  Button,
  Icon,
  //  Text,
} from 'native-base';
import {Block, Text} from '../components';
import {theme} from '../constants';
import LinearGradient from 'react-native-linear-gradient';
import Images from '../assets/Themes/Images';

const scale = Dimensions.get('window').width / 750;
const {width, height} = Dimensions.get('window');

class Welcome extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    height: new Animated.Value(600), // Initial value for opacity: 0
    width: new Animated.Value(360), // Initial value for opacity: 0
  };

  renderIllustrations() {
    const {illustrations} = this.props;

    return (
      <FlatList
        horizontal
        snapToAlignment="center"
        data={illustrations}
        extraDate={this.state}
        keyExtractor={(item, index) => `${item.id}`}
        renderItem={({item}) => (
          <Image
            source={item.source}
            resizeMode="contain"
            style={{width, height: height / 2, overflow: 'visible'}}
          />
        )}
      />
    );
  }

  mainWelcomeScreen(navigation) {
    return (
      <View>
        <ImageBackground
          resizeMode="cover"
          blurRadius={2}
          // blurRadius={90}

          style={{width: '100%', height: '100%'}}
          source={Images.backgroundTwo}>
          <Block center style={{marginTop: 150 * scale}} flex={0.5}>
            <LinearGradient
              start={{x: 2, y: 1}}
              end={{x: 2, y: 20}}
              colors={['#0000', '#000']}
              opacity={0.7}
              style={styles.linearGradient}>
              <Text h1 center bold white>
                SmartSearch
                <Text h1 tertiary>
                  {' '}
                  Weight advices.
                </Text>
              </Text>
            </LinearGradient>
            <LinearGradient
              start={{x: 2, y: 7}}
              end={{x: 10, y: 60}}
              colors={['#0000', '#000']}
              opacity={0.7}
              style={styles.linearGradient}>
              <Text h3 bold style={{color: '#fff', fontSize: 40 * scale}}>
                Reliable search engine.
              </Text>
            </LinearGradient>
          </Block>

          <Block middle flex={0.5} margin={[0, theme.sizes.padding * 4]}>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <LinearGradient
                start={{x: 12, y: 2}}
                end={{x: 10, y: 60}}
                colors={['#0000', '#000']}
                opacity={0.7}
                style={styles.linearGradient}>
                <Text
                  h3
                  secondary
                  style={[
                    styles.buttonText,
                    {marginTop: theme.sizes.padding / 2},
                  ]}>
                  Login
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('preSignUp')}>
              <LinearGradient
                start={{x: 12, y: 2}}
                end={{x: 10, y: 60}}
                colors={['#0000', '#000']}
                opacity={0.7}
                style={styles.linearGradient}>
                <Text
                  h3
                  secondary
                  style={[
                    styles.buttonText,
                    {marginTop: theme.sizes.padding / 2},
                  ]}>
                  Signup
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </Block>
        </ImageBackground>
      </View>
    );
  }
  mainScene(navigation) {
    return (
      <Block>
        <Block center bottom flex={0.4}>
          <Text h1 center bold gray3>
            Smart search by
            <Text h1 tertiary>
              {' '}
              Weight advices.
            </Text>
          </Text>
          <Text h3 gray2 style={{marginTop: theme.sizes.padding / 2}}>
            Reliable search engine.
          </Text>
        </Block>
        <Block center middle>
          {this.renderIllustrations()}
        </Block>

        <View style={[styles.sectionSeperator]} />

        <Block middle flex={0.5} margin={[0, theme.sizes.padding * 2]}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
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
                Login
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('preSignUp')}>
            <LinearGradient
              start={{x: 4, y: 2}}
              end={{x: 0, y: 0}}
              colors={['#FFFFFF', '#FFFFFF', '#EFEFEF']}
              opacity={0.8}
              style={styles.linearGradient}>
              <Text
                h3
                secondary
                style={[
                  styles.buttonText,
                  {marginTop: theme.sizes.padding / 2},
                ]}>
                Signup
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </Block>
      </Block>
    );
  }
  render() {
    const {navigation} = this.props;
    return this.mainWelcomeScreen(navigation);
  }
}

Welcome.defaultProps = {
  illustrations: [
    {id: 1, source: require('../assets/images/illustration_1.png')},
  ],
};

export default Welcome;

const styles = StyleSheet.create({
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
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(255,22,84,0.24)',
    shadowOffset: {width: 3, height: 9},
    elevation: 1,
    shadowOpacity: 1,
    shadowRadius: 20,
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
