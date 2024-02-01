import { NextFunction, Request, Response } from "express";
import {
  ValidationError,
  body,
  param,
  validationResult,
} from "express-validator";
import { InvalidFild } from "../controller/error/Tools.Controller.Error";

type paramType = {
  path: string;
};

type errType = ValidationError & paramType;

const customValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors
      .array()
      .map((error: errType) => `${error.path}: ${error.msg}`);

    const error = new InvalidFild(
      `Erro de validação: ${errorMessages.join(", ")}`
    );
    return next(error);
  }

  next();
};
export const toolsInsertMiddleware = [
  body("title").notEmpty().withMessage("O título é obrigatório"),
  body("description").notEmpty().withMessage("A descrição é obrigatória"),
  body("link").notEmpty().isURL().withMessage("O link deve ser uma URL válida"),
  body("tags").notEmpty().isArray().withMessage("As tags devem ser um array"),
  customValidationMiddleware,
];

export const toolsByTagMiddleware = [
  param("tag").notEmpty().isString().withMessage("A tag deve ser uma string"),
  customValidationMiddleware,
];

export const toolsDeleteId = [
  param("id").notEmpty().isInt().withMessage("O ID deve ser um número inteiro"),
  customValidationMiddleware,
];
