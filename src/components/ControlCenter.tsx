import React, {useState, useEffect} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import TrackPlayer, {
  State,
  usePlaybackState,
  RepeatMode,
} from 'react-native-track-player';
import Iconasm from 'react-native-vector-icons/MaterialIcons';

const ControlCenter = () => {
  const playBackState = usePlaybackState();
  const [repeatMode, setRepeatMode] = useState<RepeatMode>(RepeatMode.Off); // State for repeat mode

  useEffect(() => {
    // Fetch the current repeat mode when the component mounts
    const fetchRepeatMode = async () => {
      const mode = await TrackPlayer.getRepeatMode();
      setRepeatMode(mode);
    };

    fetchRepeatMode();
  }, []);

  // Next button
  const skipToNext = async () => {
    await TrackPlayer.skipToNext();
  };

  // Previous button
  const skipToPrevious = async () => {
    await TrackPlayer.skipToPrevious();
  };

  // Play/pause toggle
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

  // Toggle repeat mode
  const toggleRepeatMode = async () => {
    let newMode;
    switch (repeatMode) {
      case RepeatMode.Off:
        newMode = RepeatMode.Track;
        break;
      case RepeatMode.Track:
        newMode = RepeatMode.Queue;
        break;
      case RepeatMode.Queue:
        newMode = RepeatMode.Off;
        break;
      default:
        newMode = RepeatMode.Off;
    }
    await TrackPlayer.setRepeatMode(newMode);
    setRepeatMode(newMode);
  };

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
      <Pressable onPress={toggleRepeatMode}>
        <Iconasm
          style={styles.iconRepeat}
          name={
            repeatMode === RepeatMode.Off
              ? 'repeat'
              : repeatMode === RepeatMode.Track
              ? 'repeat-one'
              : 'repeat'
          }
          size={40}
        />
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
  iconRepeat: {
    paddingLeft: 15,
  },
});
