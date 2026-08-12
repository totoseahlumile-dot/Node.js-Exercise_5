
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  user: 'root',
  host: 'localhost',
  password: 'makeouthill777',
  database: 'shopleft_database',
  port: '3307',
});

export default pool;
