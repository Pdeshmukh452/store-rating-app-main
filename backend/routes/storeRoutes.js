const router = require('express').Router();
const { auth, authorize } = require('../middleware/auth');
const { createStore, listStores, rateStore } = require('../controllers/storeController');
router.post('/stores', auth, authorize(['admin']), createStore);
router.get('/stores', auth, listStores);
router.post('/ratings', auth, authorize(['user']), rateStore);
module.exports = router;
