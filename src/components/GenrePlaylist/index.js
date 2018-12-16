import classnames from "classnames";
import { isEmpty } from "lodash";
import React from "react";
import { connect } from "react-redux";
import { fetchPlaylist } from "../../modular/genre";
import {
  addTrackToPlaylist,
  fetchUserPlaylistsIfNeeded
} from "../../modular/playlist";
import "../UserPlaylists/UserPlaylists.scss";
import "./GenrePlaylist.scss";

const Track = props => (
  <div className="genre-playlist-track">
    <div className="genre-playlist-track__info">
      <div className="genre-playlist-track__name">
        <div className="genre-playlist-track__name--play">
          {props.track.name || "No name"}
          {"  "}
          {props.track.preview_url && (
            <span
              onClick={() =>
                props.handlePlayer(props.track.id, props.track.preview_url)
              }
            >
              {props.playingTrackId === props.track.id &&
              props.isPlaying === true ? (
                <i className="fas fa-pause" />
              ) : (
                <i className="fas fa-play" />
              )}
            </span>
          )}
        </div>
        <div
          className="genre-playlist-track--add"
          onClick={() => props.openModal(props.track.id)}
        >
          <i className="fas fa-plus" />
        </div>
      </div>
      <span className="genre-playlist-track__artist">
        {props.track.artists.map(artist => artist.name).join(", ")}
      </span>
      &nbsp;•&nbsp;
      <span className="genre-playlist-track__album">
        {props.track.album.name}
      </span>
      &nbsp;•&nbsp;
      <span>{props.track.preview_url ? "With" : "No"} Preview</span>
    </div>
  </div>
);

class GenrePlaylist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playingTrackId: null,
      play: false,
      pause: false,
      trackUrl: null,
      visible: false,
      selectedTrackId: null
    };

    this.audio = null;
  }

  componentDidMount() {
    this.props.fetchPlaylist(this.props.match.params.playlistId);
  }
  componentWillUnmount() {
    if (this.audio) this.audio.pause();
  }
  handlePlayer = (trackId, trackUrl) => {
    if (this.state.playingTrackId === null) {
      this.audio = new Audio(trackUrl);
      this.setState({
        playingTrackId: trackId,
        trackUrl
      });
      this.play();
    } else if (
      this.state.playingTrackId === trackId &&
      this.state.pause === false
    ) {
      this.pause();
    } else if (
      this.state.playingTrackId === trackId &&
      this.state.pause === true
    ) {
      this.play();
    } else if (this.state.playingTrackId !== trackId) {
      this.pause();
      this.audio = new Audio(trackUrl);
      this.setState({
        playingTrackId: trackId,
        trackUrl
      });
      this.play();
    }
  };

  play = (trackId, trackUrl) => {
    this.setState({
      play: true,
      pause: false
    });
    this.audio.play();
  };

  pause = () => {
    this.setState({ play: false, pause: true });
    this.audio.pause();
  };

  openModal = trackId => {
    this.setState({ visible: true, selectedTrackId: trackId });
  };
  closeModal = () => {
    this.setState({ visible: false });
  };

  addTrackToPlaylist = playlistId => {
    this.props.addTrackToPlaylist(this.state.selectedTrackId, playlistId);
    this.setState({ selectedTrackId: null, visible: false });
  };

  render() {
    if (isEmpty(this.props.playlist)) {
      return <div>Loading</div>;
    }

    const {
      images,
      name,
      description,
      tracks: { items }
    } = this.props.playlist;
    return (
      <div className="genre-playlist">
        <div className="genre-playlist-info">
          <div className="genre-playlist-info--sticky">
            {images[0] ? (
              <img
                className="genre-playlist-info__image"
                src={images[0].url}
                alt={name}
              />
            ) : (
              <span
                className="fa-stack fa-8x"
                style={{ width: 250, height: 250 }}
              >
                <i className="fas fa-square fa-stack-2x" />
                <i className="fas fa-music fa-stack-1x fa-inverse" />
              </span>
            )}
            <div>
              <p className="genre-playlist-info__name">{name}</p>
              <p className="genre-playlist-info__description">{description}</p>
            </div>
          </div>
        </div>
        <div className="genre-playlist-tracks">
          {!isEmpty(items) ? (
            items.map((item, i) => (
              <Track
                key={i}
                {...item}
                handlePlayer={this.handlePlayer}
                playingTrackId={this.state.playingTrackId}
                isPlaying={this.state.play}
                openModal={this.openModal}
              />
            ))
          ) : (
            <span className="genre-playlist--empty-text">
              Oops! This playlist doesn't have any tracks. Find out your taste
              of music in the Browse tab
            </span>
          )}
        </div>
        {this.state.visible && (
          <Modal
            visible={this.state.visible}
            closeModal={this.closeModal}
            fetchUserPlaylistsIfNeeded={this.props.fetchUserPlaylistsIfNeeded}
            userPlaylists={this.props.userPlaylists}
            selectedTrackId={this.state.selectedTrackId}
            addTrackToPlaylist={this.addTrackToPlaylist}
          />
        )}
      </div>
    );
  }
}

class Modal extends React.PureComponent {
  componentDidMount() {
    this.props.fetchUserPlaylistsIfNeeded();
  }
  render() {
    const modalClass = classnames("modal", {
      visible: this.props.visible,
      invisible: !this.props.visible
    });
    return (
      // TODO: disable background scroll effect when modal is visible
      <div className={modalClass}>
        <div className="modal-content">
          <button
            onClick={this.props.closeModal}
            className="modal-button--close"
          >
            Close
          </button>
          <div className="user-playlists__content">
            <div className="user-playlists__list">
              {this.props.userPlaylists.map((playlist, i) => (
                <UserPlaylistsItem
                  key={i}
                  {...playlist}
                  selectedTrackId={this.props.selectedTrackId}
                  addTrackToPlaylist={this.props.addTrackToPlaylist}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const UserPlaylistsItem = props => (
  <div className="user-playlists-item">
    <div
      className="user-playlists-item__image"
      onClick={() => props.addTrackToPlaylist(props.id)}
    >
      {!isEmpty(props.images) ? (
        <img src={props.images[0].url} alt={props.name} width={250} />
      ) : (
        <span className="fa-stack fa-8x" style={{ width: 250, height: 250 }}>
          <i className="fas fa-square fa-stack-2x" />
          <i className="fas fa-music fa-stack-1x fa-inverse" />
        </span>
      )}
    </div>
    <div className="user-playlists-item__info">
      <p style={{ color: "white" }}>{props.name}</p>
    </div>
  </div>
);
const mapStateToProps = state => ({
  playlist: state.genre.playlist,
  userPlaylists: state.playlist.userPlaylists
});

export default connect(
  mapStateToProps,
  { fetchPlaylist, fetchUserPlaylistsIfNeeded, addTrackToPlaylist }
)(GenrePlaylist);
