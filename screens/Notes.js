import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  Dimensions,
  View,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Modal,
} from 'react-native';
import Slider from 'react-native-slider';
import {Button, Block, Text, Switch} from '../components';
import {theme, mocks} from '../constants';
import Guid from 'uuid/v4';
import Images from '../assets/Themes/Images';
import ActionButton from 'react-native-action-button';
import dateFormat from 'dateformat';
import SwipeBtn from 'react-native-swipeout';

import url from '../config/config';
import styled from 'styled-components';

const scale = Dimensions.get('window').width / 750;
var WINDOW_HEIGHT = Dimensions.get('window').height;

const LOADING = (
  <View style={CENTER_STYLE}>
    <ActivityIndicator size={'large'} animating={true} />
  </View>
);
const CENTER_STYLE = {
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  flex: 1,
};
function convertToJson(res) {
  console.log('printRes', res);
  if (!res) return res;
  return res.json();
}
class Notes extends Component {
  state = {
    budget: 850,
    monthly: 1700,
    notification: false,
    newsletter: false,
    editing: null,
    profile: {},
    modalVisible: false,
    userContactsMember: [],
    phone: '',
    isPassMaxNotification: false,
    password: 'ifyouwantchange',
    chosenNote: {},
    title: '',
    content: '',
    isOpenCreateModal: false,
    isOpenEditModal: false,
    isOpenViewModal: false,
  };
  async getNotes(phone) {
    try {
      let res = await fetch(`${url}api/note?user=${phone}`, {
        method: 'GET',
      });

      let notes = await convertToJson(res);
      if (notes && notes.length) {
        notes.sort(
          (noteA, noteB) => new Date(noteB.date) - new Date(noteA.date),
        );
      }
      //   data = JSON.parse(data);
      console.log('printNotes', notes);
      this.setState({
        profile: this.props.profile,
        notes,
        phone,
        isExists: true,
      });
    } catch (err) {
      this.setState({
        profile: this.props.profile,
        notes: [],
        phone,
        isExists: false,
      });
    }
  }
  async deleteNote(noteId) {
    console.log('printNodeid999999', noteId);
    try {
      await fetch(`${url}api/note?noteId=${noteId}`, {
        method: 'DELETE',
      });
      let {phone} = this.state;

      this.getNotes(phone);
    } catch (err) {
      console.log('errorToDeleteNote', err);
    }
  }
  async updateNote(body) {
    console.log('printUpdateNoteBody', body);
    try {
      await fetch(`${url}api/note`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body,
      });
      let {phone} = this.state;
      this.setState(
        {
          isOpenCreateModal: false,
          isOpenEditModal: false,
          isOpenViewModal: false,
          chosenNote: {},
          title: '',
          content: '',
        },
        () => this.getNotes(phone),
      );
    } catch (err) {
      console.log('printerrrNoteupdate', err);
      this.setState({
        isOpenCreateModal: false,
        isOpenEditModal: false,
        isOpenViewModal: false,
        chosenNote: {},
        title: '',
        content: '',
      });
    }
  }
  async createNote(body) {
    console.log('printUpdateNoteBody', body);
    try {
      await fetch(`${url}api/note`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body,
      });
      let {phone} = this.state;
      this.setState(
        {
          isOpenCreateModal: false,
          isOpenEditModal: false,
          isOpenViewModal: false,
          chosenNote: {},
          title: '',
          content: '',
        },
        () => this.getNotes(phone),
      );
    } catch (err) {
      console.log('printerrrNoteupdate', err);
      this.setState({
        isOpenCreateModal: false,
        isOpenEditModal: false,
        isOpenViewModal: false,
        chosenNote: {},
        title: '',
        content: '',
      });
    }
  }
  async componentDidMount() {
    const {navigation} = this.props;
    let user = navigation.getParam('user');
    console.log('printuser', user);
    let phone = user.phone;
    this.getNotes(phone);
  }

  headerBrowser() {
    const {
      notes,
      isOpenCreateModal,
      isOpenEditModal,
      chosenNote,
      isOpenViewModal,
    } = this.state;
    console.log(
      'printStatus',
      isOpenCreateModal,
      isOpenEditModal,
      isOpenViewModal,
    );
    return (
      <View style={{flex: 1}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Container>
            <StatusBar barStyle="light-content" />
            <RecipeBackground source={Images.notes}>
              <SafeAreaView>
                <MainRecipe>
                  <TextT title heavy>
                    Notes
                  </TextT>
                  <Divider />
                  <TextT address bold>
                    {`Plan and Write your own notes.`}
                  </TextT>
                </MainRecipe>
              </SafeAreaView>
            </RecipeBackground>

            <RecipesContainer style={{zIndex: 444}}>
              <Recipes>
                <Block style={styles.toggles}>
                  <Block
                    row
                    center
                    space="between"
                    style={{marginBottom: theme.sizes.base * 2}}></Block>

                  {notes && notes.length ? (
                    this.showNotes()
                  ) : notes ? (
                    LOADING
                  ) : (
                    <View>
                      <Text>You dont have notes</Text>
                    </View>
                  )}
                </Block>
              </Recipes>
            </RecipesContainer>
          </Container>
        </ScrollView>

        <ActionButton
          buttonTextStyle={{color: '#FEDC26'}}
          buttonColor="#000"
          onPress={() => {
            this.setState({isOpenCreateModal: true});
          }}
        />
        <Modal
          animationType={'slide'}
          visible={isOpenCreateModal || isOpenEditModal || isOpenViewModal}
          onRequestClose={function() {
            this.setState({
              isOpenCreateModal: false,
              isOpenEditModal: false,
              isOpenViewModal: false,
            });
          }.bind(this)}>
          <View style={[styles.modalBack]}>
            <View style={[styles.dialogBack]}>
              <Text
                style={[
                  styles.header,
                  {
                    marginBottom: 50 * scale,
                    marginTop: 40 * scale,
                    textAlign: 'center',
                    marginRight: 70 * scale,
                  },
                ]}
                h1>
                {`${isOpenCreateModal ? 'Create' : 'Edit'} note`}
              </Text>
              <View style={[styles.singleField]}>
                <TextInput
                  enabled={
                    this.state.isOpenEditModal || this.state.isOpenCreateModal
                  }
                  style={[
                    styles.textFiled,
                    {fontSize: 50 * scale, fontWeight: 'bold', color: 'black'},
                  ]}
                  placeholder="title"
                  underlineColorAndroid={'transparent'}
                  placeholderTextColor="rgba(0,0,0,1)"
                  value={this.state.title}
                  onChangeText={title => this.setState({title})}
                />
              </View>
              <View style={[styles.singleField, {height: 180 * scale}]}>
                <TextInput
                  enabled={
                    this.state.isOpenEditModal || this.state.isOpenCreateModal
                  }
                  minHeight={180 * scale}
                  multiline={true}
                  style={[
                    styles.textFiled,
                    {
                      textAlignVertical: 'top',
                      backgroundColor: '#f9eb85',
                      color: 'black',
                    },
                  ]}
                  placeholder="content"
                  underlineColorAndroid={'transparent'}
                  underlineColorAndroid="transparent"
                  //   placeholderTextColor="rgba(0,0,0,1)"
                  value={this.state.content}
                  onChangeText={content => this.setState({content})}
                />
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={async () => {
                    let {
                      title,
                      content,
                      phone,
                      isOpenCreateModal,
                      isOpenViewModal,
                      isOpenEditModal,
                    } = this.state;
                    if (isOpenViewModal) {
                      this.setState({
                        title: '',
                        content: '',
                        chosenNote: {},
                        isOpenViewModal: false,
                      });
                    }
                    let body = JSON.stringify({title, content, user: phone});
                    if (isOpenEditModal) this.updateNote(body);
                    if (isOpenCreateModal) this.createNote(body);
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
                    this.setState({
                      isOpenCreateModal: false,
                      isOpenEditModal: false,
                      isOpenViewModal: false,
                      chosenNote: {},
                      title: '',
                      content: '',
                    });
                  }.bind(this)}>
                  <Text style={styles.buttonCancelText}>{'CANCEL'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  showNotes() {
    let {notes} = this.state;
    console.log('checknotes222notification', notes);
    return notes.map(
      function(note, index) {
        let {title, content, date} = note;
        let rightOptions = [
          {
            text: 'Delete',
            onPress: async () => {
              console.log('printNodeId', note.id);
              return this.deleteNote(note.id);
            },
            backgroundColor: '#ff5151',
          },
        ];

        return (
          <View style={[styles.itemContainerV2]} key={Guid()}>
            <SwipeBtn
              autoClose={true}
              right={rightOptions}
              buttonWidth={44}
              style={{height: 128 * scale}}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    isOpenEditModal: true,
                    title,
                    content,
                    chosenNote: note,
                  });
                }}>
                <View>
                  <View>
                    <View style={[styles.itemContainer]}>
                      <View
                        style={[
                          styles.itemMidContainer,
                          {paddingLeft: 30 * scale},
                        ]}>
                        <Text style={styles.itemMidText} numberOfLines={1}>
                          {title}
                        </Text>
                        <View style={styles.itemMidDescriptionContainer}>
                          <Text style={{color: '#6F7374'}} numberOfLines={1}>
                            {content}
                          </Text>
                        </View>
                      </View>
                      <View style={[styles.itemRightContainer]}>
                        <Text style={{fontWeight: 'bold'}}>
                          {dateFormat(date, 'HH:MM:ss mm/dd/yyyy')}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </SwipeBtn>
          </View>
        );
      }.bind(this),
    );
  }
  render() {
    return <Block>{this.headerBrowser()}</Block>;
  }
}

