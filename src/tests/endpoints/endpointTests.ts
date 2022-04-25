import supertest from "supertest";
import app from "../../server";

const request = supertest(app);

// TODO: Check all routes with all possible inputs including null
// ? NOTE: Controllers are tested here

export default function () {
  describe("Endpoint Tests", () => {
    it("true is true", () => {
      expect(true).toBe(true);
    });
  });
}
