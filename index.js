// index.js
import express from 'express';
import usersRouter from './routes/users.js';
import productsRouter from './routes/products.js';

const app = express();
const PORT = 9090;

app.use(express.json());

app.use('/users', usersRouter);
app.use('/products', productsRouter);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
