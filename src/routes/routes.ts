import { Request, Response, Router } from "express";
import { toolsFactory } from "../factory/Tools.Factory";
import {
  toolsByTagMiddleware,
  toolsDeleteId,
  toolsInsertMiddleware,
} from "../middleware/Tools.Middleware";

const routes = Router();
routes.get("/", (req, res) => {
  res.send("hello world");
});

routes.post("/tools", toolsInsertMiddleware, (req: Request, res: Response) =>
  toolsFactory().insert(req, res)
);
routes.get("/tools", (req: Request, res: Response) =>
  toolsFactory().tools(req, res)
);
routes.get("/tools/:tag", toolsByTagMiddleware, (req: Request, res: Response) =>
  toolsFactory().toolsByTag(req, res)
);

routes.delete("/tools/:id", toolsDeleteId, (req: Request, res: Response) =>
  toolsFactory().deleteTool(req, res)
);

export { routes };
