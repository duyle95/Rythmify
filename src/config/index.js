const config = {
  API_URL: "https://api.spotify.com/v1",
  SPOTIFY_AUTHORIZE_URL: "https://accounts.spotify.com/authorize",
  SPOTIFY_AUTH_SCOPES:
    "user-read-recently-played user-top-read user-library-read",
  SPOTIFY_CLIENT_ID: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
  CALLBACK_URL: `${window.location.origin}/callback`,
  DEFAULT_COUNTRY_CODE: "FI"
};

export default config;
