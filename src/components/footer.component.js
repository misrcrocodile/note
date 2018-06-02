import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Row } from "react-bootstrap";

import facebookLogo from "./../imgs/facebook.png";
import twitterLogo from "./../imgs/twitter.png";
import googleLogo from "./../imgs/google.png";

class Footer extends Component {
  render() {
    let noteId = this.props.state.note.note.id;
    return (
      <div id="footer">
        <Row>
          <Col xs={6} className="text-left">
            <a href={null}>#{noteId}</a>
          </Col>
          <Col xs={6} className="text-right">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img className="social-logo" src={facebookLogo} alt="Facebook" height="32" width="32" />
            </a>
            <img className="social-logo" src={twitterLogo} alt="Twitter" height="32" width="32" />
            <img className="social-logo" src={googleLogo} alt="Google+" height="32" width="32" />
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { state };
}

export default connect(mapStateToProps)(Footer);
