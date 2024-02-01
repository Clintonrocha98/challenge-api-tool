import { ApiError } from "../../helpers/Api.Errors";

export class InvalidFild extends ApiError {
  constructor(message: string) {
    super(message, 400);
  }
}
