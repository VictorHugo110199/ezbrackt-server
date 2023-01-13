import request from "supertest";
import { DataSource } from "typeorm";

import app from "../../app";
import AppDataSource from "../../data-source";
import { mockedLogin, mockedUser } from "../mocks/user";

describe("/login", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    await request(app).post("/users").send(mockedUser);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("GET /profile - Deve ser possível listar o usuário logado", async () => {
    await request(app).get("/profile").send(mockedUser);
    const loginResponse = await request(app).post("/login").send(mockedLogin);
    const token: string = loginResponse.body.token;
    const response = await request(app).get("/profile").set("Authorization", `Bearer ${token}`);

    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("photo");
    expect(response.body).toHaveProperty("isActive");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).not.toHaveProperty("password");
    expect(response.status).toBe(200);
  });
});
