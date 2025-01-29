//New way using redux tool kit
//import reducer from "./reducer";
import employeeReducer from "./employeeReducer";
import taskReducer from "./tasks";
import { configureStore } from "@reduxjs/toolkit";
// redux library to capture the log
import error from "./middleware/error";
import api from "./middleware/api";

// thunk is used to call api in redux becaus of async behaviour
const store = configureStore({
  reducer: { tasks: taskReducer, employee: employeeReducer },
  //middleware: [log],
  // get default middleware from toolkit
  // each middleware runs in sequence
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), api, error],
});

export default store;
