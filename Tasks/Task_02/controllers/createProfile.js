require('dotenv').config();
const bcrypt = require('bcrypt');
const db = require('../db/db');

// Users data with DOB and mobile numbers
const users = [
  {
    first_name: 'Ujjwal',
    last_name: 'Tiwari',
    email: 'ujjwal1@example.com',
    password: 'pass123',
    dob: '2000-05-10',
    mobile_no: '9876543210'
  },
  {
    first_name: 'Aryan',
    last_name: 'Raj',
    email: 'aryan2@example.com',
    password: 'pass123',
    dob: '2001-08-12',
    mobile_no: '9123456780'
  },
  {
    first_name: 'Neha',
    last_name: 'Singh',
    email: 'neha3@example.com',
    password: 'pass123',
    dob: '1999-11-20',
    mobile_no: '9988776655'
  },
  {
    first_name: 'Ravi',
    last_name: 'Kumar',
    email: 'ravi4@example.com',
    password: 'pass123',
    dob: '1998-03-15',
    mobile_no: '9112233445'
  },
  {
    first_name: 'Sneha',
    last_name: 'Yadav',
    email: 'sneha5@example.com',
    password: 'pass123',
    dob: '2002-02-25',
    mobile_no: '9001122334'
  }
];

const seedUsers = async () => {
  try {
    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);

      // Insert into `users` table
      const userInsertResult = await db.query(
        `INSERT INTO users (first_name, last_name, email, password)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (email) DO NOTHING
         RETURNING id`,
        [user.first_name, user.last_name, user.email, hashedPassword]
      );

      const insertedUser = userInsertResult.rows[0];

      if (!insertedUser) {
        console.log(`Skipped (duplicate): ${user.first_name} ${user.last_name} (${user.email})`);
        continue;
      }

      const userId = insertedUser.id;

      // Insert into `users_profile` table
      await db.query(
        `INSERT INTO users_profile (user_id, dob, mobile_no)
         VALUES ($1, $2, $3)`,
        [userId, user.dob, user.mobile_no]
      );

      console.log(`Inserted: ${user.first_name} ${user.last_name} (${user.email})`);
    }

    console.log(' Seeding complete!');
  } catch (err) {
    console.error('Error during seeding:', err.message);
  }
};

seedUsers();
