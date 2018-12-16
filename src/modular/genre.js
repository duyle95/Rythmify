import queryString from "query-string";
import config from "../config";
import { apiCall } from "../services/api";

// Action Types
const FETCH_GENRES = "FETCH_GENRES";
const FETCH_GENRES_SUCCESS = "FETCH_GENRES_SUCCESS";
const FETCH_GENRE_PLAYLISTS = "FETCH_GENRE_PLAYLISTS";
const FETCH_GENRE_PLAYLISTS_SUCCESS = "FETCH_GENRE_PLAYLISTS_SUCCESS";
const FETCH_PLAYLIST = "FETCH_PLAYLIST";
const FETCH_PLAYLIST_SUCCESS = "FETCH_PLAYLIST_SUCCESS";

// Selectors

// Action Creators
export const fetchGenres = () => {
  const options = {
    // limit: 5,
    country: config.DEFAULT_COUNTRY_CODE
  };

  return apiCall({
    type: FETCH_GENRES,
    endpoint: `/browse/categories?${queryString.stringify(options)}`
  });
};

export const fetchGenrePlaylists = genre => {
  const options = {
    limit: 10,
    country: config.DEFAULT_COUNTRY_CODE
  };
  return apiCall({
    type: FETCH_GENRE_PLAYLISTS,
    endpoint: `/browse/categories/${genre}/playlists?${queryString.stringify(
      options
    )}`
  });
};

export const fetchPlaylist = playlistId =>
  apiCall({
    type: FETCH_PLAYLIST,
    endpoint: `/playlists/${playlistId}`
  });

// Reducer
const initialState = {
  genres: [],
  activeGenre: {
    playlists: {
      items: []
    }
  },
  playlist: {},
  isFetching: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GENRES:
      return { ...state, isFetching: true };
    case FETCH_GENRE_PLAYLISTS:
      return { ...state, isFetching: true };
    case FETCH_GENRES_SUCCESS:
      return {
        ...state,
        genres: [...state.genres, ...action.payload.data.categories.items],
        isFetching: false
      };
    case FETCH_GENRE_PLAYLISTS_SUCCESS:
      return {
        ...state,
        activeGenre: { ...action.payload.data },
        isFetching: false
      };
    case FETCH_PLAYLIST_SUCCESS:
      return {
        ...state,
        playlist: action.payload.data
      };
    default:
      return state;
  }
};
