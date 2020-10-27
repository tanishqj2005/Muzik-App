export const SET_PLAYBACK_INSTANCE = "SET_PLAYBACK_INSTANCE";
export const SET_ISPLAYING = "SET_ISPLAYING";
export const SET_SELECTED_PLAYLIST = "SET_SELECTED_PLAYLIST";
export const TRACK_UPDATE = "TRACK_UPDATE";

export const setPlaybackInstance = (playbackInstance) => {
  return async (dispatch) => {
    dispatch({
      type: SET_PLAYBACK_INSTANCE,
      playbackInstance,
    });
  };
};
export const setPlayPause = (isPlaying) => {
  return async (dispatch) => {
    dispatch({
      type: SET_ISPLAYING,
      isPlaying,
    });
  };
};
export const setSelectedPlaylist = (playlistId) => {
  return async (dispatch) => {
    dispatch({
      type: SET_SELECTED_PLAYLIST,
      playlistId,
    });
  };
};
export const trackUpdate = (
  isBuffering,
  positionMillis,
  durationMillis,
  isPlaying,
  shouldPlay,
  volume,
  loopingType
) => {
  return async (dispatch) => {
    dispatch({
      type: TRACK_UPDATE,
      isBuffering,
      positionMillis,
      durationMillis,
      isPlaying,
      shouldPlay,
      volume,
      loopingType,
    });
  };
};
