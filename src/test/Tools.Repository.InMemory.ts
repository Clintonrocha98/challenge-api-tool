import { Tools } from "../domain/tools/Tools";
import { toolsDTO } from "../domain/tools/Tools.DTO";
import { IToolsRepository } from "../repository/ITools.Repository";

export class InMemoryToolsRepository implements IToolsRepository {
  private toolsArray: Tools[] = [];

  async insert({ title, description, link, tags }: toolsDTO): Promise<Tools> {
    const newTool: Tools = {
      id: this.toolsArray.length + 1,
      title,
      description,
      link,
      tags,
    };

    this.toolsArray.push(newTool);
    return newTool;
  }

  async tools(): Promise<Tools[]> {
    return this.toolsArray;
  }

  async toolsByTag(tag: string): Promise<Tools[]> {
    return this.toolsArray.filter((tool) => tool.tags.includes(tag));
  }

  async toolExist(id: number): Promise<boolean> {
    const exist = this.toolsArray.find((t) => t.id === id);
    return !!exist;
  }

  async deleteTool(id: number): Promise<void> {
    this.toolsArray = this.toolsArray.filter((tool) => tool.id !== id);
  }
}
