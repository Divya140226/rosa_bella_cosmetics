const db = require('./db');

exports.insertPayment = async ({ userId, orderId, amount, currency, status }) => {
  const query = `
    INSERT INTO payment (user_id, razorpay_order_id, amount, currency, status)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  const values = [userId, orderId, amount, currency, status];
  const result = await db.query(query, values);
  return result.rows[0];
};
