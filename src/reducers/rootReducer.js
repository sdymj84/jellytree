import { combineReducers } from "redux";
import { cartReducer } from "./cartReducer";
import { saveForLaterReducer } from "./saveForLaterReducer";

export const rootReducer = combineReducers({
  cart: cartReducer,
  saveForLater: saveForLaterReducer,
})
