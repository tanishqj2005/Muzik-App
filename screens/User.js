import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";

const User = (props) => {
  const userName = useSelector((state) => state.auth.userName);
  const userPhotoUri = useSelector((state) => state.auth.userPhoto);
  return (
    <View style={styles.screen}>
      <LinearGradient
        colors={["#000", "#262e40", "#112757"]}
        style={styles.linearGradient}
      >
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
              style={{
                color: "#fff",
                marginBottom: 10,
                fontSize: 61,
                fontWeight: "900",
              }}
            >
              Hi, <Text style={{ color: "#8ceb67" }}>{userName}!</Text>
            </Text>
          </View>
          <View style={styles.likeContainer}>
            <Text
              style={{
                color: "#e9f032",
                marginBottom: 10,
                fontSize: 38,
                fontWeight: "200",
              }}
            >
              Songs you like:
            </Text>
          </View>
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
  welcomeContainer: {
    height: 80,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "white",
    borderBottomWidth: 1,
    width: "100%",
    paddingBottom: 20,
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
});

export default User;
