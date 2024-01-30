import { body, param } from "express-validator";

export const toolsInsertMiddleware = [
  body("title").notEmpty().withMessage("O título é obrigatório"),
  body("description").notEmpty().withMessage("A descrição é obrigatória"),
  body("link").isURL().withMessage("O link deve ser uma URL válida"),
  body("tags").isArray().withMessage("As tags devem ser um array"),
];

export const toolsByTagMiddleware = [
  param("tag").isString().withMessage("A tag deve ser uma string"),
];

export const toolsDeleteId = [
  param("id").isInt().withMessage("O ID deve ser um número inteiro"),
];
