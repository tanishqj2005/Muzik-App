import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import PlaylistItem from "../components/playlistItem";
import Play from "../components/Icons/play";
import Pause from "../components/Icons/pause";
import {
  setPlaybackInstance,
  setPlayPause,
  setSelectedPlaylist,
  trackUpdate,
} from "../store/actions/track";

import { Audio } from "expo-av";

const Home = (props) => {
  const playbackInstance = useSelector((state) => state.track.playbackInstance);
  const isPlaying = useSelector((state) => state.track.isPlaying);
  const currentIndex = useSelector((state) => state.track.currentIndex);
  const selectedPlaylist = useSelector((state) => state.track.selectedPlaylist);
  const volume = useSelector((state) => state.track.volume);
  const dispatch = useDispatch();
  const playlist = useSelector((state) => state.playlist.playlist);
  const songs = playlist.filter(
    (playlistitem) => playlistitem.id === selectedPlaylist
  )[0].items;
  const allSounds = useSelector((state) => state.playlist.sounds);
  const sounds = allSounds.filter(
    (soundObj) => songs.findIndex((song) => song === soundObj.id) !== -1
  );
  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      const lType = status.isLooping ? 0 : 1;
      dispatch(
        trackUpdate(
          status.isBuffering,
          status.positionMillis,
          status.durationMillis,
          status.isPlaying,
          status.shouldPlay,
          status.volume,
          lType
        )
      );
      // if (status.didJustFinish && !status.isLooping) {
      //   this._advanceIndex(true);
      //   this._updatePlaybackInstanceForIndex(true);
      // }
    } else {
      if (status.error) {
        console.log(`FATAL PLAYER ERROR: ${status.error}`);
      }
    }
  };

  const selectthis = (id) => {
    dispatch(setPlayPause(false));
    dispatch(setSelectedPlaylist(id));
  };

  const handlePlayPause = async () => {
    isPlaying
      ? await playbackInstance.pauseAsync()
      : await playbackInstance.playAsync();
    dispatch(setPlayPause(!isPlaying));
  };
  const loadAudio = async () => {
    try {
      if (playbackInstance != null) {
        playbackInstance.unloadAsync();
      }
      const playbackInstance1 = new Audio.Sound();

      const status = {
        shouldPlay: false,
        volume,
      };
      playbackInstance1.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      await playbackInstance1.loadAsync(
        sounds[currentIndex].source,
        status,
        false
      );
      dispatch(setPlaybackInstance(playbackInstance1));
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    const init = async () => {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
          playsInSilentModeIOS: true,
          interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
          shouldDuckAndroid: true,
          staysActiveInBackground: false,
          playThroughEarpieceAndroid: false,
        });
      } catch (e) {
        console.log(e);
      }
    };
    init();
  }, []);
  useEffect(() => {
    loadAudio();
  }, [selectedPlaylist]);
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
                onPress={() => selectthis(itemData.item.id)}
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
        <View style={styles.nowPlaying}>
          <TouchableWithoutFeedback
            style={{ flex: 1 }}
            onPress={() => {
              props.navigation.navigate("PlayerScreen");
            }}
          >
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Image
                source={sounds[currentIndex].artwork}
                style={styles.artwork}
              />
              <View style={{ flex: 1 }}>
                <Text style={{ color: "#fff" }}>
                  {sounds[currentIndex].title}
                </Text>
                <Text
                  style={{ color: "rgb(82, 88, 94)" }}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {sounds[currentIndex].artist}
                </Text>
              </View>
              <TouchableOpacity onPress={handlePlayPause}>
                <View style={styles.play}>
                  {isPlaying ? <Pause /> : <Play />}
                </View>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
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
  nowPlaying: {
    height: 70,
    borderBottomWidth: 0.5,
    borderBottomColor: "#bbb",
    padding: 10,
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "black",
    borderTopColor: "white",
    borderTopWidth: 2,
  },
  artwork: {
    width: 60,
    height: 50,
    marginRight: 15,
  },
  play: {
    width: 50,
    height: 50,
    padding: 5,
    paddingLeft: 20,
  },
});

export default Home;
