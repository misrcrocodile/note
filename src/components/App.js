import React, { Component } from "react";
import { Row, Grid, FormControl } from "react-bootstrap";
import { connect } from "react-redux";

import { base_path, FETCH_NOTE_FULFILLED } from "./../constants";

import { fetchNote, changeNoteContent } from "./../actions/noteActions";
import Footer from "./footer.component";
import "./App.css";

class App extends Component {
  componentWillMount() {
    console.log("componentWillMount: ", this.props);
    let paramId = this.props.location.search.split("?").join("");
    let stateId = this.props.state.note.note.id
    if (paramId === undefined || paramId === null) paramId = "";
    if(stateId === "" || paramId !== stateId )
      this.props.dispatch(fetchNote(paramId));
  }

  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps", this.props);
    let noteState = nextProps.state.note;
    let note = noteState.note;
    let paramId = this.props.location.search.split("?").join("");
    console.log("paramId: ",paramId);
    // target.split("?").join("");this.props.location.search;
    // this.props.location.search;
    
    // console.log("componentWillReceiveProps@param", this.props)
    if (noteState.status === FETCH_NOTE_FULFILLED) {
      console.log("componentWillReceiveProps_FULFILLED",paramId, "noteid",note.id);
      if ((paramId === undefined || paramId === null || paramId === "") && note.id !== "") {
        console.log("helloworld: ", note.id);
        this.props.history.push(base_path + "/?" + note.id);
        // this.props.location.search = "?" + note.id;
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
