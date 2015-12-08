/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
var React = require('react-native');

var MainPage = require('./MainPage');
var AboutPage = require('./AboutPage');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var styles = React.StyleSheet.create({
  container: {
    flex: 1
  }
});

class TheIdentifiersReact extends React.Component {
  render() {
    return (
      <React.NavigatorIOS
        ref="nav"
        style={styles.container}
        initialRoute={{
          title: 'The Identifiers',
          component: MainPage,
          rightButtonTitle: 'About',
          onRightButtonPress: () => {
            this.refs.nav.navigator.push({
              title: "About",
              component: AboutPage,
              rightButtonTitle: 'Cancel',
              onRightButtonPress: () => { this.refs.nav.navigator.pop(); }
            });}
        }}/>
    );
  }
}

React.AppRegistry.registerComponent('TheIdentifiersReact',
  function() { return TheIdentifiersReact });
