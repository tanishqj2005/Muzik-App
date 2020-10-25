import {
  SET_PLAYBACK_INSTANCE,
  SET_ISPLAYING,
  SET_SELECTED_PLAYLIST,
} from "../actions/track";

const initialState = {
  isPlaying: false,
  shouldPlay: false,
  playbackInstance: null,
  currentIndex: 0,
  volume: 1,
  isBuffering: false,
  position: 0,
  duration: 0,
  loopingType: 0,
  selectedPlaylist: 1,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PLAYBACK_INSTANCE:
      return {
        ...state,
        playbackInstance: action.playbackInstance,
      };
    case SET_ISPLAYING:
      return {
        ...state,
        isPlaying: action.isPlaying,
      };
    case SET_SELECTED_PLAYLIST:
      return {
        ...state,
        selectedPlaylist: action.playlistId,
      };
    default:
      return state;
  }
};
