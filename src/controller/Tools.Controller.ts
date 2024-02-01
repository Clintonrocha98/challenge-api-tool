import { Request, Response } from "express";
import { ToolsService } from "../service/Tools.Service";

export class ToolsController {
  constructor(private toolsService: ToolsService) {}

  async insert(req: Request, res: Response) {
    const { title, description, link, tags } = req.body;

    const tools = await this.toolsService.insert({
      title,
      description,
      link,
      tags,
    });

    res.status(201).json(tools);
  }
  async tools(req: Request, res: Response) {
    const tools = await this.toolsService.tools();

    res.status(200).json(tools);
  }
  async toolsByTag(req: Request, res: Response) {
    const { tag } = req.params;
    const tool = await this.toolsService.toolsByTag(tag);
    res.status(200).json(tool);
  }
  async deleteTool(req: Request, res: Response) {
    const { id } = req.params;
    await this.toolsService.deleteTool(Number(id));
    res.status(200).json();
  }
}
