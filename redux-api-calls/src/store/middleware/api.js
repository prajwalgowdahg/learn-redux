import axios from "axios";
import { apiCallBegan } from "../api";
const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    console.log(action);
    if (action.type !== apiCallBegan.type) {
      return next(action);
    }
    const { url, method, data, onStart, onSuccess, onError } = action.payload;
    if (onStart) {
      dispatch({ type: onStart });
    }
    try {
      const response = await axios.request({
        baseURL: "http://localhost:5001/api",
        url,
        method,
        data,
      });
      console.log(response);
      dispatch({ type: onSuccess, payload: response.data });
    } catch (error) {
      dispatch({ type: onError, payload: { error: error.message } });
    }
  };
export default api;
