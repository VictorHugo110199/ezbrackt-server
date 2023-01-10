import request from "supertest";
import { DataSource } from "typeorm";

import app from "../../app";
import AppDataSource from "../../data-source";
import { mockedInactiveLogin, mockedInactiveUser, mockedLogin, mockedUser } from "../mocks/user";

describe("/login", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Database initialization", err);
      });

    await request(app).post("/users").send(mockedUser);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("POST /login Deve ser possivel logar usuário", async () => {
    const response = await request(app).post("/login").send(mockedLogin);

    expect(response.body).toHaveProperty("token");
    expect(response.status).toBe(200);
  });

  it("POST /login -  Não deve ser possivel logar usuário com email ou senha incorretos.", async () => {
    const response = await request(app).post("/login").send({
      email: "Ayrton@mail.com",
      password: "@Ayrton123"
    });

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  it("POST /login -  Não deve ser possivel logar usuario inativo", async () => {
    const inactiveUser = await request(app).post("/users").send(mockedInactiveUser);
    console.log(inactiveUser.body);

    const response = await request(app).post("/login").send(mockedInactiveLogin);
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });
});
