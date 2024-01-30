import { ToolsController } from "../controller/Tools.Controller";
import { ToolsRepository } from "../repository/Tools.Repository";
import { ToolsService } from "../service/Tools.Service";

export const toolsFactory = () => {
  const toolsRepository = new ToolsRepository();
  const toolsService = new ToolsService(toolsRepository);
  const toolsController = new ToolsController(toolsService);
  return toolsController;
};
