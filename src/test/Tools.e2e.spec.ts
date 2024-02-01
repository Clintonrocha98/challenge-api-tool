// import { test, expect, describe } from "vitest";
// import { app } from "../config/express";
// import request from "supertest";
// import { NotFoundTag } from "../service/error/Tools.Service.Error";

// describe("tools controller", () => {
//   test("hello world", async () => {
//     await request(app).get("/").expect(200);
//   });

//   test("POST /tools must return 201 and the return must have the id property", async () => {
//     const response = await request(app)
//       .post("/tools")
//       .send({
//         title: "Example Tool",
//         description: "This is an example tool",
//         link: "https://example.com",
//         tags: ["tag1", "tag2"],
//       });

//     expect(response.status).toBe(201);
//     expect(response.body).toHaveProperty("id");
//   });

//   test("POST /tools should return 400 for invalid data", async () => {
//     const response = await request(app)
//       .post("/tools")
//       .send({
//         title: "",
//         description: "",
//         link: "",
//         tags: [],
//       })
//       .expect(400);
//   });

//   test("test tag", async () => {
//     const response = await request(app).get("/tools/node");
//     console.log(response.status);
//     expect(response).rejects.toThrow(NotFoundTag);
//     expect(response.status).toBe(404);
//     expect(response.body.error).to.equal("Tag not found");
//   });
// });
