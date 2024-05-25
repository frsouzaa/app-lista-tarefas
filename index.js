import dotenv from "dotenv";
import express, { json } from "express";
import { createConnection } from "mysql2";
import cors from "cors";


dotenv.config();
const app = express();
const {
  PORT,
  DB_HOST,
  DB_USER,
  DB_PASS,
  DB_PORT,
  DB_SCHEMA
} = process.env;

app.use(json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Back subiu na porta ${PORT}`);
});

app.get("/lembretes", (req, res) => {
  const connection = createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    port: DB_PORT,
    database: DB_SCHEMA,
  });

  connection.query("SELECT * FROM tb_lembrete", (err, result, fields) => {
    if (err) {
      console.log(err);
      res.status(500).send();
    }
    res.json(result);
  });
});
