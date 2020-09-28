import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Home = (props) => {
  return (
    <View style={styles.screen}>
      <LinearGradient
        colors={["#000","#262e40","#112757"]}
        style={styles.linearGradient}
      >
        <StatusBar backgroundColor="black" />
        <Text style={{color:'white', marginBottom:10}}>Here are all playlists !</Text>
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
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Home;
