import { toolsDTO } from "./Tools.DTO";

export class Tools {
  id?: number;
  title: string;
  link: string;
  description: string;
  tags: string[];

  constructor({ title, description, link, tags }: toolsDTO) {
    return Object.assign(this, { title, description, link, tags });
  }
}
