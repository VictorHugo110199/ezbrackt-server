import jwt from "jsonwebtoken";
import request from "supertest";
import { DataSource } from "typeorm";
import "dotenv/config";

import app from "../../app";
import AppDataSource from "../../data-source";
import {
  mockedLogin,
  mockedInactiveUser,
  mockedUser,
  mockedUserDeleted,
  mockedLoginDeleted
} from "../mocks/user";

describe("/users", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Database initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("POST /Deve ser possivel criar usuário", async () => {
    const response = await request(app).post("/users").send(mockedUser);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("isActive");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).toHaveProperty("deletedAt");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body.name).toEqual("Fred");
    expect(response.body.email).toEqual("Fred@mail.com");
    expect(response.body.deletedAt).toEqual(null);
    expect(response.body.isActive).toEqual(true);
    expect(response.status).toBe(201);
  });

  it("POST /user Não deve ser possivel criar usuário que ja existe!", async () => {
    const response = await request(app).post("/users").send(mockedUser);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(409);
  });

  it("GET /users Deve ser possivel listar todos os usuários", async () => {
    const loginResponse = await request(app).post("/login").send(mockedLogin);
    const token = loginResponse.body.token;
    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${token as string}`);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0]).not.toHaveProperty("password");
  });

  it("GET /users Não deve ser possivel listar usuários sem tokem de autenticação", async () => {
    const response = await request(app).get("/users");

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  it("DELETE /users/:id Não deve ser possivel deletar usuário sem autenticação", async () => {
    const loginResponse = await request(app).post("/login").send(mockedLogin);
    const token = loginResponse.body.token;
    const user = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${token as string}`);
    const id = user.body[0].id;

    const response = await request(app).delete(`/users/${id as string}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  it("DELETE /users/:id Deve ser possivel deletar usuário", async () => {
    const userToBeDeleted = await request(app).post("/users").send(mockedUserDeleted);
    const loginResponse = await request(app).post("/login").send(mockedLoginDeleted);
    const token = loginResponse.body.token;

    const id = userToBeDeleted.body.id;

    const response = await request(app)
      .delete(`/users/${id as string}`)
      .set("Authorization", `Bearer ${token as string}`);

    expect(response.status).toBe(204);
  });

  it("DELETE /users/:id Não deve ser possivel deletar usuário inativo", async () => {
    const inactiveUser = await request(app).post("/users").send(mockedInactiveUser);
    const id = inactiveUser.body.id;

    const token = jwt.sign({ id: inactiveUser.body.id as string }, process.env.SECRET_KEY as string, {
      expiresIn: "24h",
      subject: inactiveUser?.body.email as string
    });

    const response = await request(app)
      .delete(`/users/${id as string}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  it("DELETE /users/:id Não deve ser possivel deletar usuário com id invalido", async () => {
    const loginResponse = await request(app).post("/login").send(mockedLogin);

    const response = await request(app)
      .delete(`/users/13970660-5dbe-423a-9a9d-5c23b37943cf`)
      .set("Authorization", `Bearer ${loginResponse.body.token as string}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  it("PATCH /users/:id Não deve ser possivel atualizar usuário sem token de autenticação", async () => {
    const loginResponse = await request(app).post("/login").send(mockedLogin);
    const token = loginResponse.body.token;
    const user = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${token as string}`);
    const id = user.body[0].id;
    const response = await request(app).patch(`/users/${id as string}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  it("PATCH /users/:id Não deve ser possivel atualizar usuario com id invalido", async () => {
    const loginResponse = await request(app).post("/login").send(mockedLogin);
    const token = loginResponse.body.token;

    const response = await request(app)
      .patch(`/users/13970660-5dbe-423a-9a9d-5c23b37943cf`)
      .set("Authorization", `Bearer ${token as string}`)
      .send({ name: "Gustavo" });

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });
  it("PATCH /users/:id Deve ser possivel atualizar usuário", async () => {
    const loginResponse = await request(app).post("/login").send(mockedLogin);
    const token = loginResponse.body.token;

    const user = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${token as string}`);
    const id = user.body[0].id;

    const response = await request(app)
      .patch(`/users/${id as string}`)
      .set("Authorization", `Bearer ${token as string}`)
      .send({ name: "Gustavo", email: "Gustavo@mail.com" });

    const userUpdated = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${token as string}`);

    expect(response.status).toBe(200);
    expect(userUpdated.body[0].name).toEqual("Gustavo");
    expect(userUpdated.body[0]).not.toHaveProperty("password");
  });
});
