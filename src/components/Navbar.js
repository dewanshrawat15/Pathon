import React, { Component } from 'react';
import Identicon from 'identicon.js';

import "./Navbar.css";

class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="/">Pathon</a>
          </div>
          <ul className="nav navbar-nav navbar-right">
            <li><a href="/new">Add new project</a></li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;