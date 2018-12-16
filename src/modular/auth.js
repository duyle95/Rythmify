import queryString from "query-string";
import config from "../config";
import { apiCall } from "../services/api";

// # Action Types
const FETCH_USER_PROFILE = "user/FETCH_USER_PROFILE";
const FETCH_USER_PROFILE_SUCCESS = "user/FETCH_USER_PROFILE_SUCCESS";
const FETCH_USER_PROFILE_FAIL = "user/FETCH_USER_PROFILE_FAIL";
// # Selectors

// # Action Creators

// call when user click login button OR when access token expires
export const authorizeUser = () => dispatch => {
  const options = {
    client_id: config.SPOTIFY_CLIENT_ID,
    redirect_uri: config.CALLBACK_URL,
    scope: config.SPOTIFY_AUTH_SCOPES,
    response_type: "token"
  };

  const loginURL = `${config.SPOTIFY_AUTHORIZE_URL}?${queryString.stringify(
    options
  )}`;
  window.location.href = loginURL;
};

// call when receive access_token after call authorizeUser
export const saveLoginCredentials = () => dispatch => {
  const { access_token } = queryString.parse(window.location.hash);
  if (access_token) {
    localStorage.setItem("rythmify_token", access_token);

    window.location.href = window.location.origin;
  } else {
    window.location.href = `${window.location.origin}/login`;
  }
};

// fetch /me data
// NOTE: make a new user.js module
export const fetchUser = () =>
  apiCall({
    type: FETCH_USER_PROFILE,
    endpoint: "/me"
  });

// Reducer
const initialState = {
  user: {}
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_PROFILE_SUCCESS: {
      return { ...state, ...{ user: action.payload.data } };
    }
    case FETCH_USER_PROFILE_FAIL: {
      return { ...state, ...action.payload.data };
    }
    case FETCH_USER_PROFILE: {
      return { ...state, ...action.payload.data };
    }
    default:
      return state;
  }
}
