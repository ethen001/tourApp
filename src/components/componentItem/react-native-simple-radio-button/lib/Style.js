var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
} = ReactNative;

var Style = StyleSheet.create({
  radioForm: {
  },

  radioWrap: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  radio: {
    justifyContent: 'center',
    alignItems: 'center',

    width: 10,
    height: 20,


    alignSelf: 'center',

    borderColor: '#2196f3',
    borderRadius: 10,
  },

  radioLabel: {
    paddingLeft: 10,
    lineHeight: 20,
  },

  radioNormal: {
    borderRadius: 10,
  },

  radioActive: {
    width: 10,
    height: 10,
    backgroundColor: '#2196f3',
  },

  labelWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center'
  },

  labelVerticalWrap: {
    flexDirection: 'column',
    paddingLeft: 10,
  },

  labelVertical: {
    paddingLeft: 10,
    marginBottom:10
  },

  formHorizontal: {
    flexDirection: 'row',
  },
});

module.exports = Style;
