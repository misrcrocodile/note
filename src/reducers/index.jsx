import { combineReducers } from "redux"
import {routerReducer} from 'react-router-redux'
import note from "./noteReducer"

export default combineReducers({
  note,
  routing:routerReducer
});