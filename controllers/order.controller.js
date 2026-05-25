import Order from '../models/Order.js';

export const createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, totalPrice } = req.body;
    if (orderItems && orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }
    const order = await Order.create({ user: req.user._id, orderItems, shippingAddress, totalPrice });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (order) res.json(order);
    else res.status(404).json({ message: 'Order not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOrderToPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      await order.save();
      res.json(order);
    } else res.status(404).json({ message: 'Order not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
