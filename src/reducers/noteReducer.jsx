import {
  defaultObj,
  FETCHING,
  FETCH_FULFILLED,
  FETCH_REJECTED,
  CHANGGING,
  UPDATING,
  UPDATE_FULFILLED,
  UPDATE_REJECTED
} from "./../constants";

export default function reducer(
  state = {
    note: defaultObj,
    status: FETCH_FULFILLED,
    error: null
  },
  action
) {
  switch (action.type) {
    case FETCHING: {
      return {
        ...state,
        status: FETCHING,
      };
    }
    case FETCH_FULFILLED: {
      return {
        ...state,
        status: FETCH_FULFILLED,
        note: action.payload || defaultObj
      };
    }
    case FETCH_REJECTED: {
      return {
        ...state,
        status: FETCH_REJECTED,
        error: action.payload
      };
    }
    case CHANGGING: {
      let tempNote = state.note;
      tempNote.content = action.payload;
      return {
        ...state,
        status: CHANGGING,
        note: tempNote,
      };
    }
    case UPDATING: {
      return {
        ...state,
        status: UPDATING,
      };
    }
    case UPDATE_FULFILLED: {
      if(state.status !== CHANGGING)
        return {
          ...state,
          status: UPDATE_FULFILLED,
          note: action.payload
        };
      else 
        return state;
    }
    case UPDATE_REJECTED: {
      return {
        ...state,
        status: UPDATE_REJECTED,
        error: action.payload
      };
    }
    default: {
      return state;
    }
  }
}
