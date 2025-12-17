/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { WebView } from 'react-native-webview';


function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <WebView
            scrollEnabled={false}
            allowsFullscreenVideo={true}
            allowsInlineMediaPlayback={true}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            mediaPlaybackRequiresUserAction={false}
            originWhitelist={['*']}
            style={{ height: 240, width: 320, alignSelf: "center", alignContent: "center" }}
            source={{ uri: 'https://play.gumlet.io/embed/64628b7110f328a292ade85e' }}
          />
          <Text>Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.</Text>
          <Text>Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.</Text>
          <Text>Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.</Text>
          <Text>Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.</Text>
          <Text>Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.</Text>
          <Text>Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.</Text>
          <WebView
            scrollEnabled={false}
            allowsFullscreenVideo={true}
            allowsInlineMediaPlayback={true}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            mediaPlaybackRequiresUserAction={false}
            originWhitelist={['*']}
            style={{ height: 240, width: 320, alignSelf: "center", alignContent: "center" }}
            source={{ uri: 'https://play.gumlet.io/embed/64628b7110f328a292ade85e' }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
