import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  Dimensions,
  View,
} from 'react-native';
import Slider from 'react-native-slider';
import EmailList from './emailList';
import {Divider, Button, Block, Text, Switch} from '../components';
import {theme, mocks} from '../constants';
const scale = Dimensions.get('window').width / 750;

class Settings extends Component {
  state = {
    budget: 850,
    monthly: 1700,
    notifications: true,
    newsletter: false,
    editing: null,
    profile: {},
    modalVisible: false,
  };

  componentDidMount() {
    this.setState({profile: this.props.profile});
  }

  handleEdit(name, text) {
    const {profile} = this.state;
    profile[name] = text;

    this.setState({profile});
  }

  toggleEdit(name) {
    const {editing} = this.state;
    this.setState({editing: !editing ? name : null});
  }

  renderEdit(name) {
    const {profile, editing} = this.state;

    if (editing === name) {
      return (
        <TextInput
          defaultValue={profile[name]}
          onChangeText={text => this.handleEdit([name], text)}
        />
      );
    }

    return <Text bold>{profile[name]}</Text>;
  }
  toggleModal(modalVisible) {
    this.setState({modalVisible});
  }
  showMailOption() {
    let {modalVisible} = this.state;
    return (
      <Modal
        animationType={'slide'}
        visible={modalVisible}
        onRequestClose={function() {
          return this.toggleModal.bind(this)(false);
        }.bind(this)}>
        <View style={[styles.modalBack]}>
          <View style={[styles.dialogBack]}>
            <EmailList />
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
    );
  }

  getContactsNumber(navigation) {
    let user = navigation.getParam('user');
    console.log('printUseerrrrrr', user);
    return user.userContactsMember;
  }
  render() {
    const {profile, editing, notifications} = this.state;
    const {navigation} = this.props;
    return (
      <Block>
        <Block flex={false} row center space="between" style={styles.header}>
          <View style={{marginTop: 20 * scale}}>
            <Text h1 bold>
              Settings
            </Text>
          </View>
        </Block>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Block style={styles.inputs}>
            <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
              <Block>
                <Text gray2 style={{marginBottom: 10}}>
                  Phone number
                </Text>
                <Text bold>0556678224</Text>
              </Block>
              <Text
                medium
                secondary
                onPress={() => this.toggleEdit('username')}>
                {editing === 'username' ? 'Save' : 'Edit'}
              </Text>
            </Block>
            <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
              <Block>
                <Text gray2 style={{marginBottom: 10}}>
                  Password
                </Text>
                <TextInput
                  style={styles.textFiled}
                  underlineColorAndroid={'transparent'}
                  placeholderTextColor="rgba(0,0,0,1)"
                  secureTextEntry
                  value={'password'}
                />
              </Block>
              <Text
                medium
                secondary
                onPress={() => this.toggleEdit('location')}>
                {editing === 'location' ? 'Save' : 'Edit'}
              </Text>
            </Block>
            <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
              <Block>
                <Text gray2 style={{marginBottom: 10}}>
                  E-mail
                </Text>
                <Text bold>amitdanonmail@gmail.com</Text>
              </Block>
            </Block>
          </Block>

          <Divider margin={[theme.sizes.base, theme.sizes.base * 2]} />

          <Divider />

          <Block style={styles.toggles}>
            <Block
              row
              center
              space="between"
              style={{marginBottom: theme.sizes.base * 2}}>
              <Text gray2>Notifications</Text>
              <Switch
                value={this.state.notifications}
                onValueChange={value => this.setState({notifications: value})}
              />
            </Block>
            {notifications ? (
              <EmailList
                userContactsMember={this.getContactsNumber(navigation)}
              />
            ) : null}
          </Block>
        </ScrollView>
      </Block>
    );
  }
}

Settings.defaultProps = {
  profile: mocks.profile,
};

export default Settings;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
  },
  avatar: {
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2,
  },
  inputs: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2,
  },
  inputRow: {
    alignItems: 'flex-end',
  },
  sliders: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2,
  },
  thumb: {
    width: theme.sizes.base,
    height: theme.sizes.base,
    borderRadius: theme.sizes.base,
    borderColor: 'white',
    borderWidth: 3,
    backgroundColor: theme.colors.secondary,
  },
  toggles: {
    paddingHorizontal: theme.sizes.base * 2,
  },
});
