import React, { Component } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import {
  Col,
  Row,
  FormControl,
  InputGroup,
  Tooltip,
  OverlayTrigger
} from "react-bootstrap";

import { 
  URL
} from "./../constants";

import facebookLogo from "./../imgs/facebook.png";
import twitterLogo from "./../imgs/twitter.png";
import googleLogo from "./../imgs/google.png";
import axios from "axios";
class Footer extends Component {
  constructor() {
    super();
    this.state = {
      isEdit: false,
      isErrorId: false,
      value: ""
    };
    this.errorRef = target => this.setState({ target });
  }
  
  changePageQuery(noteId) {
    var newUrl = window.location.origin + window.location.pathname + "?id=" + noteId;
    window.location.href = newUrl;
    return false;
}
  componentWillMount() {
    this.setState({ isEdit: false });
  }

  async handleChange(e) {
    // esc btn
    if(e.keyCode === 27) {
      let el = document.getElementById("noteIdForm");
      el.value = this.props.state.note.id;
      this.setState({ isEdit: false });
    }
    
    // enter btn
    if (e.keyCode === 13) {
      let newId = document.getElementById("noteIdForm").value;
      let oldId = this.props.state.note.id;
      
      if( newId === oldId ){
        this.setState({ isEdit: false, isErrorId: false });
        return;
      }

      // setting parameter 
      let params = new URLSearchParams();
      params.append("old_id", oldId);
      params.append("new_id", newId);
      
      // change id by request to server
      try{
        await axios.post(URL + "/changeId", params);
      }catch(err) {
        console.log(err);
        this.setState({isErrorId: true});
        return;
      }
      this.props.state.note.id = newId;
      this.setState({ isEdit: false, isErrorId: false });
      this.changePageQuery(newId);
    }
    
  }
  
  changeEditState() {
    this.setState({ isEdit: true });
    setTimeout(function() {
      let noteFormEl = document.getElementById("noteIdForm");
      let noteId = noteFormEl.value;
      noteFormEl.value = ""
      noteFormEl.focus();
      noteFormEl.value = noteId;
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
    let duplicatedTooltip = (
      <Tooltip id="tooltip" className={this.state.isErrorId ? "":"hidden"}>
        This id already exists!
      </Tooltip>
    );

    let noteId = this.props.state.note.id;
    this.formRef = React.createRef();
    return (
      <div id="footer">
        <Helmet>
          <title>{ (this.props.state.note.id || "Untitled") + " - The Note"}</title>
        </Helmet>
        <Row>
          <Col xs={6} className="text-left">
            <div className={(this.props.state.note.id ? "" : "hidden")}>
            <OverlayTrigger placement="top" overlay={tooltip}>
              <a href={null} ref="noteIdTag" 
                className={"cursor-pointer " + (this.state.isEdit ? "hidden" : "")}
                onClick={this.copyToClipboard.bind(this)}>
                {(noteId !== null ? "#":"") + noteId}
              </a>
            </OverlayTrigger>

            <a href={null} alt="Copy to Clipboard"
              className={"edit-link cursor-default" + (this.state.isEdit ? " hidden" : "")}
              onClick={this.changeEditState.bind(this)}>
              (Edit)
            </a>
            <InputGroup className={"edit-textbox"+ (this.state.isErrorId ? " has-error" : "") + (this.state.isEdit ? "" : " hidden") }>
              <InputGroup.Addon>#</InputGroup.Addon>

              <OverlayTrigger placement="top" overlay={duplicatedTooltip}>
                <FormControl
                  type="text"
                  id="noteIdForm"
                  defaultValue={this.props.state.note.id}
                  ref={this.attachRef}
                  placeholder="Enter text"
                  onBlur={this.onBlurNoteIdChange.bind(this)}
                  onKeyDown={this.handleChange.bind(this)}
                />
              </OverlayTrigger>
            </InputGroup>
            </div>
          </Col>
          <Col xs={6} className="text-right">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img className="social-logo" src={facebookLogo} alt="Facebook" height="32" width="32"/>
            </a>
            <img className="social-logo" src={twitterLogo} alt="Twitter" height="32" width="32"/>
            <img className="social-logo" src={googleLogo} alt="Google+" height="32" width="32"/>
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