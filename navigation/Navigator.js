import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { Text } from "react-native";
import HomeScreen from "../screens/Home";
import PlayerScreen from "../screens/Player";
import UserScreen from "../screens/User";
import AuthScreen from "../screens/Auth";

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
const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen,
  },
  {
    defaultNavigationOptions: {
      headerTintColor: "white",
    },
    mode: "modal",
  }
);

const MainTabNavigator = createMaterialBottomTabNavigator(
  {
    Muzik: {
      screen: MuzikNavigator,
      navigationOptions: {
        tabBarLabel: <Text>Muzik</Text>,
        tabBarIcon: (tabInfo) => {
          return (
            <Ionicons
              name="ios-musical-note"
              size={20}
              color={tabInfo.tintColor}
            />
          );
        },
        tabBarColor: "#1a1a1c",
      },
    },
    User: {
      screen: UserScreen,
      navigationOptions: {
        tabBarLabel: <Text>User</Text>,
        tabBarIcon: (tabInfo) => {
          return <Entypo name="user" size={20} color={tabInfo.tintColor} />;
        },
        tabBarColor: "#1a1a1c",
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

const MainNavigator = createSwitchNavigator({
  Auth: AuthNavigator,
  MuzikMain: MainTabNavigator,
});

export default createAppContainer(MainNavigator);
