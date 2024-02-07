import pg from "pg";

const pool = new pg.Pool({
  host: process.env.POSTGRE_HOST,
  port: 5432,
  user: process.env.POSTGRE_USER,
  password: process.env.POSTGRE_PASSWORD,
  database: process.env.POSTGRE_DATABASE,
});

const createTable = async () => {
  try {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS tools (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      link VARCHAR(255) NOT NULL,
      description TEXT,
      tags VARCHAR(255)[]
    )
  `;
    await pool.query(createTableQuery);
    console.log("Tabela 'tools' criada com sucesso");
  } catch (error) {
    console.log("Problema ao criar a tabela");
    console.error(error);
  }
};

createTable();

export { pool, createTable };
