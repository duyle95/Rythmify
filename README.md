# Rythmify

This web app is just another long-lost brother of Spotify, which utilizes Spotify API.

http://duyn55-rythmify.surge.sh/

## Getting Started

### Spotify API Scopes

- Authorization
- Browse(Genres and Moods)
- Create a playlist
- Add a track to playlist

### Prerequisites

`npm@6.x` and `node@8.x`

### Installing

Create a new App from [Spotify Dashboard](https://developer.spotify.com/dashboard/).

Add `localhost:3000/callback` as `Redirect URI`.

Create `env.js` file at the root of the folder. Fill `REACT_APP_SPOTIFY_CLIENT_ID` with `Client ID` from app settings to this file.

## Built with

- React Redux (Duck Modular)
- Sass
- BEM architecture

## Deployment

Deploy with Surge.

## Acknowledgements

- Login Background Photo by Aditya Chinchure on Unsplash

## License

MIT
