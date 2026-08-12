// routes/users.js


import express from 'express';
import pool from '../db.js';

const router = express.Router();

// f. GET all users
router.get('/users', async (req, res) => {
  try {
    let [rows] = await pool.query('SELECT * FROM users');
    res.json({ users: rows });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'err' });
  }
});

// g. GET a single user by id
router.get('/:id', async (req, res) => {
  try {
    let [rows] = await pool.query(
      'SELECT * FROM users WHERE id = ?',
      [req.params.id]
    );
    res.json({ user: rows });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'err' });
  }
});

// h. POST (insert) a new user
router.post('/', async (req, res) => {
  try {
    const { email, first_name, last_name, password } = req.body;

    let [result] = await pool.query(
      'INSERT INTO users (email, first_name, last_name, password) VALUES (?, ?, ?, ?)',
      [email, first_name, last_name, password]
    );
    res.json({ message: 'User created', result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'err' });
  }
});

// i. DELETE a user by id
router.delete('/:id', async (req, res) => {
  try {
    let [result] = await pool.query('DELETE FROM users WHERE id = ?',
      [req.params.id]
    );
    res.json({ message: 'User deleted', result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'err' });
  }
});

export default router;
