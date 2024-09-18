import React, {useState, useEffect} from 'react';

import type {PropsWithChildren} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  SafeAreaViewComponent,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {setupPlayer, addTrack} from '../musicPlayerService';

function App(): React.JSX.Element {
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  async function setup() {
    let isSetup = await setupPlayer();
    if (isSetup) {
      await addTrack();
    }

    setIsPlayerReady(isSetup);
  }

  useEffect(() => {
    setup();
  }, []);
  if (!isPlayerReady) {
    return (
      <SafeAreaView>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView contentInsetAdjustmentBehavior="automatic"></ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default App;
