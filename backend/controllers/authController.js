const { User } = require('../models');
const bcrypt = require('bcrypt'); const jwt = require('jsonwebtoken');
require('dotenv').config();
exports.signup = async (req, res) => {
  const { name, email, password, address } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, address });
    res.json({ message: 'User created', user });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(401).json({ message: 'Invalid email' });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: 'Wrong password' });
  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
  res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
};
