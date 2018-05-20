import React, { Component } from "react";
import { Button, Col, Row } from "react-bootstrap";
import facebookLogo from "./../imgs/facebook.png";
import twitterLogo from "./../imgs/twitter.png";
import googleLogo from "./../imgs/google.png";
import { connect } from "react-redux"
import {updateNote} from "./../actions/noteActions"
class Footer extends Component {

  updateData() {
    let noteId = this.props.state.note.note.id;
    let content = this.props.state.note.note.content;
    this.props.dispatch(updateNote(noteId, content));
  }
  render() {
    let noteId = this.props.state.note.note.id;
    return (
      <div id="footer">

        <Row >
          <Col xs={6} className="text-left">
            <span>#{noteId}</span>
            <Button type="submit" className="btn" onClick={this.updateData.bind(this)}>update</Button>
          </Col>
          <Col xs={6} className="text-right">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
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
  return {state};
}

export default connect(mapStateToProps)(Footer);

// <Row mdHidden lgHidden>
// <Col sx={12} className="text-center">
//   <span>https://note.com/flka3211321</span>
//   <Button type="submit">Change</Button>
// </Col>
// <Col sx={12} className="text-center">
//   <a href="https://facebook.com">
//     <img src={facebookLogo} alt="Facebook" height="32" width="32" />
//   </a>
//   <img src={twitterLogo} alt="Twitter" height="32" width="32" />
//   <img src={googleLogo} alt="Google+" height="32" width="32" />
// </Col>
// </Row>