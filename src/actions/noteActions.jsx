import axios from "axios";
import { 
  URL, 
  FETCH_FULFILLED,
  FETCH_REJECTED,
  UPDATE_FULFILLED,
  UPDATE_REJECTED,
  CHANGGING,
  FETCHING,
  UPDATING
} from "./../constants";

export function fetchNote(pNoteId) {
  pNoteId = pNoteId || "";
  return function(dispatch) {
    dispatch({ type: FETCHING });

    axios
      .get(URL + "/" + pNoteId)
      .then(response => {
        dispatch({ type: FETCH_FULFILLED, payload: response.data });
      })
      .catch(err => {
        dispatch({ type: FETCH_REJECTED, payload: err });
      });
  };
}

export function changeNoteContent(content) {
  return function(dispatch) {
    dispatch({ type: CHANGGING , payload: content });
  };
}

export function updateNote(id, pContent, status) {
  return function(dispatch) {
    dispatch({type: UPDATING})
    let params = new URLSearchParams();
    params.append("content", pContent);
    axios
      .post(URL + "/" + id, params)
      .then(res => {
        dispatch({ type: UPDATE_FULFILLED, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: UPDATE_REJECTED, payload: err });
      });
  };
}
