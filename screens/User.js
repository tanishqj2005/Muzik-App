import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Button,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector, useDispatch } from "react-redux";
import PlaylistItem from "../components/playlistItem";
import { logout } from "../store/actions/auth";

const User = (props) => {
  const userName = useSelector((state) => state.auth.userName);
  const playbackInstance = useSelector((state) => state.track.playbackInstance);
  const userPhotoUri = useSelector((state) => state.auth.userPhoto);
  const likedSongs = useSelector((state) => state.playlist.likedSongs);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    playbackInstance.unloadAsync();
    dispatch(logout());
    props.navigation.navigate("Auth");
  };
  return (
    <View style={styles.screen}>
      <LinearGradient
        colors={["#000", "#262e40", "#112757"]}
        style={styles.linearGradient}
      >
        <View style={styles.button}>
          <Button title="Logout" onPress={logoutHandler} color="#562bff" />
        </View>
        <View style={styles.imgBox}>
          <View style={styles.imgContainer}>
            <Image
              style={styles.tinyLogo}
              source={{
                uri: userPhotoUri,
              }}
            />
          </View>
        </View>
        <ScrollView
          style={styles.ScrollView}
          contentContainerStyle={{
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <View style={styles.welcomeContainer}>
            <Text
              numberOfLines={2}
              style={{
                color: "#fff",
                marginBottom: 10,
                fontSize: 40,
                fontWeight: "900",
                textAlign: "center",
              }}
            >
              Hi,{" "}
              <Text style={{ color: "#8ceb67", textAlign: "center" }}>
                {userName} !
              </Text>
            </Text>
          </View>
          <View style={styles.likeContainer}>
            <Text
              style={{
                color: "#e9f032",
                marginBottom: 10,
                fontSize: 33,
                fontWeight: "200",
              }}
            >
              Songs you like:
            </Text>
          </View>
          <FlatList
            style={styles.playlistList}
            data={likedSongs}
            keyExtractor={(item) => item.id}
            renderItem={(itemData) => (
              <PlaylistItem
                artwork={itemData.item.artwork}
                artist={itemData.item.artist}
                title={itemData.item.title}
              />
            )}
          />
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

User.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  tinyLogo: {
    width: "100%",
    height: "100%",
    borderRadius: 22,
  },
  linearGradient: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  button: {
    width: 120,
    height: 68,
    marginTop: 20,
    marginLeft: 20,
    position: "absolute",
    top: 0,
    left: 0,
    justifyContent: "center",
    padding: 10,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 9,
  },
  welcomeContainer: {
    height: 120,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "white",
    borderBottomWidth: 1,
    width: "100%",
    paddingBottom: 10,
    textAlign: "center",
  },
  likeContainer: {
    height: 60,
    left: -50,
    position: "relative",
    marginTop: 30,
  },
  imgContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    marginTop: 10,
    marginRight: 10,
    padding: 15,
    height: "60%",
    width: "20%",
    borderRadius: 32,
    borderColor: "white",
    borderWidth: 1,
  },
  imgBox: {
    width: "100%",
    height: "20%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  ScrollView: {
    height: "80%",
    width: "100%",
    flexDirection: "column",
    borderBottomColor: "white",
    borderBottomWidth: 2,
  },
  playlistList: {
    width: "100%",
    height: 220,
    flexDirection: "column",
    marginTop: 30,
  },
});

export default User;
