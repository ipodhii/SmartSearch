import React from 'react';
import {Image} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';

import {createAppContainer} from 'react-navigation';
import {
  Browse,
  Explore,
  Login,
  Product,
  Settings,
  Welcome,
  SignUp,
  preSignUp,
  Advice,
  Notificatios,
  Forgot,
  Chat,
  Menu,
  Notes,
  ContactList,
} from '../screens/index';

const screens = createStackNavigator(
  {
    Browse,
    Explore,
    Product,
    Settings,
    Welcome,
    Login,
    preSignUp,
    SignUp,
    Advice,
    Notificatios,
    Forgot,
    Chat,
    Menu,
    Notes,
    ContactList,
  },
  {initialRouteName: 'Welcome'},
);

export default createAppContainer(screens);
