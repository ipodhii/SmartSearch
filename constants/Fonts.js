import { Dimensions } from 'react-native'

const scale = Dimensions.get('window').width / 750

const type = {
  light: 'Lato-Light',
  base: 'Lato-Regular',
  bold: 'Lato-Bold',
  emphasis: 'Lato-HairlineItalic'
}

const size = {
  h1: 70 * scale,
  h2: 68 * scale,
  h3: 60 * scale,
  h4: 52 * scale,
  h5: 40 * scale,
  h6: 38 * scale,
  input: 36 * scale,
  regular: 34 * scale,
  medium: 28 * scale,
  timeMedium: 31 * scale,
  small: 24 * scale,
  smaller: 20 * scale,
  tiny: 17 * scale,
  headerTitle: 46 * scale,
  sectionHeaderText: 27 * scale,
  itemText: 30 * scale,
  dropText: 20 * scale,
}

const style = {
  h1: {
    fontFamily: type.base,
    fontSize: size.h1
  },
  h2: {
    fontWeight: 'bold',
    fontSize: size.h2
  },
  h3: {
    fontFamily: type.emphasis,
    fontSize: size.h3
  },
  h4: {
    fontFamily: type.base,
    fontSize: size.h4
  },
  h5: {
    fontFamily: type.base,
    fontSize: size.h5
  },
  h6: {
    fontFamily: type.emphasis,
    fontSize: size.h6
  },
  normal: {
    fontFamily: type.base,
    fontSize: size.regular
  },
  description: {
    fontFamily: type.base,
    fontSize: size.medium
  }
}

export default {
  type,
  size,
  style
}
