import React from "react";
import { connect } from "react-redux";
import { fetchGenrePlaylists } from "../../modular/genre";
import history from "../../services/history";
import "./Genre.scss";

const GenrePlaylistItem = props => (
  <div className="genre-playlist-item">
    <div
      className="genre-playlist-item__image"
      onClick={() => history.push(`/playlist/${props.id}`)}
    >
      <img src={props.images[0].url} alt={props.name} width={250} />
    </div>
    <div className="genre-playlist-item__info">
      <p onClick={() => history.push(`/playlist/${props.id}`)}>{props.name}</p>
    </div>
  </div>
);

class Genre extends React.Component {
  componentDidMount() {
    const { genre } = this.props.match.params;
    this.props.fetchGenrePlaylists(genre);
  }

  render() {
    return (
      <div className="genre-view">
        <span className="genre-view__name">
          {this.props.match.params.genre.toUpperCase()}
        </span>
        <span className="genre-view__subtitle">Popular Playlists</span>
        <div className="genre-view__playlists">
          {this.props.playlists.map((playlist, i) => (
            <GenrePlaylistItem key={i} {...playlist} />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  playlists: state.genre.activeGenre.playlists.items
});

export default connect(
  mapStateToProps,
  { fetchGenrePlaylists }
)(Genre);
