import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Home = (props) => {
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

        <Button
          title="Player"
          onPress={() => props.navigation.navigate("PlayerScreen")}
        />
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
});

export default Home;
