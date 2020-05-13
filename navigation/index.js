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
  EmailList,
} from '../screens/index';

import {theme} from '../constants';

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
    EmailList,
  },
  {initialRouteName: 'Welcome'},
);

export default createAppContainer(screens);
