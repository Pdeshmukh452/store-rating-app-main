const express = require('express');
const app = express(); require('dotenv').config();
const { sequelize } = require('./models');
const authRoutes = require('./routes/authRoutes');
const storeRoutes = require('./routes/storeRoutes');
const cors = require('cors');
app.use(cors()); app.use(express.json());
app.use('/api', authRoutes); app.use('/api', storeRoutes);
const PORT = process.env.PORT || 5000;
sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