export default Notes;

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
  margin: 135px 0 0 0;
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
  position: relative;
  top: 0;
`;
const RecipeBackground = styled.ImageBackground`
  width: 100%;
  height: 250px;
`;

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    //   color: '#ffffff',
    backgroundColor: 'transparent',
  },
  singleField: {
    flexDirection: 'row',
    //  justifyContent: 'center',
    //  alignItems: 'center',
    width: 600 * scale,
    //  alignSelf: 'stretch',
    //  marginBottom: 15,
    borderColor: '#e7edef',
    marginLeft: 35 * scale,
    marginRight: 35 * scale,
    borderBottomWidth: 1,
  },
  itemInput: {
    borderWidth: 0,
    width: 570 * scale,
    marginLeft: 30 * scale,
    fontFamily: 'Lato-Regular',
    fontSize: 30 * scale,
  },
  buttonCancelText: {
    textAlign: 'center',
    justifyContent: 'center',
    fontFamily: 'Lato-Bold',
    fontSize: 30 * scale,
    color: 'black',
  },
  button: {
    borderRadius: 65 * scale,
    marginBottom: 40 * scale,
    marginTop: 40 * scale,
    height: 90 * scale,
    width: 400 * scale,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: '#51B72B',
  },
  Cancelbutton: {
    borderRadius: 65 * scale,
    marginBottom: 40 * scale,
    marginTop: 40 * scale,
    height: 90 * scale,
    width: 400 * scale,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  },
  dialogBack: {
    width: '90%',
    height: '60%',
    backgroundColor: 'white',
  },
  modalBack: {
    alignItems: 'center',
    paddingTop: 200 * scale,
    backgroundColor: 'rgba(0,0,0,0.6)',
    height: WINDOW_HEIGHT,
  },
  linearGradient: {
    width: '85%',
    // height:100*scale,
    //  flex: 0.3,
    marginLeft: 50 * scale,
    borderRadius: 6,
    height: 16 * 3,
    justifyContent: 'center',
    marginVertical: 25 / 3,
    // marginTop: 0 * scale,
    shadowColor: '#323643',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  header: {
    paddingHorizontal: theme.sizes.base * 2,
  },
  itemContainerV2: {
    height: 126 * scale,
    backgroundColor: 'white',
    marginLeft: -40 * scale,
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
    width: 320 * scale,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  itemIconContainer: {
    width: 168 * scale,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemIconContainerV2: {
    width: 128 * scale,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    height: 128 * scale,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#F5F5F5',
  },
  itemContainerPress: {
    height: 128 * scale,
    backgroundColor: '#51B72B',
    flexDirection: 'row',
    opacity: 0.8,
    borderBottomWidth: 2,
    borderBottomColor: '#F5F5F5',
  },
  itemMidText: {
    color: 'black',
    marginBottom: 5 * scale,
    fontWeight: 'bold',
    //marginLeft:40*scale
  },
  itemMidDescriptionContainer: {
    flexDirection: 'row',
    // marginLeft:40*scale,
    //  marginBottom: 10 * scale,
    color: '#F7F7F7',
  },
  itemRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '40%',
    marginLeft: 80 * scale,
  },
  navigateBack: {
    width: 150 * scale,
    height: 100 * scale,
    position: 'absolute',
    left: 38 * scale,
    top: 66 * scale,
  },
  sectionSeperator: {
    height: 2 * scale,
    width: 750 * scale,
    backgroundColor: '#F5F5F5',
  },
  scheduleItemContainer: {
    height: 138 * scale,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  scheduleItemLeftPan: {
    width: '40%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 20 * scale,
  },
  scheduleLeftText: {
    // fontFamily: typeFonts.base,
    // fontSize: sizeFonts.itemText,
    color: 'black',
    marginLeft: 34 * scale,
  },

  bodycont: {
    flex: 1,
    resizeMode: 'stretch',
  },
  container: {
    flex: 2,
  },
  headerBlk: {
    flex: 1,
  },
  tab: {
    backgroundColor: '#00DFDE',
  },
  tabbar: {
    backgroundColor: '#00DFDE',
  },
  gradeBlk: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    flex: 1,
    marginTop: 40,
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
  },
  filedsOuter: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignSelf: 'stretch',
    padding: 20,
    paddingTop: 30,
  },
  textedit: {
    height: 40,
    backgroundColor: 'transparent',
    alignSelf: 'stretch',
    width: 300,
    padding: 0,
    paddingBottom: 10,
  },
  textFiled: {
    height: 40,
    backgroundColor: 'transparent',
    alignSelf: 'stretch',
    width: 300,
    padding: 0,
    color: '#6F7374',
    //  paddingBottom: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
    paddingTop: 20,
  },
  submitButton: {
    backgroundColor: '#00e0ee',
    borderRadius: 30,
    padding: 15,
    paddingLeft: 30,
    paddingRight: 30,
    width: 200,
    flexDirection: 'row',
  },
  submitButtonText: {
    fontSize: 15,
    textAlign: 'center',
    color: '#FFF',
    fontWeight: 'bold',
    flex: 1,
  },

  forgotField: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginBottom: 15,
  },

  buttonField: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginBottom: 0,
  },
  inputIcon: {
    padding: 10,
  },

  forgotPass: {
    color: '#00a2ee',
    fontSize: 14,
    textDecorationLine: 'underline',
  },

  iconBlk: {
    width: 18,
    height: 16,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
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
