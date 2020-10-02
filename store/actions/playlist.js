export const INITIALIZE = "INITIALIZE";
import { playlist, sounds } from "../../data/index";

export const initialize = () => {
  return (dispatch) => {
    dispatch({
      type: INITIALIZE,
      playlist: playlist,
      sounds:sounds,
      likedSongs: sounds,
    });
  };
};
