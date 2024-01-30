import { pool } from "../database/postgres";
import { Tools } from "../domain/tools/Tools";
import { toolsDTO } from "../domain/tools/Tools.DTO";
import { IToolsRepository } from "./ITools.Repository";

export class ToolsRepository implements IToolsRepository {
  async insert({ title, description, link, tags }: toolsDTO): Promise<Tools> {
    const newTool = await pool.query<Tools>(
      "INSERT INTO tools (title, link, description, tags) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, description, link, tags]
    );
    return newTool.rows[0];
  }
  async tools(): Promise<Tools[]> {
    const tools = await pool.query<Tools[] | []>(
      "SELECT * FROM tools ORDER BY id ASC"
    );
    return tools.rows[0];
  }
  async toolsByTag(tag: string): Promise<Tools[]> {
    const toolByTag = await pool.query<Tools[] | []>(
      "SELECT * FROM tools WHERE $1 = ANY(tags)",
      [tag]
    );
    return toolByTag.rows[0];
  }
  async toolExist(id: number): Promise<boolean> {
    const exist = await pool.query<Tools>("SELECT FROM tools WHERE id = $1", [
      id,
    ]);
    return exist.rows.length === 0;
  }
  async deleteTool(id: number) {
    await pool.query("DELETE FROM tools WHERE id = $1", [id]);
  }
}
