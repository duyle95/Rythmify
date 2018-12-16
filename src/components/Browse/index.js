import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import history from "../../services/history";
import { fetchGenres } from "../../modular/genre";

import "./Browse.scss";

const Genre = props => (
  <div className="genre">
    <div
      className="genre__image"
      onClick={() => history.push(`/browse/${props.id}`)}
    >
      <img src={props.icons[0].url} alt={props.name} width={250} />
    </div>
    <div className="genre__info">
      <p onClick={() => history.push(`/browse/${props.id}`)}>{props.name}</p>
    </div>
  </div>
);

class Browse extends React.Component {
  componentDidMount() {
    this.props.fetchGenres();
  }
  render() {
    return (
      <div className="browse">
        <span className="browse__title">Genres and Moods</span>
        {/* // NOTE: can use a spinner here */}
        <div className="genres">
          {this.props.genres.map((genre, i) => (
            <Genre key={i} {...genre} />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ genres: state.genre.genres });

export default withRouter(
  connect(
    mapStateToProps,
    { fetchGenres }
  )(Browse)
);
