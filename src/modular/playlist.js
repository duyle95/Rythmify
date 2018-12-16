import { isEmpty } from "lodash";
import { apiCall } from "../services/api";

// Action Types
const FETCH_USER_PLAYLISTS = "FETCH_USER_PLAYLISTS";
const FETCH_USER_PLAYLISTS_SUCCESS = "FETCH_USER_PLAYLISTS_SUCCESS";

const CREATE_PLAYLIST = "CREATE_PLAYLIST";
const CREATE_PLAYLIST_SUCCESS = "CREATE_PLAYLIST_SUCCESS";

const ADD_TRACK_TO_PLAYLIST = "ADD_TRACK_TO_PLAYLIST";
const ADD_TRACK_TO_PLAYLIST_SUCCESS = "ADD_TRACK_TO_PLAYLIST_SUCCESS";
// Selectors

// Action Creators
function shouldFetchUserPlaylists(state) {
  const playlist = state.playlist;
  if (isEmpty(playlist.userPlaylists)) {
    return true;
  } else if (playlist.isFetching) {
    return false;
  } else {
    // TODO: not sure what will happen here
    return false;
  }
}
export const fetchUserPlaylists = () =>
  apiCall({
    type: FETCH_USER_PLAYLISTS,
    endpoint: "/me/playlists"
  });

export const fetchUserPlaylistsIfNeeded = () => {
  return (dispatch, getState) => {
    if (shouldFetchUserPlaylists(getState())) {
      console.log("should fetch user playlists");
      return dispatch(fetchUserPlaylists());
    } else {
      console.log("should not fetch");
      return Promise.resolve();
    }
  };
};

export const createPlaylist = (userId, params) =>
  apiCall({
    type: CREATE_PLAYLIST,
    endpoint: `/users/${userId}/playlists`,
    method: "POST",
    data: params
  });

export const addTrackToPlaylist = (trackId, playlistId) =>
  apiCall({
    type: ADD_TRACK_TO_PLAYLIST,
    endpoint: `/playlists/${playlistId}/tracks`,
    method: "POST",
    data: {
      uris: [`spotify:track:${trackId}`]
    }
  });
// Reducer
const initialState = {
  recentlyCreatedPlaylist: {},
  userPlaylists: [],
  isFetching: false,
  isCreatingPlaylist: false,
  isAddingTrack: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_PLAYLISTS:
      return { ...state, isFetching: true };
    case FETCH_USER_PLAYLISTS_SUCCESS:
      return {
        ...state,
        userPlaylists: action.payload.data.items,
        isFetching: false
      };
    case CREATE_PLAYLIST:
      return {
        ...state,
        isCreatingPlaylist: true
      };
    case CREATE_PLAYLIST_SUCCESS:
      return {
        ...state,
        recentlyCreatedPlaylist: action.payload.data,
        isCreatingPlaylist: false
      };
    case ADD_TRACK_TO_PLAYLIST:
      return {
        ...state,
        isAddingTrack: true
      };
    case ADD_TRACK_TO_PLAYLIST_SUCCESS:
      alert("Successful!!");
      return {
        ...state,
        isAddingTrack: false
      };
    default:
      return state;
  }
};
