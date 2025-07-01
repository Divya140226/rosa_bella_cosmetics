const pool = require('./db');

//Admin
const findUserByEmail = async (email) => {
  const res = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return res.rows[0];
};

const createUser = async (name, email, hashedPassword) => {
  const res = await pool.query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
    [name, email, hashedPassword]
  );
  return res.rows[0];
};
const updateUserPassword = async (email, hashedPassword) => {
  const result = await pool.query(
    'UPDATE users SET password = $1 WHERE email = $2',
    [hashedPassword, email]
  );
  return result;
};

//website 

const findUserByEmailOrMobile = async (identifier) => {
  const result = await pool.query(
    'SELECT * FROM profile_users WHERE email = $1 OR mobile = $1',
    [identifier]
  );
  return result.rows[0];
};
const createUserWithOnlyIdentifier = async (identifier) => {

  let result;
  
  if (identifier.includes('@')) {
    result = await pool.query(
      'INSERT INTO profile_users (email) VALUES ($1) RETURNING *',
      [identifier]
    );
  } else {
    result = await pool.query(
      'INSERT INTO profile_users (mobile) VALUES ($1) RETURNING *',
      [identifier]
    );
  }
  return result.rows[0];
};
const updateUserDetails = async (userId, { name, mobile, address }) => {
  await pool.query(
    `
     UPDATE profile_users SET name = $1, mobile = $2, address = $3 WHERE id = $4`,
    [name, mobile, address, userId]
  );
};
module.exports = {
  findUserByEmail,
  createUser,
  updateUserPassword,
  findUserByEmailOrMobile,
  createUserWithOnlyIdentifier,
  updateUserDetails
};
