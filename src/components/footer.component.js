import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Col,
  Row,
  FormControl,
  InputGroup,
  Tooltip,
  OverlayTrigger
} from "react-bootstrap";

import facebookLogo from "./../imgs/facebook.png";
import twitterLogo from "./../imgs/twitter.png";
import googleLogo from "./../imgs/google.png";

class Footer extends Component {
  constructor() {
    super();
    this.state = {
      isEdit: false,
      value: ""
    };
  }

  componentWillMount() {
    this.setState({ isEdit: false });
  }

  handleChange(e) {
    if (e.charCode === 13) {
      this.setState({ isEdit: false });
    }
  }
  changeEditState() {
    this.setState({ isEdit: true });
    setTimeout(function() {
      document.getElementById("noteIdForm").focus();
    }, 100);
  }
  copyToClipboard() {
    var textField = document.createElement("textarea");
    textField.innerText = window.location.href;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  }

  onBlurNoteIdChange() {
    this.setState({ isEdit: false });
  }
  render() {
    let tooltip = (
      <Tooltip id="tooltip">
        Copy this link to <strong>Clipboard</strong>!
      </Tooltip>
    );

    let noteId = this.props.state.note.id;
    return (
      <div id="footer">
        <Row>
          <Col xs={6} className="text-left">
            <OverlayTrigger placement="top" overlay={tooltip}>
              <a
                href={null}
                ref="noteIdTag"
                className={
                  "cursor-default " + (this.state.isEdit ? "hidden" : "")
                }
                onClick={this.copyToClipboard.bind(this)}
              >
                #{noteId}{" "}
              </a>
            </OverlayTrigger>
            <a
              href={null}
              alt="Copy to Clipboard"
              className={
                "edit-link cursor-default" +
                (this.state.isEdit ? " hidden" : "")
              }
              onClick={this.changeEditState.bind(this)}
            >
              (Edit)
            </a>
            <InputGroup
              className={"edit-textbox" + (this.state.isEdit ? "" : " hidden")}
            >
              <InputGroup.Addon>#</InputGroup.Addon>
              <FormControl
                type="text"
                id="noteIdForm"
                value={noteId}
                ref="noteIdForm"
                placeholder="Enter text"
                onBlur={this.onBlurNoteIdChange.bind(this)}
                onKeyPress={this.handleChange.bind(this)}
              />
            </InputGroup>
          </Col>
          <Col xs={6} className="text-right">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="social-logo"
                src={facebookLogo}
                alt="Facebook"
                height="32"
                width="32"
              />
            </a>
            <img
              className="social-logo"
              src={twitterLogo}
              alt="Twitter"
              height="32"
              width="32"
            />
            <img
              className="social-logo"
              src={googleLogo}
              alt="Google+"
              height="32"
              width="32"
            />
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { state: state.note };
}

export default connect(mapStateToProps)(Footer);
