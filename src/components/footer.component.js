import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Col, Row } from "react-bootstrap";

import { updateNote } from "./../actions/noteActions";

import facebookLogo from "./../imgs/facebook.png";
import twitterLogo from "./../imgs/twitter.png";
import googleLogo from "./../imgs/google.png";

class Footer extends Component {
  updateData() {
    let note = this.props.state.note.note;
    let noteId = note.id;
    let content = note.content;
    this.props.dispatch(updateNote(noteId, content));
  }
  render() {
    let noteId = this.props.state.note.note.id;
    return (
      <div id="footer">
        <Row>
          <Col xs={6} className="text-left">
            <span>#{noteId}</span>
            <Button
              type="submit"
              className="btn"
              onClick={this.updateData.bind(this)}
            >
              update
            </Button>
          </Col>
          <Col xs={6} className="text-right">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={facebookLogo} alt="Facebook" height="32" width="32" />
            </a>
            <img src={twitterLogo} alt="Twitter" height="32" width="32" />
            <img src={googleLogo} alt="Google+" height="32" width="32" />
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
