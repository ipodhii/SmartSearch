import React, {Component} from 'react';
import {
  Platform,
  View,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Dimensions,
} from 'react-native';
import {GiftedChat, Bubble, Send} from 'react-native-gifted-chat';
import {IconButton} from 'react-native-paper';

import emojiUtils from 'emoji-utils';
import SocketIOClient from 'socket.io-client';
import url from '../config/config';
import Guid from 'uuid/v4';
import styled from 'styled-components';

import SlackMessage from './SlackMessage';
import Images from '../assets/Themes/Images';

const scale = Dimensions.get('window').width / 750;

export default class Chat extends Component {
  constructor(props) {
    super(props);
    const {navigation} = this.props;
    let user = navigation.getParam('user');
    this.state = {
      chatMessage: '',
      messages: [],
      user,
      loadEarlier: true,
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
          loadEarlier: false,
        }));
      });

      this.socket.on('received', msg => {
        console.log('xxxxxxxxxxxx');
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, msg),
        }));
      });
    });
    // this.socket.emit('get messages', '');
    /*

    */
  }

  onSend(messages = []) {
    let msgView = {
      user: messages[0].user.name,
      text: messages[0].text,
    };

    console.log('printchatmessage', msgView);
    this.socket.emit('chat message', msgView);
    messages[0]._id = Guid();
    messages[0].createdAt = new Date().toISOString();
    messages[0].user._id = Guid();

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages[0]),
    }));
  }

  renderMessage(props) {
    const {
      currentMessage: {text: currText},
    } = props;

    let messageTextStyle;

    // Make "pure emoji" messages much bigger than plain text.
    if (currText && emojiUtils.isPureEmojiString(currText)) {
      messageTextStyle = {
        fontSize: 28,
        // Emoji get clipped if lineHeight isn't increased; make it consistent across platforms.
        lineHeight: Platform.OS === 'android' ? 34 : 30,
      };
    }
    return <SlackMessage {...props} messageTextStyle={messageTextStyle} />;
  }
  renderSend(props) {
    return (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          <IconButton icon="send-circle" size={40} color="black" />
        </View>
      </Send>
    );
  }
  renderBubble(props) {
    const {
      currentMessage: {text: currText},
    } = props;
    if (currText.indexOf('[x]') === -1) {
      return <Bubble {...props} />;
    }

    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#fef0dd',
          },
          right: {
            backgroundColor: '#fef0dd',
          },
        }}
        timeTextStyle={{
          left: {
            color: '#000',
          },
          right: {
            color: '#000',
          },
        }}
      />
    );
  }
  renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6646ee" />
      </View>
    );
  }
  renderMessageText(props) {
    const {currentMessage} = props;
    const {text: currText} = currentMessage;
    if (currText.indexOf('[x]') === -1) {
      return <MessageText {...props} />;
    }
    return <CustomMessageText {...props} />;
  }

  render() {
    let {messages, loadEarlier, user} = this.state;

    console.log('printmessages', messages);
    return (
      <Container>
        <StatusBar barStyle="light-content" />
        <RecipeBackground source={Images.chat}>
          <SafeAreaView>
            <MainRecipe>
              <TextT title heavy>
                Chat room
              </TextT>
              <Divider />
              <TextT address bold style={{marginTop: -5 * scale}}>
                {`Talk with other users.`}
              </TextT>
            </MainRecipe>
          </SafeAreaView>
        </RecipeBackground>
        <GiftedChat
          style={{
            marginTop: -24,
            backgroundColor: '#fff',
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
          }}
          messages={messages.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
          )}
          //  messages={r}
          loadEarlier={loadEarlier}
          onSend={messages => this.onSend(messages)}
          showUserAvatar
          alwaysShowSend
          placeholder="Type your message here..."
          user={{
            name: user.email,
            _id: user._id,
          }}
          renderMessage={this.renderMessage}
          renderBubble={this.renderBubble}
          renderSend={this.renderSend}

          //  renderLoading={this.renderLoading}
        />
      </Container>
    );
  }
}

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
  margin: 165px 0 0 0;
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
const styles = StyleSheet.create({
  // rest remains same
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
