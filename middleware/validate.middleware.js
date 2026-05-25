export const validateProduct = (req, res, next) => {
  const { name, description, price, category } = req.body;
  if (!name || !description || !price || !category) {
    return res.status(400).json({ message: "Please add all required fields" });
  }
  next();
};
