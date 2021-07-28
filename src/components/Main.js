import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import "./main.css";


import AddNewPost from "./AddNewPost";
import PostViewer from "./Posts";

class Main extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/new">
            <AddNewPost
              captureFile={this.props.captureFile}
              tipProjectOwner={this.props.tipProjectOwner}
              uploadPost={this.props.uploadPost}
            />
          </Route>
          <Route path="/">
            <PostViewer
              posts={this.props.posts}
            />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default Main;