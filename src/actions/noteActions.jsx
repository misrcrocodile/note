import axios from "axios";

const url = "http://misr-utility-misr-utility.a3c1.starter-us-west-1.openshiftapps.com/note";
export function fetchNote(pNoteId) {
  pNoteId = pNoteId || "";
  return function(dispatch) {
    dispatch({ type: "FETCH_NOTE" });

    axios
      .get(url + "/" + pNoteId)
      .then(response => {
        dispatch({ type: "FETCH_NOTE_FULFILLED", payload: response.data });
      })
      .catch(err => {
        dispatch({ type: "FETCH_NOTE_REJECTED", payload: err });
      });
  };
}

export function changeNoteContent(content) {
  return function(dispatch) {
    dispatch({ type: "CHANGE_NOTE", payload: content });
  };
}

export function updateNote(id, pContent) {
  return function(dispatch) {
    let params = new URLSearchParams();
    params.append("content", pContent);
    axios
      .post(url + "/" + id, params)
      .then(res => {
        dispatch({ type: "UPDATE_NOTE_FULFILLED", payload: res.data });
      })
      .catch(err => {
        dispatch({ type: "UPDATE_NOTE_REJECTED", payload: err });
      });
  };
}
