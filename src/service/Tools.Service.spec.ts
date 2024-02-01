import { test, expect, describe, beforeAll, vi } from "vitest";
import { ToolsService } from "./Tools.Service";
import { InMemoryToolsRepository } from "../test/Tools.Repository.InMemory";
import { NotFoundTag, ToolNotExist } from "./error/Tools.Service.Error";

let toolsRepository: InMemoryToolsRepository;
let toolService: ToolsService;

beforeAll(() => {
  toolsRepository = new InMemoryToolsRepository();
  toolService = new ToolsService(toolsRepository);
});

describe("tools service", () => {
  test("It should be possible to create a tool", async () => {
    const tool = await toolService.insert({
      title: "node",
      description: "node é legal",
      link: "node site legal ponto com",
      tags: ["node a", "node b"],
    });
    expect(tool).toHaveProperty("id");
  });

  test("Must return an array", async () => {
    const tool = await toolService.tools();
    expect(Array.isArray(tool)).toBe(true);
  });

  test("Tag found", async () => {
    const tagToFind = "node d";

    const toolsRepositoryMock = {
      insert: vi.fn().mockResolvedValue({}),
      tools: vi.fn().mockResolvedValue({}),
      toolsByTag: vi.fn().mockResolvedValue([
        {
          id: 45,
          title: "node",
          description: "node é legal",
          link: "node site legal ponto com",
          tags: ["node a", "node d"],
        },
        {
          id: 46,
          title: "node",
          description: "node é legal",
          link: "node site legal ponto com",
          tags: ["node a", "node d"],
        },
      ]),
      toolExist: vi.fn().mockResolvedValue(true),
      deleteTool: vi.fn().mockResolvedValue(true),
    };
    const toolsService = new ToolsService(toolsRepositoryMock);

    const foundTools = await toolsService.toolsByTag(tagToFind);

    expect(toolsRepositoryMock.toolsByTag).toHaveBeenCalledWith(tagToFind);

    expect(foundTools).toEqual([
      {
        id: 45,
        title: "node",
        description: "node é legal",
        link: "node site legal ponto com",
        tags: ["node a", "node d"],
      },
      {
        id: 46,
        title: "node",
        description: "node é legal",
        link: "node site legal ponto com",
        tags: ["node a", "node d"],
      },
    ]);
  });

  test("Tag not found", async () => {
    await expect(toolService.toolsByTag("node d")).rejects.toThrow(NotFoundTag);
  });

  test("You must delete a tool", async () => {
    const existingToolId = 1;

    const toolsRepositoryMock = {
      insert: vi.fn().mockResolvedValue({}),
      tools: vi.fn().mockResolvedValue({}),
      toolsByTag: vi.fn().mockResolvedValue({}),
      toolExist: vi.fn().mockResolvedValue(true),
      deleteTool: vi.fn().mockResolvedValue(true),
    };

    const toolsService = new ToolsService(toolsRepositoryMock);

    await toolsService.deleteTool(existingToolId);

    expect(toolsRepositoryMock.toolExist).toHaveBeenCalledWith(existingToolId);
    expect(toolsRepositoryMock.deleteTool).toHaveBeenCalledWith(existingToolId);
  });
  test("You shouldn't be able to delete the tool", async () => {
    const nonExistingToolId = 555;

    const toolsRepositoryMock = {
      insert: vi.fn().mockResolvedValue({}),
      tools: vi.fn().mockResolvedValue({}),
      toolsByTag: vi.fn().mockResolvedValue({}),
      toolExist: vi.fn().mockResolvedValue(false),
      deleteTool: vi.fn().mockResolvedValue(true),
    };

    const toolsService = new ToolsService(toolsRepositoryMock);

    await expect(toolsService.deleteTool(nonExistingToolId)).rejects.toThrow(
      ToolNotExist
    );

    expect(toolsRepositoryMock.toolExist).toHaveBeenCalledWith(
      nonExistingToolId
    );
    expect(toolsRepositoryMock.deleteTool).not.toHaveBeenCalled();
  });
});
