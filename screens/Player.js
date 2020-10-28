import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import Play from "../components/Icons/play";
import Pause from "../components/Icons/pause";
import Skip from "../components/Icons/Skip";
import { setPlayPause, trackUpdate, indexUpdate } from "../store/actions/track";
import Slider from "@react-native-community/slider";
// import { Audio } from "expo-av";

const Player = (props) => {
  const playbackInstance = useSelector((state) => state.track.playbackInstance);
  const isPlaying = useSelector((state) => state.track.isPlaying);
  const currentIndex = useSelector((state) => state.track.currentIndex);
  const position = useSelector((state) => state.track.position);
  const duration = useSelector((state) => state.track.duration);
  const selectedPlaylist = useSelector((state) => state.track.selectedPlaylist);
  const [isSeeking, setIsSeeking] = useState(false);
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
  const handlePlayPause = async () => {
    isPlaying
      ? await playbackInstance.pauseAsync()
      : await playbackInstance.playAsync();
    dispatch(setPlayPause(!isPlaying));
  };
  const handleIndexUpdate = () => {
    let newIndex = currentIndex + 1;
    if (newIndex >= sounds.length) {
      newIndex = newIndex - sounds.length;
    }
    dispatch(indexUpdate(newIndex));
  };
  const handleIndexUpdatePrev = () => {
    let newIndex = currentIndex - 1;
    if (newIndex < 0) {
      newIndex = newIndex + sounds.length;
    }
    dispatch(indexUpdate(newIndex));
  };
  const getSliderPosition = () => {
    if (playbackInstance != null && position != null && duration != null) {
      return position / duration;
    }
    return 0;
  };
  const onSeekSliderValueChange = (value) => {
    if (playbackInstance != null && !isSeeking) {
      setIsSeeking(true);
      playbackInstance.pauseAsync();
    }
  };
  const onSeekSliderSlidingComplete = async (value) => {
    if (playbackInstance != null) {
      setIsSeeking(false);
      const seekPosition = value * duration;
      playbackInstance.playFromPositionAsync(seekPosition);
    }
  };
  const _getMMSSFromMillis = (millis) => {
    const totalSeconds = millis / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);

    const padWithZero = (number) => {
      const string = number.toString();
      if (number < 10) {
        return "0" + string;
      }
      return string;
    };
    return padWithZero(minutes) + ":" + padWithZero(seconds);
  };

  const getTimestamp = () => {
    if (playbackInstance != null && position != null && duration != null) {
      return `${_getMMSSFromMillis(position)} / ${_getMMSSFromMillis(
        duration
      )}`;
    }
    return "";
  };
  return (
    <View style={styles.screen}>
      <LinearGradient
        colors={["#000", "#993608", "#b07053"]}
        style={styles.linearGradient}
      ></LinearGradient>
      <Text style={styles.header1}>PLAYING FROM PLAYLIST</Text>
      <Text style={styles.songtitle1}>{sounds[currentIndex].title}</Text>
      <Text style={styles.songartist1}>{sounds[currentIndex].artist}</Text>
      <Text style={styles.header2}>{playlist[selectedPlaylist - 1].title}</Text>
      <Text style={styles.time}>{getTimestamp()}</Text>
      <Image style={styles.mainImg} source={sounds[currentIndex].artwork} />
      <Slider
        style={styles.playbackSlider}
        value={getSliderPosition()}
        onValueChange={onSeekSliderValueChange}
        onSlidingComplete={onSeekSliderSlidingComplete}
        minimumTrackTintColor="#69f542"
        maximumTrackTintColor="#bbb"
        thumbTintColor="#fff"
      />
      <TouchableOpacity onPress={handlePlayPause} style={styles.play}>
        <View>{isPlaying ? <Pause /> : <Play />}</View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleIndexUpdate} style={styles.skip}>
        <View>
          <Skip />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleIndexUpdatePrev} style={styles.skipPrev}>
        <View>
          <Skip />
        </View>
      </TouchableOpacity>
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
    fontSize: 16,
  },
  songtitle1: {
    position: "absolute",
    bottom: 239,
    left: 15,
    margin: 6,
    backgroundColor: "transparent",
    color: "#fff",
    fontSize: 18,
  },
  songartist1: {
    position: "absolute",
    bottom: 239,
    right: 15,
    margin: 6,
    backgroundColor: "transparent",
    color: "#bfb8a3",
    fontSize: 17,
  },
  header2: {
    position: "absolute",
    top: 38,
    width: "100%",
    textAlign: "center",
    margin: 6,
    backgroundColor: "transparent",
    color: "#bfb8a3",
    fontSize: 17,
  },
  mainImg: {
    position: "absolute",
    top: 90,
    left: 43,
    height: 300,
    width: 300,
    borderColor: "#a80a3f",
    borderWidth: 2,
    borderRadius: 12,
  },
  play: {
    width: 80,
    height: 80,
    padding: 5,
    paddingLeft: 20,
    position: "absolute",
    bottom: 90,
    left: 148,
    zIndex: 30,
  },
  skip: {
    width: 70,
    height: 70,
    padding: 5,
    paddingLeft: 20,
    position: "absolute",
    bottom: 95,
    left: 240,
    zIndex: 30,
  },
  skipPrev: {
    width: 70,
    height: 70,
    padding: 5,
    paddingLeft: 20,
    position: "absolute",
    bottom: 95,
    left: 80,
    zIndex: 30,
    transform: [{ rotate: "180deg" }],
  },
  playbackSlider: {
    alignSelf: "stretch",
    position: "absolute",
    bottom: 178,
    left: 20,
    zIndex: 40,
    width: "90%",
    color: "white",
  },
  time: {
    position: "absolute",
    bottom: 194,
    right: 25,
    margin: 6,
    backgroundColor: "transparent",
    color: "#fff",
    fontSize: 14,
  },
});

export default Player;
