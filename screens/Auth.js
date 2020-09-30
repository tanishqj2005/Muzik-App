import React, { useState } from "react";
import { View, Button } from "react-native";
import * as Google from "expo-google-app-auth";

export default function Auth({ navigation }) {
  const [isProgress, setIsProgress] = useState(false);
  async function signInWithGoogleAsync() {
    setIsProgress(true);
    try {
      const result = await Google.logInAsync({
        androidClientId:
          "473889804939-gk70migvliar904co65bc0l9al7ijlau.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
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
      <Button
        title="Signin With Google"
        onPress={signInWithGoogleAsync}
        disabled={isProgress}
      />
    </View>
  );
}

Auth.navigationOptions = {
  header: null,
};

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "red",
  },

  button: {
    width: 192,
    height: 48,
  },
};
