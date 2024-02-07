import { Request, Response, Router } from "express";
import { toolsFactory } from "../factory/Tools.Factory";
import {
  toolsByTagMiddleware,
  toolsDeleteId,
  toolsInsertMiddleware,
} from "../middleware/Tools.Middleware";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../../swagger.json";

const routes = Router();

routes.use("/api-docs", swaggerUi.serve);

routes.get("/api-docs", swaggerUi.setup(swaggerDocument));

routes.get("/", (req, res) => {
  res.status(200).json({ hello: "world" });
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
