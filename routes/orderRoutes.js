var express = require('express');
var router = express.Router();

const {protect, admin} = require ("../middleware/authMiddleware")
const {addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, getOrders, updateOrderToDelivered} = require("../controller/orderController");


/* GET users listing. */
router.post('/', protect, addOrderItems)
router.get("/", protect, admin, getOrders)
router.get('/myorders', protect, getMyOrders)

// !!!! Big bug on video 64, if I put 3rd route in front, it will think "myorders" as id! 

router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)
router.route('/:id').get(protect, getOrderById)

module.exports = router;
