import React from "react";
import { View, Text, StyleSheet, Button, StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Player = (props) => {
  return (
    <View style={styles.screen}>
      <LinearGradient
        colors={["#000", "#262e40", "#112757"]}
        style={styles.linearGradient}
      >
        <StatusBar backgroundColor="black" />
        <Text style={{color:"#fff", marginBottom:10}}>This is Player Screen !</Text>
        <Button
          title="Home"
          onPress={() => props.navigation.navigate("HomeScreen")}
        />
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
