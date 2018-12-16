import React from "react";
import { connect } from "react-redux";
import "./Search.scss";

class Search extends React.PureComponent {
  render() {
    // TODO: implement simple Search component
    return (
      <div className="search-container">
        <input placeholder="Type something" />
        <div className="search-content">On construction...</div>
      </div>
    );
  }
}

export default connect(
  null,
  null
)(Search);
