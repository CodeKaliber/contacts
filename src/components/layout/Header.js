import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Header = props => {
  const { branding } = props;
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-danger mb-3 py-0">
      <div className="container">
        <a href="/" className="navbar-brand">
          {branding}
        </a>
        <div>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <i className="fas fa-home">HOME</i>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contacts/add" className="nav-link">
                <i className="fas fa-plus">ADD</i>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link">
                <i className="fas fa-question">ABOUT</i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

//This is default incase the text from Apps doesn't render in...
Header.defaultProps = {
  branding: "My App"
};
Header.propTypes = {
  branding: PropTypes.string.isRequired
};

export default Header;
