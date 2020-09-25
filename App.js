import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{ textAlign: "center", color: "#320faf" }}>
        This is the foundation of Muzik App! I will start working on it from
        next week. Very Excited Though!
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffcbab",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
});
