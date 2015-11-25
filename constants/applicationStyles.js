import { Dimensions } from 'react-native'

import Fonts from './Fonts'
import Metrics from './Metrics'
import Colors from './Colors'

const scale = Dimensions.get('window').width / 750;

var WINDOW_HEIGHT = Dimensions.get('window').height;

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const ApplicationStyles = {
  scale,
  screen: {
    mainContainer: {
      flex: 1,
      backgroundColor: Colors.snow
    },
    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    },
    container: {
      flex: 1,
      paddingTop: Metrics.baseMargin,
      backgroundColor: Colors.background
    },
    containerRules: {
      flex: 1,
      paddingTop: Metrics.baseMargin,
      backgroundColor: Colors.background
    },
    containerNoColor: {
      flex: 1,
      paddingTop: Metrics.baseMargin,
    },
    section: {
      margin: Metrics.section,
      padding: Metrics.baseMargin
    },
    sectionText: {
      ...Fonts.style.normal,
      paddingVertical: Metrics.doubleBaseMargin,
      color: Colors.snow,
      marginVertical: Metrics.smallMargin,
      textAlign: 'center'
    },
    subtitle: {
      color: Colors.snow,
      padding: Metrics.smallMargin,
      marginBottom: Metrics.smallMargin,
      marginHorizontal: Metrics.smallMargin
    },
    titleText: {
      ...Fonts.style.h2,
      fontSize: 14 * scale,
      color: Colors.text
    },
    navigateBack: {
      width: 150 * scale,
      height: 100 * scale,
      position: 'absolute',
      left: 38 * scale,
      top: 66 * scale,
    },
    header_menu: {
      position: 'absolute',
      width: 100 * scale,
      height: 33 * scale,
      left: 19,
      top: 24,
    },
    headerLeftText: {
      position: 'absolute',
      left: 49 * scale,
      top: 67 * scale,
      backgroundColor: Colors.snow,
      fontFamily: Fonts.type.base,
      fontSize: Fonts.size.itemText,
      color: 'black'
    },
    headerRightText: {
      position: 'absolute',
      right: 49 * scale,
      top: 67 * scale,
      backgroundColor: Colors.snow,
      textAlign: 'right',
      fontFamily: Fonts.type.base,
      fontSize: Fonts.size.itemText,
      color: 'black'
    },

    itemSeperator: {
      height: 2 * scale,
      width: 750 * scale,
      backgroundColor: Colors.itemSeperator
    },
    sectionSeperator: {
      height: 2 * scale,
      width: 750 * scale,
      backgroundColor: Colors.sectionSeperator
    },

    mainBackground: {
   flex:1,
   backgroundColor:"black",
      height:"100%"
    },


    sectionHeader: {
      height: 100 * scale,
      flexDirection: 'row',
      backgroundColor: Colors.background,
      justifyContent: 'space-between',
      paddingRight: 40 * scale,
      paddingTop: 50 * scale,
    },
    sectionHeaderV2: {
      height: 100 * scale,
      flexDirection: 'row',
      backgroundColor: Colors.background,
      justifyContent: 'space-between',
      paddingRight: 40 * scale,
      paddingTop: 50 * scale,
      paddingLeft: 40 * scale,

    },
    sectionHeaderText: {
      marginLeft: 45 * scale,
      fontFamily: Fonts.type.bold,
      fontSize: Fonts.size.sectionHeaderText,
      color: Colors.textDescription,
    },
    sectionHeaderTextV2: {
      marginLeft: 40 * scale,
      fontFamily: Fonts.type.bold,
      fontSize: Fonts.size.sectionHeaderText,
      color: Colors.textDescription,
      paddingBottom: 18 * scale,
    },

    yesNoContainer: {
      width: 160 * scale,
      height: 60 * scale,
    },

    modalBack: {
      alignItems:'center',
      paddingTop:200*scale,
      backgroundColor: 'rgba(0,0,0,0.6)',
      height: WINDOW_HEIGHT,
    },
    timeModal: {
      alignItems:'center',
      paddingTop:100*scale,
      backgroundColor: 'rgba(0,0,0,0.6)',
      height: WINDOW_HEIGHT,
    },
    modalCloseContainer: {
      position: 'absolute',
      width: 100 * scale,
      height: 100 * scale,
      right: 0 * scale,
      top: 0 * scale,
    },
    modalClose: {
      width: 50 * scale,
      height: 50 * scale,
      position: 'absolute',
      right: 45 * scale,
      top: 100 * scale,
    },
    dialogBack: {
      width: 660 * scale,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.snow,
    },
    header:{
      fontFamily: Fonts.type.base,
      fontSize: Fonts.size.h5,
      color:"black"
  },
  itemInput: {
    borderWidth: 0,
    width: 570 * scale,
    marginLeft: 30 * scale,
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.itemText,
  },

  button: {
    borderRadius: 65 * scale,
    marginBottom:40*scale,
    marginTop:40*scale,
    height: 90 * scale,
    width: 400 * scale,
    alignItems: 'center',
    textAlign:'center',
    justifyContent: 'center',
    backgroundColor: Colors.createZoneButton
},
Cancelbutton: {
  borderRadius: 65 * scale,
  marginBottom:40*scale,
  marginTop:40*scale,
  height: 90 * scale,
  width: 400 * scale,
  alignItems: 'center',
  textAlign:'center',
  justifyContent: 'center',
},
buttonCancelText: {
  textAlign:'center',
  justifyContent: 'center',
  fontFamily: Fonts.type.bold,
  fontSize: Fonts.size.itemText,
  color: 'black'
},
buttonText: {
    textAlign:'center',
    justifyContent: 'center',
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.itemText,
    color: Colors.snow
},

    dialogTitle: {
      fontFamily: Fonts.type.base,
      fontSize: Fonts.size.headerTitle,
      color: 'black',
      width: 500 * scale,
      textAlign: 'center',
    },
    dialogDescription: {
      fontFamily: Fonts.type.base,
      fontSize: Fonts.size.itemText,
      color: Colors.textDescription,
      width: 500 * scale,
      textAlign: 'center',
    },
    dialogYesContainer: {
      width: 480 * scale,
      height: 110 * scale,
      borderRadius: 55 * scale,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      backgroundColor: Colors.createZoneButton
    },
    dialogYesContainerV2: {
      width: 330 * scale,
      height: 80 * scale,
      borderRadius: 55 * scale,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      backgroundColor: Colors.createZoneButton
    },
    dialogYesText: {
      fontFamily: Fonts.type.bold,
      fontSize: Fonts.size.itemText,
      color: Colors.snow,
    },
    dialogNoText: {
      fontFamily: Fonts.type.base,
      fontSize: Fonts.size.medium,
      color: 'black',
    },
  },
  darkLabelContainer: {
    padding: Metrics.smallMargin,
    paddingBottom: Metrics.doubleBaseMargin,
    borderBottomColor: Colors.border,
    borderBottomWidth: 1,
    marginBottom: Metrics.baseMargin
  },
  darkLabel: {
    fontFamily: Fonts.type.bold,
    color: Colors.snow
  },
  groupContainer: {
    margin: Metrics.smallMargin,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  sectionTitle: {
    ...Fonts.style.h4,
    color: Colors.coal,
    backgroundColor: Colors.ricePaper,
    padding: Metrics.smallMargin,
    marginTop: Metrics.smallMargin,
    marginHorizontal: Metrics.baseMargin,
    borderWidth: 1,
    borderColor: Colors.ember,
    alignItems: 'center',
    textAlign: 'center'
  }
}

export default ApplicationStyles
