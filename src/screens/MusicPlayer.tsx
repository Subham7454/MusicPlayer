import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {palyListData} from '../constant';
import SongInfo from '../components/SongInfo';
import SongSlider from '../components/SongSlider';
import ControlCenter from '../components/ControlCenter';
import TrackPlayer, {
  Track,
  useTrackPlayerEvents,
  Event, // Correctly import 'Event'
} from 'react-native-track-player';

const {width} = Dimensions.get('window');

const MusicPlayer = () => {
  const [track, setTrack] = useState<Track | null>(null); // Initialize with null

  useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async event => {
    switch (event.type) {
      case Event.PlaybackActiveTrackChanged:
        if (event.index !== undefined) {
          const playingTrack = await TrackPlayer.getTrack(event.index);
          setTrack(playingTrack || null); // Set to 'playingTrack' or 'null' if 'playingTrack' is undefined
        } else {
          setTrack(null); // Set to 'null' if index is undefined
        }
        break;

      default:
        break;
    }
  });

  const renderArtWork = () => {
    return (
      <View style={styles.listArtWrapper}>
        <View style={styles.albumArtImg}>
          <Image
            style={styles.albumArtImg}
            source={{
              uri:
                track?.artwork?.toString() || 'https://via.placeholder.com/150', // Use a placeholder image if no artwork
            }}
            resizeMode="cover" // Cover the entire view
            onError={() => console.warn('Failed to load artwork')} // Handle image loading errors
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={palyListData}
        renderItem={renderArtWork}
        keyExtractor={song => song.id.toString()}
      />

      <SongInfo track={track} />
      <SongSlider />
      <ControlCenter />
    </View>
  );
};

export default MusicPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#001d23',
  },
  listArtWrapper: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  albumContainer: {
    width: 300,
    height: 300,
  },
  albumArtImg: {
    width: 300, // Ensure a fixed width
    height: 300, // Ensure a fixed height
    borderRadius: 4,
  },
});
