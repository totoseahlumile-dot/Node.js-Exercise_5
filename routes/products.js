// routes/products.js
// Primary key is product_code (not id) - matches your actual table.

import express from 'express';
import pool from '../db.js';

const router = express.Router();

// a. GET all products

router.get('/products', async (req, res) => {
  try {
    let [rows] = await pool.query('SELECT * FROM products');
    res.json({ products: rows });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'err' });
  }
});

// b. GET a single product by product_code

router.get('/:code', async (req, res) => {
  try {
    let [rows] = await pool.query(
      'SELECT * FROM products WHERE product_code = ?',
      [req.params.code]
    );
    res.json({ product: rows });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'err' });
  }
});

// c. POST (insert) a new product

router.post('/', async (req, res) => {
  try {
    const { product_code, product_name, product_price, product_quantity } = req.body;
    let [result] = await pool.query(
      'INSERT INTO products (product_code, product_name, product_price, product_quantity) VALUES (?, ?, ?, ?)',
      [product_code, product_name, product_price, product_quantity]
    );
    res.json({ message: 'Product created', result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'err' });
  }
});

// e. UPDATE a product by product_code

router.put('/:code', async (req, res) => {
  try {
    const { product_name, product_price, product_quantity } = req.body;
    let [result] = await pool.query(
      'UPDATE products SET product_name = ?, product_price = ?, product_quantity = ? WHERE product_code = ?',
      [product_name, product_price, product_quantity, req.params.code]
    );
    res.json({ message: 'Product updated', result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'err' });
  }
});

// d. DELETE a product by product_code

router.delete('/:code', async (req, res) => {
  try {
    let [result] = await pool.query(
      'DELETE FROM products WHERE product_code = ?',
      [req.params.code]
    );
    res.json({ message: 'Product deleted', result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'err' });
  }
});

export default router;
