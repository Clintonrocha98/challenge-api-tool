import { Tools } from "../domain/tools/Tools";
import { toolsDTO } from "../domain/tools/Tools.DTO";
import { IToolsRepository } from "../repository/ITools.Repository";
import { NotFoundTag, ToolNotExist } from "./error/Tools.Service.Error";

export class ToolsService {
  constructor(private toolsRepository: IToolsRepository) {}

  async insert(tools: toolsDTO) {
    const toolsCreate = new Tools(tools);
    return await this.toolsRepository.insert(toolsCreate);
  }

  async tools() {
    return await this.toolsRepository.tools();
  }

  async toolsByTag(tag: string) {
    const tools = await this.toolsRepository.toolsByTag(tag);
    if (tools.length === 0) {
      throw new NotFoundTag("Tag not found");
    }
    return tools;
  }

  async deleteTool(id: number) {
    const exist = await this.toolsRepository.toolExist(id);
    if (!exist) {
      throw new ToolNotExist("Tool not exist");
    }
    await this.toolsRepository.deleteTool(id);
  }
}
