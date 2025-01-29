// middleware will have three parameters
const log = (store) => (next) => (action) => {
  console.log(action);
  
  // at the end of reduc middleware we need to call next() function
  next(action);
};
export default log;
