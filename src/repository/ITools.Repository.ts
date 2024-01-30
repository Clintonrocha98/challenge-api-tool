import { Tools } from "../domain/tools/Tools";
import { toolsDTO } from "../domain/tools/Tools.DTO";

export interface IToolsRepository {
  insert(toolsDTO: toolsDTO): Promise<Tools>;
  tools(): Promise<Tools[] | []>;
  toolsByTag(tag: string): Promise<Tools[] | []>;
  deleteTool(id: number): Promise<void>;
  toolExist(id: number): Promise<boolean>;
}
