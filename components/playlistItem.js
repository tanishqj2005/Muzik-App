import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Play from "./Icons/play";

export default function Item({ artwork, title, artist }) {
  return (
    <View style={styles.item}>
      <Image source={artwork} style={styles.artwork} />
      <View style={{ flex: 1 }}>
        <Text style={{ color: "#fff" }}>{title}</Text>
        <Text
          style={{ color: "rgb(82, 88, 94)" }}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {artist}
        </Text>
      </View>
      {/* <TouchableOpacity>
        <View style={styles.play}>
          <Play />
        </View>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = {
  item: {
    height: 70,
    borderBottomWidth: 0.5,
    borderBottomColor: "#bbb",
    padding: 10,
    flexDirection: "row",
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
};
