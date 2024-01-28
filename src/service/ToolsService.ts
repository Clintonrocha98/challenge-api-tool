import { Tools } from "../domain/tools/Tools";
import { toolsDTO } from "../domain/tools/Tools.DTO";
import { IToolsRepository } from "../repository/ITools.Repository";

export class ToolsService {
  constructor(private toolsRepository: IToolsRepository) {}

  async insert(tools: toolsDTO) {
    const toolsCreate = new Tools(tools);
    return await this.insert(toolsCreate);
  }

  async tools() {
    return await this.tools();
  }

  async toolsByTag(tag: string) {
    return await this.toolsByTag(tag);
  }

  async deleteTool(id: number) {
    await this.deleteTool(id);
  }
}
