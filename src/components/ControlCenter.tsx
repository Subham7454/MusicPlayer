import {Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import TrackPlayer, {State, usePlaybackState} from 'react-native-track-player';
import Iconasm from 'react-native-vector-icons/MaterialIcons';

const ControlCenter = () => {
  const playBackState = usePlaybackState();

  // next button
  const skipToNext = async () => {
    await TrackPlayer.skipToNext();
  };

  // previous button
  const skipToPrevious = async () => {
    await TrackPlayer.skipToPrevious(); // corrected to skip to previous
  };

  // play/pause toggle
  const togglePlay = async (playback: State | undefined) => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack !== null && playback !== undefined) {
      if (playback === State.Paused || playback === State.Ready) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  };

  // Extract only the valid state from playBackState
  const currentPlaybackState =
    playBackState !== undefined && 'state' in playBackState
      ? playBackState.state
      : playBackState;

  return (
    <View style={styles.container}>
      <Pressable onPress={skipToPrevious}>
        <Iconasm style={styles.icon} name="skip-previous" size={40} />
      </Pressable>
      <Pressable
        onPress={() => togglePlay(currentPlaybackState as State | undefined)}>
        <Iconasm
          style={styles.icon}
          name={currentPlaybackState === State.Playing ? 'pause' : 'play-arrow'}
          size={75}
        />
      </Pressable>
      <Pressable onPress={skipToNext}>
        <Iconasm style={styles.icon} name="skip-next" size={40} />
      </Pressable>
    </View>
  );
};

export default ControlCenter;

const styles = StyleSheet.create({
  container: {
    marginBottom: 56,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    color: '#FFFFFF',
  },
  playButton: {
    marginHorizontal: 24,
  },
});
