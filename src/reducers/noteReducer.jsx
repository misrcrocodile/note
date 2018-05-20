import {
  defaultObj,
  FETCH_NOTE,
  FETCH_NOTE_FULFILLED,
  FETCH_NOTE_REJECTED,
  CHANGE_NOTE,
  UPDATE_NOTE,
  UPDATE_NOTE_FULFILLED,
  UPDATE_NOTE_REJECTED
} from "./../constants";
export default function reducer(
  state = {
    note: defaultObj,
    fetching: false,
    fetched: false,
    updating: false,
    updated: false,
    contentChanged: false,
    status: "READY",
    error: null
  },
  action
) {
  switch (action.type) {
    case FETCH_NOTE: {
      return {
        ...state,
        status: FETCH_NOTE,
        fetching: true,
        fetched: false
      };
    }
    case FETCH_NOTE_FULFILLED: {
      return {
        ...state,
        status: FETCH_NOTE_FULFILLED,
        fetching: false,
        fetched: true,
        contentChanged: false,
        note: action.payload || defaultObj
      };
    }
    case FETCH_NOTE_REJECTED: {
      return {
        ...state,
        status: FETCH_NOTE_REJECTED,
        fetching: false,
        fetched: false,
        error: action.payload
      };
    }
    case CHANGE_NOTE: {
      let tempNote = state.note;
      tempNote.content = action.payload;
      return {
        ...state,
        status: CHANGE_NOTE,
        contentChanged: true,
        note: tempNote
      };
    }
    case UPDATE_NOTE: {
      return {
        ...state,
        status: UPDATE_NOTE,
        updating: true,
        updated: false
      };
    }
    case UPDATE_NOTE_FULFILLED: {
      return {
        ...state,
        status: UPDATE_NOTE_FULFILLED,
        updating: false,
        updated: true,
        note: action.payload
      };
    }
    case UPDATE_NOTE_REJECTED: {
      return {
        ...state,
        status: UPDATE_NOTE_REJECTED,
        updating: false,
        updated: false,
        error: action.payload
      };
    }
    default: {
      return state;
    }
  }
}
