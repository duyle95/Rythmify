import { isEmpty } from "lodash";
import React, { Component } from "react";
import Modal from "react-awesome-modal";
import { connect } from "react-redux";
import { createPlaylist, fetchUserPlaylists } from "../../modular/playlist";
import history from "../../services/history";
import "./UserPlaylists.scss";

// TODO: reuseable Playlist components...
const UserPlaylistsItem = props => (
  <div className="user-playlists-item">
    <div
      className="user-playlists-item__image"
      onClick={() => history.push(`/playlist/${props.id}`)}
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
      <p onClick={() => history.push(`/playlist/${props.id}`)}>{props.name}</p>
    </div>
  </div>
);

export class UserPlaylists extends Component {
  state = {
    playlistName: "",
    visible: false
  };
  componentDidMount() {
    this.props.fetchUserPlaylists();
  }

  openModal = () => {
    this.setState({ visible: true });
  };
  closeModal = () => {
    this.setState({ visible: false });
  };
  render() {
    return (
      <div className="user-playlists-container">
        <span className="user-playlists__header">YOUR PLAYLISTS</span>
        <button
          className="user-playlists__button"
          onClick={() => this.openModal()}
        >
          New Playlist
        </button>
        <div className="user-playlists__content">
          <div className="user-playlists__list">
            {this.props.userPlaylists.map((playlist, i) => (
              <UserPlaylistsItem key={i} {...playlist} />
            ))}
          </div>
        </div>
        <Modal
          visible={this.state.visible}
          width="400"
          height="300"
          effect="fadeInUp"
          onClickAway={() => this.closeModal()}
        >
          <div className="user-playlists__modal">
            <h2 className="user-playlists__label">CREATE NEW PLAYLIST</h2>
            <input
              value={this.state.playlistName}
              className="user-playlists__input"
              placeholder="Start typing..."
              onChange={e => this.setState({ playlistName: e.target.value })}
            />
            <br />
            <div className="user-playlists__button-group--horizontal">
              <div className="user-playlists__button-group-item">
                <button
                  className="user-playlists__button--cancel"
                  onClick={() => this.closeModal()}
                >
                  Cancel
                </button>
              </div>
              <div className="user-playlists__button-group-item">
                <button
                  className="user-playlists__button--create"
                  onClick={async () => {
                    await this.props.createPlaylist(this.props.user.id, {
                      name: this.state.playlistName
                    });
                    history.replace(
                      `/playlist/${this.props.recentlyCreatedPlaylist.id}`
                    );
                  }}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  userPlaylists: state.playlist.userPlaylists,
  recentlyCreatedPlaylist: state.playlist.recentlyCreatedPlaylist
});

const mapDispatchToProps = { fetchUserPlaylists, createPlaylist };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPlaylists);
