const { Store, Rating, User } = require('../models');
exports.createStore = async (req, res) => {
  try {
    const store = await Store.create(req.body);
    res.json(store);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
exports.listStores = async (req, res) => {
  const stores = await Store.findAll({
    include: [
      {
        model: Rating,
        attributes: ['id', 'value', 'userId'] 
      }
    ]
  });
  res.json(stores);
};
exports.rateStore = async (req, res) => {
  const { storeId, value } = req.body;
  const existing = await Rating.findOne({ where: { userId: req.user.id, storeId } });
  if (existing) {
    existing.value = value;
    await existing.save();
    return res.json(existing);
  }
  const rating = await Rating.create({ userId: req.user.id, storeId, value });
  res.json(rating);
};
