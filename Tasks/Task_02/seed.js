require('dotenv').config();
const bcrypt = require('bcrypt');
const db = require('./db/db');

const users = [
  {
    first_name: 'Ujjwal',
    last_name: 'Tiwari',
    email: 'ujjwal1@example.com',
    password: 'pass123',
    dob: '2000-01-01',
    mobile_no: '9876543210',
  },
  {
    first_name: 'Aryan',
    last_name: 'Raj',
    email: 'aryan2@example.com',
    password: 'pass123',
    dob: '2000-02-02',
    mobile_no: '9876543211',
  },
  {
    first_name: 'Neha',
    last_name: 'Singh',
    email: 'neha3@example.com',
    password: 'pass123',
    dob: '2000-03-03',
    mobile_no: '9876543212',
  },
  {
    first_name: 'Ravi',
    last_name: 'Kumar',
    email: 'ravi4@example.com',
    password: 'pass123',
    dob: '2000-04-04',
    mobile_no: '9876543213',
  },
  {
    first_name: 'Sneha',
    last_name: 'Yadav',
    email: 'sneha5@example.com',
    password: 'pass123',
    dob: '2000-05-05',
    mobile_no: '9876543214',
  },
];

const seedUsers = async () => {
  try {
    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      try {

        // Insert into users table
        const userResult = await db.query(
          `INSERT INTO users (first_name, last_name, email, password)
           VALUES ($1, $2, $3, $4)
           RETURNING id`,
          [user.first_name, user.last_name, user.email, hashedPassword]
        );

        const userId = userResult.rows[0].id;

        // Insert into users_profile table
        await db.query(
          `INSERT INTO users_profile (user_id, dob, mobile_no)
           VALUES ($1, $2, $3)`,
          [userId, user.dob, user.mobile_no]
        );

        console.log(`Inserted: ${user.first_name} ${user.last_name} (${user.email})`);
      } catch (err) {
        if (err.code === '23505') {
          console.log(` Skipped (duplicate): ${user.first_name} ${user.last_name} (${user.email})`);
        } else {
          console.error(`Error inserting ${user.first_name} ${user.last_name}:`, err.message);
        }
      }
    }

    console.log('Seeding complete!');
  } catch (err) {
    console.error('Error during seeding:', err.message);
  }
};

seedUsers();
