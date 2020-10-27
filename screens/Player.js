import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Button,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import Play from "../components/Icons/play";
import Pause from "../components/Icons/pause";
import {
  setPlaybackInstance,
  setPlayPause,
  setSelectedPlaylist,
  trackUpdate,
  indexUpdate,
} from "../store/actions/track";

import { Audio } from "expo-av";

const Player = (props) => {
  const playbackInstance = useSelector((state) => state.track.playbackInstance);
  const isPlaying = useSelector((state) => state.track.isPlaying);
  const currentIndex = useSelector((state) => state.track.currentIndex);
  const selectedPlaylist = useSelector((state) => state.track.selectedPlaylist);
  // const volume = useSelector((state) => state.track.volume);
  const dispatch = useDispatch();
  const playlist = useSelector((state) => state.playlist.playlist);
  const songs = playlist.filter(
    (playlistitem) => playlistitem.id === selectedPlaylist
  )[0].items;
  const allSounds = useSelector((state) => state.playlist.sounds);
  const sounds = allSounds.filter(
    (soundObj) => songs.findIndex((song) => song === soundObj.id) !== -1
  );
  return (
    <View style={styles.screen}>
      <LinearGradient
        colors={["#000", "#262e40", "#112757"]}
        style={styles.linearGradient}
      ></LinearGradient>
      <Text style={styles.header1}>PLAYING  FROM  PLAYLIST</Text>
      <Text style={styles.header2}>{playlist[selectedPlaylist - 1].title}</Text>
      <Image style={styles.mainImg} source={sounds[currentIndex].artwork}/>
    </View>
  );
};

Player.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
    flexDirection: "column",
    borderBottomColor: "white",
    borderBottomWidth: 2,
  },
  header1: {
    position: "absolute",
    top: 7,
    width: "100%",
    textAlign: "center",
    margin: 6,
    backgroundColor: "transparent",
    color: "#48c210",
    fontSize:16
  },
  header2: {
    position: "absolute",
    top: 38,
    width: "100%",
    textAlign: "center",
    margin: 6,
    backgroundColor: "transparent",
    color: "#bfb8a3",
    fontSize:17
  },
  mainImg:{
    position:'absolute',
    top:90,
    left:43,
    height:300,
    width:300,
    borderColor:'#a80a3f',
    borderWidth:2,
    borderRadius:12
  }
});

export default Player;
