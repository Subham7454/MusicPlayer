import Slider from '@react-native-community/slider';
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useProgress} from 'react-native-track-player'; // Corrected import
import TrackPlayer from 'react-native-track-player';

const SongSlider = () => {
  const {position, duration} = useProgress();

  // Check if position and duration are valid numbers before rendering the slider
  const isReady = !isNaN(position) && !isNaN(duration) && duration > 0;

  return (
    <View>
      <Slider
        value={isReady ? position : 0} // Ensure slider value is valid
        minimumValue={0}
        maximumValue={isReady ? duration : 1} // Ensure maximum value is valid
        thumbTintColor="#FFF"
        minimumTrackTintColor="#1DB954" // Custom color for the played track
        maximumTrackTintColor="#b3b3b3" // Custom color for the unplayed track
        style={styles.sliderContainer}
        onSlidingComplete={async value => {
          // When user slides to a new position, seek to that position in the track
          await TrackPlayer.seekTo(value); // Make sure TrackPlayer is imported correctly
        }}
      />
      <View style={styles.timeContainer}>
        <Text style={styles.time}>
          {/* Convert position to minutes and seconds */}
          {new Date(position * 1000).toISOString().substring(15, 19)}
        </Text>
        <Text style={styles.time}>
          {/* Convert duration to minutes and seconds */}
          {new Date((duration - position) * 1000)
            .toISOString()
            .substring(15, 19)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    width: 350,
    height: 40,
    marginTop: 25,
    flexDirection: 'row',
  },
  timeContainer: {
    width: 340,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  time: {
    color: '#fff',
  },
});

export default SongSlider;
