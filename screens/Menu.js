import React, {Component} from 'react';
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  View,
  Image,
  TextInput,
  Text,
  Modal,
  Picker,
  AsyncStorage,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import Images from '../assets/Themes/Images';
var WINDOW_HEIGHT = Dimensions.get('window').height;
const ACTIVE_OPACITY = 0.8;
const scale = Dimensions.get('window').width / 750;

class Menu extends Component {
  render() {
    const {profile, navigation} = this.props;
    return (
      <View style={styles.container}>
        <SafeAreaView>
          <ImageBackground
            source={Images.menuBackground}
            style={styles.menuBack}>
            {/* MenuItems */}

            <TouchableOpacity
              activeOpacity={ACTIVE_OPACITY}
              style={styles.menuItemContainer}
              onPress={() =>
                navigation.navigate('Settings', {
                  user: navigation.getParam('user'),
                })
              }>
              <View style={styles.menuIconContainer}>
                <Image source={Images.head} style={styles.headIcon} />
              </View>
              <View style={styles.menuContentContainer}>
                <Text style={styles.menuItemTitle}>Settings</Text>
                <Text style={styles.menuItemDescription}>
                  View user details and modify password
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItemContainer}
              activeOpacity={ACTIVE_OPACITY}
              onPress={() =>
                navigation.navigate('Notificatios', {
                  user: navigation.getParam('user'),
                })
              }>
              <View style={styles.menuIconContainer}>
                <Image source={Images.timer} style={styles.preferenceIcon} />
              </View>
              <View style={styles.menuContentContainer}>
                <Text style={styles.menuItemTitle}>Notifications</Text>
                <Text style={styles.menuItemDescription}>
                  General notifications preferences
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItemContainer}
              activeOpacity={ACTIVE_OPACITY}
              onPress={() => {
                console.log('presssss');
                navigation.navigate('Notes', {
                  user: navigation.getParam('user'),
                });
              }}>
              <View style={styles.menuIconContainer}>
                <Image source={Images.today} style={styles.preferenceIcon} />
              </View>
              <View style={styles.menuContentContainer}>
                <Text style={styles.menuItemTitle}>Notes</Text>
                <Text style={styles.menuItemDescription}>
                  Create and track your notes
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItemContainer}
              activeOpacity={ACTIVE_OPACITY}
              onPress={() => {
                console.log('presssss');
                navigation.navigate('Chat', {
                  user: navigation.getParam('user'),
                });
              }}>
              <View style={styles.menuIconContainer}>
                <Image source={Images.chatMenu} style={styles.preferenceIcon} />
              </View>
              <View style={styles.menuContentContainer}>
                <Text style={styles.menuItemTitle}>Chat</Text>
                <Text style={styles.menuItemDescription}>
                  Write to other members
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItemContainer}
              activeOpacity={ACTIVE_OPACITY}
              onPress={() => {
                console.log('presssss');
                navigation.navigate('ContactList', {
                  user: navigation.getParam('user'),
                });
              }}>
              <View style={styles.menuIconContainer}>
                <Image
                  source={Images.preference}
                  style={styles.preferenceIcon}
                />
              </View>
              <View style={styles.menuContentContainer}>
                <Text style={styles.menuItemTitle}>Contact List</Text>
                <Text style={styles.menuItemDescription}>
                  Modify priority to your contact members
                </Text>
              </View>
            </TouchableOpacity>
          </ImageBackground>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //   paddingTop: Metrics.baseMargin,
    //    backgroundColor: Colors.background,
  },

  menuBack: {
    width: 750 * scale,
    height: WINDOW_HEIGHT,
    paddingTop: 130 * scale,
    paddingLeft: 60 * scale,
    paddingRight: 40 * scale,
    //paddingBottom: 130 * scale,
  },

  menuItemContainer: {
    flexDirection: 'row',
    height: 180 * scale,
  },
  menuIconContainer: {
    width: 155 * scale,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuContentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  menuItemTitle: {
    //fontFamily: Fonts.type.base,
    // fontSize: Fonts.size.headerTitle,
    fontSize: 40 * scale,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 17 * scale,
    //  backgroundColor: Colors.transparent,
  },
  menuItemDescription: {
    //  fontFamily: Fonts.type.base,
    //  fontSize: Fonts.size.medium,
    color: 'white',
    //    backgroundColor: Colors.transparent,
  },

  closeIcon: {
    width: 76 * scale,
    height: 76 * scale,
    position: 'absolute',
    left: 40 * scale,
    top: 40 * scale,
  },
  indorzIcon: {
    width: 73 * scale,
    height: 73 * scale,
  },
  headIcon: {
    width: 64 * scale,
    height: 81 * scale,
  },
  preferenceIcon: {
    width: 73 * scale,
    height: 73 * scale,
    color: 'white',
  },
  networkIcon: {
    width: 73 * scale,
    height: 71 * scale,
  },
  firmwareIcon: {
    width: 71 * scale,
    height: 65 * scale,
  },
  bugIcon: {
    width: 75 * scale,
    height: 67 * scale,
  },
});

export default Menu;
