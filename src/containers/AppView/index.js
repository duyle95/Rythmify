import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import AppNavigation from "../../components/AppNavigation";
import Browse from "../../components/Browse";
import Genre from "../../components/Genre";
import GenrePlaylist from "../../components/GenrePlaylist";
import Search from "../../components/Search";
import UserPlaylists from "../../components/UserPlaylists";
import { fetchUser } from "../../modular/auth";
import "./AppView.scss";

// NOTE: re arrange folder architechture
class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div className="App">
        <div className="App-container">
          <AppNavigation />
          <div className="App-content">
            <Route
              exact
              path={`${this.props.match.url}`}
              render={() => <Redirect to="/browse" />}
            />
            <Route
              exact
              path={`${this.props.match.url}browse`}
              component={Browse}
            />
            <Route
              exact
              path={`${this.props.match.url}browse/:genre`}
              component={Genre}
            />
            <Route
              exact
              path={`${this.props.match.url}playlist/:playlistId`}
              component={GenrePlaylist}
            />

            <Route
              exact
              path={`${this.props.match.url}search`}
              render={() => <Search />}
            />
            <Route
              exact
              path={`${this.props.match.url}your-playlist`}
              render={() => <UserPlaylists />}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { fetchUser }
)(App);
