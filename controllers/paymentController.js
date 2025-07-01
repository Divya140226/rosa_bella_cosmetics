const razorpay = require('../commonFunction/razorpay');
const paymentModel = require('../models/paymentModel');
const orderModel = require('../models/orderModel');

exports.createOrder = async (req, res) => {
  try {
    const { amount, currency = 'INR', userId } = req.body;

    // 1. Create Razorpay Order
    const options = {
      amount: amount * 100, // in paise
      currency,
      receipt: `rcpt_${Date.now()}`,
    };
    const order = await razorpay.orders.create(options);

    // 2. Insert into orders table
    const orderData = {
      userId,
      razorpayOrderId: order.id,
      amount,
      currency,
      status: order.status || 'created', // usually 'created'
    };
    const savedOrder = await orderModel.insertOrder(orderData);

    // 3. Insert into payments table
    const paymentData = {
      userId,
      orderId: order.id,
      amount,
      currency,
      status: 'created',
    };
    const savedPayment = await paymentModel.insertPayment(paymentData);

    // 4. Respond
    res.status(201).json({
      success: true,
      razorpayOrder: order,
      orderRecord: savedOrder,
      paymentRecord: savedPayment,
    });

  } catch (err) {
    console.error('Error creating payment order:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
