import React from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Player = (props) => {
  return (
    <View style={styles.screen}>
      <LinearGradient
        colors={["#e9ed6d", "#6d7013", "#1b1c01"]}
        style={styles.linearGradient}
      >
        <StatusBar backgroundColor="#e9ed6d" />
        <Text style={{color:"#fff", marginBottom:10}}>This is User Screen !</Text>
      </LinearGradient>
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
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Player;