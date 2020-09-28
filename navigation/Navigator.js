import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { Text } from "react-native";
import HomeScreen from "../screens/Home";
import PlayerScreen from "../screens/Player";
import UserScreen from "../screens/User";

const MuzikNavigator = createStackNavigator(
  {
    HomeScreen: HomeScreen,
    PlayerScreen: PlayerScreen,
  },
  {
    defaultNavigationOptions: {
      headerTintColor: "white",
    },
    mode: "modal",
  }
);

const MainNavigator = createMaterialBottomTabNavigator(
  {
    Muzik: {
      screen: MuzikNavigator,
      navigationOptions: {
        tabBarLabel: <Text>Music</Text>,
        tabBarIcon: (tabInfo) => {
          return (
            <Ionicons
              name="ios-musical-note"
              size={25}
              color={tabInfo.tintColor}
            />
          );
        },
        tabBarColor: "#0f0942",
      },
    },
    User: {
      screen: UserScreen,
      navigationOptions: {
        tabBarLabel: <Text>User</Text>,
        tabBarIcon: (tabInfo) => {
          return <Entypo name="user" size={25} color={tabInfo.tintColor} />;
        },
        tabBarColor: "#370757",
      },
    },
  },
  {
    shifting: true,
    activeTintColor: "white",
    barStyle: {
      backgroundColor: "black",
    },
  }
);

export default createAppContainer(MainNavigator);
