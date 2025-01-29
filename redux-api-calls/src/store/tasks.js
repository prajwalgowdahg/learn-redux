//import * as actionTypes from "./actionTypes";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/http";
import { apiCallBegan } from "./api";
//import { addTask, removeTask, completeTask } from "./actions";
let id = 0;
// use createSlice to combine both reducer and actions instead of separating each one of them
// createasync thunk function allow us to call asycn api store data etc

// we will get three states pending, fullfilled and rejected in createAsyncThunk method
const initialState = {
  tasks: [],
  loading: false,
  error: null,
};
// export const fetchTasks = createAsyncThunk(
//   "fetchTasks",
//   async (a, { rejectWithValue }) => {
//     try {
//       const response = await axios.get("/tasks");
//       return { tasks: response.data };
//     } catch (error) {
//       // whatever we return it passes as payload
//       return rejectWithValue({ error: error.message });
//     }
//   }
// );
const taskSlice = createSlice({
  name: "tasks",
  initialState: initialState,
  reducers: {
    // action: function
    apiRequested: (state, action) => {
      state.loading = true;
    },
    apiRequestFailed: (state, action) => {
      state.loading = false;
    },
    getTasks: (state, action) => {
      state.tasks = action.payload;
      state.loading = false;
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    removeTask: (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      state.tasks.splice(index, 1);
    },
    completeTask: (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      state.tasks[index] = action.payload.completed;
    },
  },
  // deprecated version of asynch thunk to handle states
  // for async call thunk we implement it here for all the state of thun
  // extraReducers: {
  //   [fetchTasks.fulfilled]: (state, action) => {
  //     state.tasks = action.payload.tasks;
  //   },
  //   [fetchTasks.pending]: (state, action) => {
  //     state.loading = true;
  //   },
  //   [fetchTasks.rejected]: (state, action) => {
  //     state.error = action.payload.error;
  //   },
  // },
  // new version to handle states
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchTasks.fulfilled, (state, action) => {
  //       state.tasks = action.payload;
  //     })
  //     // You can chain calls, or have separate `builder.addCase()` lines each time
  //     .addCase(fetchTasks.pending, (state, action) => {
  //       state.loading = true;
  //     })
  //     .addCase(fetchTasks.rejected, (state, action) => {
  //       state.error = action.payload.error;
  //     });
  //   // You can match a range of action types
  //   // .addMatcher(
  //   //   isRejectedAction,
  //   //   // `action` will be inferred as a RejectedAction due to isRejectedAction being defined as a type guard
  //   //   (state, action) => {}
  //   // )
  //   // // and provide a default case if no other handlers matched
  //   // .addDefaultCase((state, action) => {})
  // },
});

export const {
  apiRequested,
  apiRequestFailed,
  getTasks,
  addTask,
  removeTask,
  completeTask,
} = taskSlice.actions;
export default taskSlice.reducer;
console.log(addTask.type, "getTasks");
// Action creators
export const loadTasks = () => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: "/tasks",
      method: "GET",
      onStart: apiRequested.type,
      onSuccess: getTasks.type,
      onError: apiRequestFailed.type,
    })
  );
};

export const addNewTask = (task) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: "/tasks",
      method: "POST",
      data: task,
      //  onStart: apiRequested.type,
      onSuccess: addTask.type,
      //onError: apiRequestFailed.type,
    })
  );
};

export const updateTask = (task) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: `/tasks/${task.id}`,
      method: "PATCH",
      data: task,
      onSuccess: completeTask.type,
    })
  );
};

export const deleteTask = (task) => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: `/tasks/${task.id}`,
      method: "DELETE",
      onSuccess: removeTask.type,
    })
  );
};
