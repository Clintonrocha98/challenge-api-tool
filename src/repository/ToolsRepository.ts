import { PostgreService } from "../database/postgres";
import { Tools } from "../domain/tools/Tools";
import { toolsDTO } from "../domain/tools/Tools.DTO";
import { IToolsRepository } from "./ITools.Repository";

export class ToolsRepository implements IToolsRepository {
  constructor(private pg: PostgreService) {}

  async insert({ title, description, link, tags }: toolsDTO): Promise<Tools> {
    const newTool = await this.pg.query<Tools>(
      "INSERT INTO tools (title, link, description, tags) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, description, link, tags]
    );
    return newTool;
  }
  async tools(): Promise<Tools[]> {
    const tools = await this.pg.query<Tools[] | []>(
      "SELECT * FROM tools ORDER BY id ASC"
    );
    return tools;
  }
  async toolsByTag(tag: string): Promise<Tools[]> {
    const toolByTag = await this.pg.query<Tools[] | []>(
      "SELECT * FROM tools WHERE $1 = ANY(tags)",
      [tag]
    );
    return toolByTag;
  }
  async deleteTool(id: string) {
    await this.pg.query<void>("DELETE FROM tools WHERE id = $1", [id]);
  }
}
