import { Pool, QueryResult } from "pg";
import { QueryFailure } from "./Error/postgres.error";

interface ISettingsPostgre {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}

interface Connection {
  query(sql: string, params?: any[]): Promise<QueryResult>;
}

export class PoolConnectionPostgre implements Connection {
  private pool: Pool;

  constructor(settings: ISettingsPostgre) {
    this.pool = new Pool(settings);
  }

  async query(sql: string, params: any[] = []): Promise<QueryResult> {
    try {
      const result = await this.pool.query(sql, params);
      return result;
    } catch (erro) {
      throw new QueryFailure(erro.message);
    }
  }
}
export class PostgreService {
  private connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  async query<T>(sql: string, params: any[] = []): Promise<T> {
    const result = await this.connection.query(sql, params);
    return result.rows as T;
  }
}

export async function createTable() {
  const settings: ISettingsPostgre = {
    host: process.env.POSTGRE_HOST,
    port: 5432,
    user: process.env.POSTGRE_USER,
    password: process.env.POSTGRE_PASSWORD,
    database: process.env.POSTGRE_DATABASE,
  };

  const connection = new PoolConnectionPostgre(settings);
  const servicoBD = new PostgreService(connection);

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
    await servicoBD.query(createTableQuery);
    console.log("Tabela 'tools' criada com sucesso");
  } catch (erro) {
    console.error("Erro ao criar a tabela:", erro.message);
  }
}
