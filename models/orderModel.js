const db = require('./db');

exports.insertOrder = async ({ userId, razorpayOrderId, amount, currency, status }) => {
  const query = `
    INSERT INTO orders (user_id, razorpay_order_id, amount, currency, status)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  const values = [userId, razorpayOrderId, amount, currency, status];
  const result = await db.query(query, values);
  return result.rows[0];
};
