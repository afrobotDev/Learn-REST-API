import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "apiuser",
  password: "yourpassword",
  database: "rest_api_db",
});

export default pool;
