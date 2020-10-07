import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import { StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import PlaylistItem from "../components/playlistItem";

import { Audio } from "expo-av";

const audioBookPlaylist = [
  {
    title: "Kasoor by Tanishq",
    artist: "Tanishq",
    source: "Device",
    uri: "../data/sounds/kasoor.mp3",
    imageSource: "../data/artworks/time.png",
  },
];

const Home = (props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackInstance, setPlaybackInstance] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [volume, setVolume] = useState(1.0);
  const [isBuffering, setIsBuffering] = useState(false);
  const dispatch = useDispatch();
  const [selectedPlaylist, setSelectedPlaylist] = useState(1);
  const playlist = useSelector((state) => state.playlist.playlist);
  const songs = playlist.filter(
    (playlistitem) => playlistitem.id === selectedPlaylist
  )[0].items;
  const allSounds = useSelector((state) => state.playlist.sounds);
  const sounds = allSounds.filter(
    (soundObj) => songs.findIndex((song) => song === soundObj.id) !== -1
  );
  const onPlaybackStatusUpdate = (status) => {
    setIsBuffering(status.isBuffering);
  };
  const handlePlayPause = async () => {
    isPlaying
      ? await playbackInstance.pauseAsync()
      : await playbackInstance.playAsync();

    setIsPlaying(!isPlaying);
  };
  const loadAudio = async () => {
    try {
      const playbackInstance1 = new Audio.Sound();

      const status = {
        shouldPlay: isPlaying,
        volume,
      };

      playbackInstance1.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      await playbackInstance1.loadAsync(
        require("../data/sounds/kasoor.mp3"),
        status,
        false
      );
      setPlaybackInstance(playbackInstance1);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    const init = async () => {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
          playsInSilentModeIOS: true,
          interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
          shouldDuckAndroid: true,
          staysActiveInBackground: true,  
          playThroughEarpieceAndroid: true,
        });

        loadAudio();
      } catch (e) {
        console.log(e);
      }
    };
    init();
  }, []);
  return (
    <View style={styles.screen}>
      <LinearGradient
        colors={["#000", "#262e40", "#112757"]}
        style={styles.linearGradient}
      >
        <StatusBar backgroundColor="black" />
        <View style={styles.titleContainer}>
          <Text
            numberOfLines={2}
            style={{
              color: "#fff",
              marginBottom: 10,
              fontSize: 40,
              fontWeight: "600",
            }}
          >
            Your Muzik
          </Text>
        </View>
        <View style={styles.playlistBox}>
          <Text
            numberOfLines={1}
            style={{
              color: "#14de5e",
              marginBottom: 10,
              fontSize: 30,
              fontWeight: "500",
            }}
          >
            All Playlists
          </Text>
        </View>
        <View style={styles.playlistContainer}>
          <FlatList
            style={{ flex: 1 }}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={playlist}
            keyExtractor={(item) => item.id}
            renderItem={(itemData) => (
              <Text
                onPress={() => setSelectedPlaylist(itemData.item.id)}
                style={{
                  marginHorizontal: 25,
                  color:
                    itemData.item.id === selectedPlaylist ? "white" : "#676e69",
                  textAlign: "center",
                  fontSize: 23,
                }}
              >
                {itemData.item.title}
              </Text>
            )}
          />
        </View>
        <FlatList
          style={styles.playlistList}
          data={sounds}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => (
            <PlaylistItem
              artwork={itemData.item.artwork}
              artist={itemData.item.artist}
              title={itemData.item.title}
            />
          )}
        />
        <View style={styles.play}>
          <Button
            title="Play"
            color="#e6e612"
            // onPress={() => props.navigation.navigate("PlayerScreen")}
            onPress={handlePlayPause}
          />
        </View>
      </LinearGradient>
    </View>
  );
};

Home.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    borderBottomColor: "white",
    borderBottomWidth: 2,
    paddingBottom: 15,
  },
  titleContainer: {
    height: 80,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    textAlign: "center",
    marginTop: 20,
  },
  playlistBox: {
    height: 60,
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    textAlign: "center",
    marginLeft: 40,
    marginTop: 10,
    marginBottom: 20,
  },
  playlistContainer: {
    height: 75,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  playlistList: {
    width: "100%",
    height: 50,
    flexDirection: "column",
    marginTop: 30,
  },
  play: {
    width: 80,
    height: 80,
    bottom: -30,
  },
});

export default Home;
