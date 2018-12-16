import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFolderOpen,
  faListUl,
  faSearch
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./AppNavigation.scss";

library.add(faFolderOpen, faSearch, faListUl);

const AppNavigation = () => {
  return (
    <div className="navigation">
      <Link className="navigation__link--logo" to="/">
        <img
          src={require("../../assets/images/rythmify-logo.jpg")}
          alt="Rythmify"
        />
      </Link>
      <NavLink
        activeClassName="active"
        className="navigation__link"
        to="/browse"
      >
        <FontAwesomeIcon
          icon="folder-open"
          size="lg"
          className="navigation__icon"
        />
        <span className="navigation__label">Browse</span>
      </NavLink>
      <NavLink
        activeClassName="active"
        className="navigation__link"
        to="/your-playlist"
      >
        <FontAwesomeIcon
          icon="list-ul"
          size="lg"
          className="navigation__icon"
        />
        <span className="navigation__label">Playlist</span>
      </NavLink>
      <NavLink
        activeClassName="active"
        className="navigation__link"
        to="/search"
      >
        <FontAwesomeIcon icon="search" size="lg" className="navigation__icon" />
        <span className="navigation__label">Search</span>
      </NavLink>
    </div>
  );
};

export default AppNavigation;
