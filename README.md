# Redux Guide

## Introduction
Redux is a state management library that helps manage the application state in a predictable way. This guide covers essential concepts, best practices, and modern Redux approaches using Redux Toolkit (RTK).

---

## **Immutability with Immer**
To handle immutability in Redux, use the **Immer** library.

### **Installation**
```sh
npm install immer
```

### **Usage**
```javascript
import { produce } from "immer";

let user = { name: "test" };

const updatedUser = produce(user, (draft) => {
    draft.name = "prajwal";
});
```

---

## **Core Redux Concepts**
### **Action**
Defines **what** to update in the state.

### **State**
Holds the **current** application state.

### **Reducer**
A pure function that takes the current state and an action, then returns the **new state**.

### **Middleware**
Middleware runs **after dispatching an action** and **before reaching the reducer**. It is used for logging, error reporting, API calls, etc.

---

## **Steps to Implement Redux**
1. **Design the Store** – Define the shape of the application state.
2. **List Actions** – Identify different actions required.
3. **Create Reducer Functions** – Define how state changes in response to actions.
4. **Create Redux Store** – Combine reducers and apply middleware.

---

## **Folder Structure**
```
Store/
│── store.js
│── Tasks/
│   ├── action.js
│   ├── reducer.js
│   ├── actionTypes.js
│── Employees/
│   ├── action.js
│   ├── reducer.js
│   ├── actionTypes.js
```

---

## **Redux Thunk**
### **What is Thunk?**
Thunk is middleware that **delays execution** of a function. It is commonly used for handling **asynchronous operations**, such as API calls.

### **Thunk API Calls Example**
```javascript
export const fetchTasks = () => async (dispatch, getState) => {
    try {
        const response = await fetch("/tasks");
        const data = await response.json();
        dispatch({ type: "TASKS_FETCH_SUCCESS", payload: data });
    } catch (error) {
        dispatch({ type: "TASKS_FETCH_ERROR", payload: error.message });
    }
};
```

---

## **Redux Toolkit (RTK)**
### **Why Use RTK?**
Redux Toolkit simplifies Redux development by reducing boilerplate code. It includes utilities like:
- `configureStore` – Creates a store with default middleware.
- `createAction` – Generates action creators.
- `createReducer` – Simplifies reducer creation.
- `createSlice` – Combines reducers and actions.

### **Example: Using `createAction`**
```javascript
import { createAction } from "@reduxjs/toolkit";

const addTask = createAction("ADD_TASK");
console.log(addTask({ task: "Add new task!" }));

// Output
// { type: 'ADD_TASK', payload: { task: 'Add new task!' } }
```

### **Example: Using `createSlice`**
```javascript
import { createSlice } from "@reduxjs/toolkit";
let id = 0;

const taskSlice = createSlice({
    name: "tasks",
    initialState: [],
    reducers: {
        addTask: (state, action) => {
            state.push({ id: ++id, task: action.payload.task, completed: false });
        },
        removeTask: (state, action) => {
            return state.filter(task => task.id !== action.payload.id);
        },
        completeTask: (state, action) => {
            const task = state.find(task => task.id === action.payload.id);
            if (task) task.completed = true;
        }
    }
});

export const { addTask, removeTask, completeTask } = taskSlice.actions;
export default taskSlice.reducer;
```

### **Example: Configuring Store**
```javascript
import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./employees";
import taskReducer from "./tasks";

const store = configureStore({
    reducer: {
        tasks: taskReducer,
        employees: employeeReducer,
    }
});

export default store;
```

---

## **Middleware in Redux**
Middleware runs between **dispatching an action** and **updating the reducer**. Common use cases include:
- Logging actions
- Error handling
- API requests

### **Example: Custom Middleware**
```javascript
const logger = (store) => (next) => (action) => {
    console.log("Dispatching:", action);
    next(action);
};

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), logger]
});
```

---

## **Conclusion**
Redux is a powerful state management tool, and Redux Toolkit simplifies its usage by reducing boilerplate. By following best practices and using `createSlice`, `createReducer`, and `configureStore`, developers can efficiently manage state in large applications.

For more details, visit the official Redux documentation: [Redux Toolkit](https://redux-toolkit.js.org/)

