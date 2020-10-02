import { INITIALIZE } from "../actions/playlist";

const initialState = {
  playlist: [],
  sounds: [],
  likedSongs: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE:
      return {
        playlist: action.playlist,
        sounds: action.sounds,
        likedSongs: action.likedSongs,
      };
    default:
      return state;
  }
};
