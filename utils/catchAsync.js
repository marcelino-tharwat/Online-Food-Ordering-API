// Higher-order function to wrap async controllers
// Eliminates need for try/catch in every controller
export default (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
