import colors from '@/constants/Colors';
import publicProfile from '@/utils/store/zustand/publicProfiles';
import React, { useState, FC } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';

interface Props {
  profileId: string;
}

const PublicProfileNav: FC<Props> = (props) => {
  
  const setNav = publicProfile((state) => state.setNav);
  const { profileId } = props;
  const [showCollections, setShowCollections] = useState(true); // Initial state
  const [showPlaylist, setShowPlaylist] = useState(false);

  const handleTabPress = (tabName: 'collections' | 'playlist') => {
    if (tabName === 'collections') {
      setShowCollections(true);
      setShowPlaylist(false);
      setNav(true)
    } else {
      setShowCollections(false);
      setShowPlaylist(true);
      setNav(false)
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, showCollections && styles.activeTab]}
          onPress={() => handleTabPress('collections')}
        >
          <Text style={[styles.tabText, showCollections && styles.activeTabText]}>Collections</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, showPlaylist && styles.activeTab]}
          onPress={() => handleTabPress('playlist')}
        >
          <Text style={[styles.tabText, showPlaylist && styles.activeTabText]}>Playlist</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 30,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    backgroundColor: '#eee',
    borderRadius: 10,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#eee',
    borderRadius: 10,
    width: '50%',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: colors.PRIMARY,
  },
  tabText: {
    fontSize: 16,
  },
   activeTabText: {
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PublicProfileNav;