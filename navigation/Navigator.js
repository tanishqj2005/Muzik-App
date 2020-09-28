import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import HomeSreen from "../screens/Home";
import PlayerSreen from "../screens/Player";

const MuzikNavigator = createStackNavigator({
  HomeScreen: HomeSreen,
  PlayerScreen: PlayerSreen,
});

export default createAppContainer(MuzikNavigator);
