import React, {useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {WebView} from 'react-native-webview';

const DEFAULT_URL = 'https://play.gumlet.io/embed/67062bea5d11d5a0fec5d026';

function App(): React.JSX.Element {
  const [inputUrl, setInputUrl] = useState(DEFAULT_URL);
  const [activeUrl, setActiveUrl] = useState(DEFAULT_URL);
  const [errorText, setErrorText] = useState('');

  const loadVideo = () => {
    const nextUrl = inputUrl.trim();
    const isValid = /^https?:\/\/.+/i.test(nextUrl);

    if (!isValid) {
      setErrorText('Please enter a valid URL starting with http:// or https://');
      return;
    }

    setErrorText('');
    setActiveUrl(nextUrl);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={styles.safeArea.backgroundColor} />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.card}>
          <View style={styles.logoWrap}>
            <Image source={require('./appstore.png')} resizeMode="contain" style={styles.logo} />
          </View>
          <Text style={styles.title}>Gumlet WebView Demo</Text>
          <Text style={styles.subtitle}>Paste any Gumlet embed URL and play on the same screen.</Text>

          <TextInput
            value={inputUrl}
            onChangeText={setInputUrl}
            placeholder="Enter video URL"
            placeholderTextColor="#94A3B8"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="url"
            style={styles.input}
          />

          <TouchableOpacity style={styles.button} onPress={loadVideo} activeOpacity={0.85}>
            <Text style={styles.buttonText}>Load Video</Text>
          </TouchableOpacity>

          {errorText ? <Text style={styles.errorText}>{errorText}</Text> : null}
        </View>

        <View style={styles.playerCard}>
          <WebView
            key={activeUrl}
            source={{uri: activeUrl}}
            style={styles.webView}
            allowsInlineMediaPlayback
            allowsFullscreenVideo
            mediaPlaybackRequiresUserAction={false}
            allowsProtectedMedia={Platform.OS === 'android'}
            javaScriptEnabled
            domStorageEnabled
            sharedCookiesEnabled
            thirdPartyCookiesEnabled
            originWhitelist={['*']}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0B1220',
    paddingTop: 36
  },
  container: {
    flex: 1,
    padding: 16,
    gap: 14,
  },
  card: {
    backgroundColor: '#111A2D',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  logoWrap: {
    width: 200,
    height: 192,
    alignSelf: 'center',
    marginBottom: 8,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  title: {
    color: '#F8FAFC',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    color: '#94A3B8',
    marginTop: 6,
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 10,
    color: '#E2E8F0',
    paddingHorizontal: 12,
    paddingVertical: 11,
    fontSize: 14,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#4F46E5',
    borderRadius: 10,
    paddingVertical: 11,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  errorText: {
    marginTop: 8,
    color: '#FCA5A5',
    fontSize: 13,
  },
  playerCard: {
    height: 210,
    overflow: 'hidden',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1E293B',
    backgroundColor: '#020617',
  },
  webView: {
    flex: 1,
    backgroundColor: '#020617',
  },
});

export default App;
