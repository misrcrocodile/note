import React, { Component } from "react";
import { Row, Grid, FormControl } from "react-bootstrap";
import { connect } from "react-redux";

import { base_path, FETCH_NOTE_FULFILLED } from "./../constants";
import { fetchNote, changeNoteContent, updateNote } from "./../actions/noteActions";
import Footer from "./footer.component";

import "./App.css";

class App extends Component {
  componentWillMount() {
    let paramId = this.props.location.search.split("?").join("");
    let stateId = this.props.state.note.note.id
    if (paramId === undefined || paramId === null) paramId = "";
    if(stateId === "" || paramId !== stateId )
      this.props.dispatch(fetchNote(paramId));

    setInterval(()=> {
      if(this.props.state.note.contentChanged) {
        let note = this.props.state.note.note;
        this.props.dispatch(updateNote(note.id, note.content));
      }
    }, 5000);
  }

  componentWillReceiveProps(nextProps) {
    let noteState = nextProps.state.note;
    let note = noteState.note;
    let paramId = this.props.location.search.split("?").join("");
    
    if (noteState.status === FETCH_NOTE_FULFILLED) {
      if ((paramId === undefined || paramId === null || paramId === "") && note.id !== "") {
        this.props.history.push(base_path + "/?" + note.id);
      }
    }
  }

  fetchNote(id) {
    this.props.dispatch(fetchNote());
  }

  handleChange(e) {
    let fieldVal = e.target.value;
    this.props.dispatch(changeNoteContent(fieldVal));
  }

  render() {
    return (
      <Grid bsClass="container">
        <h1 id="header" className="text-center">
          The Note
        </h1>
        <Row id="main-content" className="main-content">
          <FormControl
            componentClass="textarea"
            name="text"
            id="exampleText"
            value={this.props.state.note.note.content}
            onChange={this.handleChange.bind(this)}
          />
          <div className={"message-box" + (this.props.state.note.contentChanged ? '' : ' hidden')}>
            Note is saving
          </div>
        </Row>
        <Footer />
      </Grid>
    );
  }
}
function mapStateToProps(state) {
  return { state };
}

export default connect(mapStateToProps)(App);
