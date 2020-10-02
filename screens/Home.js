import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import PlaylistItem from "../components/playlistItem";
import Play from "../components/Icons/play";

const Home = (props) => {
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
                  fontSize: 28,
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
            <PlaylistItem artwork={itemData.item.artwork} artist={itemData.item.artist} title={itemData.item.title}/>
          )}
        />
        <View style={styles.play}>
          <Play/>
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
    height: 10,
    flexDirection: "column",
    marginTop: 30,
  },
  play: {
    width: 70,
    height: 70,
    padding: 9,
    paddingLeft: 20,
  },
});

export default Home;
