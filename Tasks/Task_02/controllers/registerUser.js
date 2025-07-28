const db = require('../db/db');
const bcrypt = require('bcrypt');

const registerUser = async (req, res, body) => {
  try {
    const { first_name, last_name, email, password } = JSON.parse(body);

    // Check if user exists
    const existing = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User already exists' }));
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const result = await db.query(
      'INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING id, first_name, last_name, email',
      [first_name, last_name, email, hashedPassword]
    );

    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'User registered successfully', user: result.rows[0] }));
  } catch (err) {
    console.error(err);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Internal server error' }));
  }
};

module.exports = registerUser;
