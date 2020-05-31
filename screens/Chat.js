import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  AsyncStorage,
  Platform,
  Keyboard,
  FlatList,
  TextInput,
  TouchableOpacity,
  Switch,
} from 'react-native';
import {Block, Text, Button} from '../components';
import SocketIOClient from 'socket.io-client';
import {
  GiftedChat,
  MessageText,
  Bubble,
  Message,
} from 'react-native-gifted-chat';
//import io from 'socket.io-client';
import url from '../config/config';
import Guid from 'uuid/v4';

/*
const styles = StyleSheet.create({
  container: {
    height: 400,
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});
*/
class Chat extends Component {
  constructor(props) {
    super(props);
    const {navigation} = this.props;
    let user = navigation.getParam('user');
    this.state = {
      chatMessage: '',
      messages: [],
      user,
    };
  }

  componentDidMount() {
    this.socket = SocketIOClient(url, {
      transports: ['websocket', 'polling'],
    });
    this.socket.on('connect', () => {
      console.log('client connected');
      this.socket.emit('get messages', '');

      this.socket.on('messages', messages => {
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, messages),
        }));
      });

      this.socket.on('received', msg => {
        console.log('xxxxxxxxxxxx', msg);

        /*
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, msg),
        }));
       */
      });
    });
    // this.socket.emit('get messages', '');
    /*

    */
  }

  get user() {
    console.log('printUser', this.state.user.email, this.state.user.id);
    return {
      name: this.state.user.email,
      _id: this.state.user.id,
    };
  }
  render() {
    let {user, chatMessages, messages} = this.state;
    console.log('aaaaaaa', messages);
    return (
      <View style={styles.container}>
        <GiftedChat
          messages={messages}
          onSend={msg => {
            let msgView = {
              user: msg[0].user.name,
              text: msg[0].text,
            };
            console.log('printchatmessage', msgView);
            this.socket.emit('chat message', msgView);
          }}
          user={this.user}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 20,
    backgroundColor: '#fff',
    padding: 8,
  },
  checkboxView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    flex: 1,
  },
});
export default Chat;
