export const INITIALIZE = "INITIALIZE";
export const LIKEASONG = "LIKEASONG";
import { playlist, sounds } from "../../data/index";

export const initialize = () => {
  return (dispatch) => {
    dispatch({
      type: INITIALIZE,
      playlist: playlist,
      sounds: sounds,
    });
  };
};

export const likeASong = (id) => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://muzikapp-a57d2.firebaseio.com/likedSongs/${userId}.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          SongId: id,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Something Went Wrong!");
    }
    const respData = response.json();
    const allSounds = getState().playlist.sounds;
    const song = allSounds.filter((soundObj) => soundObj.id === id);
    dispatch({
      type: LIKEASONG,
      song: song[0],
    });
  };
};

export const fetchLikedSongs = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://muzikapp-a57d2.firebaseio.com/likedSongs/${userId}.json`
    );
    if (!response.ok) {
      throw new Error("Something Went Wrong!");
    }
    const respData = await response.json();
    console.log(respData);
  };
};
