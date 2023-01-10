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

  it("POST /login -  should be able to login with the user", async () => {
    const response = await request(app).post("/login").send(mockedLogin);

    expect(response.body).toHaveProperty("token");
    expect(response.status).toBe(200);
  });

  it("POST /login -  should not be able to login with the user with incorrect password or email", async () => {
    const response = await request(app).post("/login").send({
      email: "matheus@mail.com",
      password: "1234567"
    });

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  it("POST /login -  should not be able to login with the user with isActive = false", async () => {
    const loginResponse = await request(app).post("/login").send(mockedLogin);

    const findUser = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${loginResponse.body.token as string}`);

    await request(app)
      .delete(`/users/${findUser.body[0].id as string}`)
      .set("Authorization", `Bearer ${loginResponse.body.token as string}`);

    const response = await request(app).post("/login").send(mockedLogin);
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });
});
