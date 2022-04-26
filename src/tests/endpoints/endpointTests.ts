import supertest from "supertest";
import app from "../../server";

const request = supertest(app);

export default function () {
  describe("Endpoint Tests", () => {
    it("GET /raw/:data response status code 200",async () => {
      const response = await request.get("/raw/test");
      expect(response.status).toBe(200);
    });

    it("GET /api/:data response status code 200",async(done) => {
      const response = await request.get("/api/test");
      expect(response.status).toBe(200);
      done();
    });

    it("GET /raw/:data with no user input", async () => {
      const response = await request.get("/raw/");
      expect(response.status).toBe(200);
    });

    it("GET /api/:data with no user input", async () => {
      const response = await request.get("/api/");
      expect(response.status).toBe(200);
    });
  });
}
