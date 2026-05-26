export const validateProduct = (req, res, next) => {
  const { name, description, price } = req.body;
  if (!name || !description || !price) {
    return res.status(400).json({ message: "Please add all required fields" });
  }
  next();
};
