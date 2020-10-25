
import request from "supertest";
import app from "../src/index";
import { expect } from "chai";




describe("GET /task/tasks", () => {
  it("should return 200 OK", () => {
      return request(app).get("/user/info/wm194@qq.com")
          .expect(200);
  });
});