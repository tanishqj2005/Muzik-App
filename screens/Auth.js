import React, { useEffect, useState } from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import * as Google from "expo-google-app-auth";
import { LinearGradient } from "expo-linear-gradient";
import { authenticate } from "../store/actions/auth";
import { useDispatch } from "react-redux";
import secrets from "../secrets";
import { initialize } from "../store/actions/playlist";

export default function Auth({ navigation }) {
  const [isProgress, setIsProgress] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initialize());
  }, []);
  async function signInWithGoogleAsync() {
    setIsProgress(true);
    try {
      const result = await Google.logInAsync({
        androidClientId: secrets.androidClientId,
        scopes: ["profile", "email"],
      });
      if (result.type === "success") {
        setIsProgress(false);
        dispatch(
          authenticate(
            result.accessToken,
            result.user.givenName,
            result.user.photoUrl,
            result.user.id
          )
        );
        navigation.navigate("MuzikMain", {
          userInfo: result,
        });
      } else {
        return;
      }
    } catch (e) {
      return;
    } finally {
      setIsProgress(false);
    }
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#000", "#000", "#383736"]}
        style={styles.linearGradient}
      >
        <View style={styles.textStart}>
          <Text style={{ fontSize: 81, fontWeight: "800", color: "white" }}>
            Login
          </Text>
        </View>
        <View style={{ ...styles.textEnd, paddingHorizontal: 92 }}>
          <Text style={{ fontSize: 81, fontWeight: "800", color: "white" }}>
            For
          </Text>
        </View>
        <View style={styles.textStart}>
          <Text style={{ fontSize: 81, fontWeight: "800", color: "white" }}>
            Some
          </Text>
        </View>
        <View style={styles.textEnd}>
          <Text style={{ fontSize: 81, fontWeight: "800", color: "white" }}>
            Muzik.
          </Text>
        </View>
        <View style={styles.button}>
          <Button
            title="Signin With Google"
            onPress={signInWithGoogleAsync}
            disabled={isProgress}
            color="#085c19"
          />
        </View>
      </LinearGradient>
    </View>
  );
}

Auth.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  button: {
    width: 192,
    height: 68,
    marginTop: 20,
    justifyContent: "center",
    padding: 10,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 9,
  },
  textStart: {
    width: "100%",
    justifyContent: "flex-start",
    marginVertical: 10,
    paddingHorizontal: 42,
    flexDirection: "row",
    height: 110,
  },
  textEnd: {
    width: "100%",
    justifyContent: "flex-end",
    marginVertical: 10,
    paddingHorizontal: 32,
    flexDirection: "row",
    height: 110,
  },
});
