import { ApiError } from "../../helpers/Api.Errors";

export class NotFoundTag extends ApiError {
  constructor(message: string) {
    super(message, 404);
  }
}

export class ToolNotExist extends ApiError {
  constructor(message: string) {
    super(message, 404);
  }
}
