'use strict';

var AdSupportIOS = require('AdSupportIOS');
var React = require('react-native');
var BannerAdUnitId = 'ca-app-pub-5859749532218051/2957818578';
var AdMob = require('NativeModules').AdMobManager;

var {
  ActionSheetIOS,
  AppRegistry,
  Image,
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
} = React;

var MainPage = React.createClass({

  getInitialState: function() {
    return {
      deviceID: 'No IDFA yet',
      hasAdvertiserTracking: 'unset',
    };
  },

  _onHasTrackingSuccess: function(hasTracking) {
    this.setState({
      'hasAdvertiserTracking': hasTracking,
    });
  },

  _onHasTrackingFailure: function(e) {
    this.setState({
      'hasAdvertiserTracking': 'Error!',
    });
  },

  _onDeviceIDSuccess: function(deviceID) {
    this.setState({
      'deviceID': deviceID,
    });
  },

  _onDeviceIDFailure: function(e) {
    this.setState({
      'deviceID': 'Error!',
    });
  },

  _onPressButton() {
     ActionSheetIOS.showShareActionSheetWithOptions({
       url: '',
       message: 'My advertising ID is '+this.state.deviceID+'.\n\nBrought To You By The Identifiers App',
       subject: 'My Advertising ID',
       excludedActivityTypes: [
         'com.apple.UIKit.activity.PostToTwitter',
         'com.apple.UIKit.activity.PostToFacebook',
         'com.apple.UIKit.activity.AssignToContact',
         'com.apple.UIKit.activity.PostToFlickr',
         'com.apple.UIKit.activity.PostToWeibo',
         'com.apple.UIKit.activity.PostToVimeo',
         'com.apple.UIKit.activity.TencentWeibo',
         'com.apple.UIKit.activity.Print',
         'com.apple.UIKit.activity.AssignToContact',
         'com.apple.UIKit.activity.SaveToCameraRoll',
         'com.apple.UIKit.activity.AddToReadingList'                                            ]
     },
     (error) => {
       console.error(error);
     },
     (success, method) => {
       var text;
       if (success) {
         text = `Shared via ${method}`;
       } else {
         text = 'You didn\'t share';
       }
       this.setState({text});
     });
  },

  render: function() {

    AdMob.showBannerOnBottomOfTheView(BannerAdUnitId);

    AdSupportIOS.getAdvertisingId(
      this._onDeviceIDSuccess,
      this._onDeviceIDFailure
    );

    AdSupportIOS.getAdvertisingTrackingEnabled(
      this._onHasTrackingSuccess,
      this._onHasTrackingFailure
    );

    return (
      <View style={styles.mainContainer}>
        <View style={styles.content}>
          <Text style={styles.welcome} onPress={this.showShareActionSheet}>
            {this.state.deviceID}
          </Text>
        </View>
        <View style={styles.footer}>
          <TouchableHighlight onPress={this._onPressButton} style={styles.button} underlayColor='#fff'>
          <Image  source={require('image!Icon-60')}
             style={styles.thumbnail} />
          </TouchableHighlight>
        </View>
      </View>
    );
  },


});

var styles = StyleSheet.create({
  thumbnail: {
    width: 48,
    height: 48,
    marginBottom: 5
  },
  welcome: {
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
  },
  mainContainer:{
      flex:1                  //Step 1
  },
  content:{
      backgroundColor:'#ebeef0',
      flex:1,                //Step 2
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
  },
  footer:{
      backgroundColor:'#ffffff',
      paddingBottom:50,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection:'row'    //Step 1
  },
});

module.exports = MainPage;
