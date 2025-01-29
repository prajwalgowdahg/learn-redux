import store from "./store/store";
//import { addTask, completeTask, removeTask } from "./actions";
import { loadTasks } from "./store/tasks";

import { addNewTask, updateTask, removeTask } from "./store/tasks";
import axios from "axios";
// // dispatch method updates the data
// const gettingTasks = async () => {
//   // call an api
//   try {
//     const response = await axios.get("http://localhost:5001/api/tasks");
//     console.log(response);
//     store.dispatch(getTasks({ tasks: response.data }));
//   } catch (error) {
//     store.dispatch({ type: "SHOW_ERROR", payload: { error: error.message } });
//     console.log(error);
//   }
// };
// gettingTasks();
// store.dispatch(fetchTasks());

// // if you want to hardcode type everywhere you can follow this approch
// store.dispatch({
//   type: "apiRequest",
//   payload: {
//     url: "/tasks",
//     method: "GET",
//     onStart: "tasks/apiRequested",
//     onSuccess: "tasks/getTasks",
//     onError: "tasks/apiRequestFailed",
//   },
// });
// if you want to pass the type dynamically

store.dispatch(loadTasks());
// store.dispatch(addNewTask({ task: "Complete runnning" }));
store.dispatch(updateTask({ id: 2, completed: true }));

store.dispatch(removeTask({ id: 2 }));
