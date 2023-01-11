import request from "supertest";
import { DataSource } from "typeorm";

import app from "../../app";
import AppDataSource from "../../data-source";
import { mockCompetition } from "../mocks/competitions";
import { mockedLogin, mockedUser, mockedUserDeleted, mockedLoginDeleted } from "../mocks/user";

describe("/competitions", () => {
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

  it("POST /competition Deve ser possivel criar uma competição", async () => {
    await request(app).post("/users").send(mockedUser);
    const loginResponse = await request(app).post("/login").send(mockedLogin);
    const token = loginResponse.body.token;

    const response = await request(app)
      .post("/competitions")
      .send(mockCompetition)
      .set("Authorization", `Bearer ${token as string}`);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("winner");
    expect(response.body).toHaveProperty("number_players");
    expect(response.body).toHaveProperty("description");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).toHaveProperty("isActive");
    expect(response.body.name).toEqual("Torneio da Kenzie");
    expect(response.body.number_players).toEqual(8);
  });

  it("POST /competitions Não deve ser possivel criar uma competição sem token de autenticação", async () => {
    const response = await request(app).post("/competitions").send(mockCompetition);

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  it("GET /competitions Deve ser possivel listar todas as competições", async () => {
    const loginResponse = await request(app).post("/login").send(mockedLogin);
    const token = loginResponse.body.token;
    const response = await request(app)
      .get("/competitions")
      .set("Authorization", `Bearer ${token as string}`);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0]).toHaveProperty("name");
  });

  it("GET /competitions Não deve ser possivel listar competições sem token de autenticação", async () => {
    const response = await request(app).get("/competitions");

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  it("PATCH /competitions Deve ser possivel editar uma competição", async () => {
    const loginResponse = await request(app).post("/login").send(mockedLogin);
    const token = loginResponse.body.token;

    const competitions = await request(app)
      .get("/competitions")
      .set("Authorization", `Bearer ${token as string}`);

    const id = competitions.body[0].id;
    const response = await request(app)
      .patch(`/competitions/${id as string}`)
      .send({ name: "Teste de editar" })
      .set("Authorization", `Bearer ${token as string}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toEqual("Teste de editar");
  });

  it("PATCH /competitions Não deve ser possivel editar uma competição sem token de autentiocação", async () => {
    const loginResponse = await request(app).post("/login").send(mockedLogin);
    const token = loginResponse.body.token;

    const competitions = await request(app)
      .get("/competitions")
      .set("Authorization", `Bearer ${token as string}`);

    const id = competitions.body[0].id;
    const response = await request(app)
      .patch(`/competitions/${id as string}`)
      .send({ name: "Teste de editar" });

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  it("PATCH /competitions Não deve ser possivel editar um campeonato com um id inválido", async () => {
    const loginResponse = await request(app).post("/login").send(mockedLogin);
    const token = loginResponse.body.token;

    const response = await request(app)
      .patch(`/competitions/07389483-27e8-4870-809e-90b5e3533045`)
      .send({ name: "Teste de editar" })
      .set("Authorization", `Bearer ${token as string}`);

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  it("PATCH /compeitions Não deve ser possivel editar campeonatos de outros usuários.", async () => {
    await request(app).post("/users").send(mockedUserDeleted);
    const loginResponse = await request(app).post("/login").send(mockedLoginDeleted);
    const token = loginResponse.body.token;

    const competitions = await request(app)
      .get("/competitions")
      .set("Authorization", `Bearer ${token as string}`);

    const id = competitions.body[0].id;
    const response = await request(app)
      .patch(`/competitions/${id as string}`)
      .send({ name: "Teste de editar" })
      .set("Authorization", `Bearer ${token as string}`);

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  it("DELETE /competitions Não deve ser possivel deletar uma competição sem token de autentiocação", async () => {
    const loginResponse = await request(app).post("/login").send(mockedLogin);
    const token = loginResponse.body.token;

    const competitions = await request(app)
      .get("/competitions")
      .set("Authorization", `Bearer ${token as string}`);

    const id = competitions.body[0].id;
    const response = await request(app).delete(`/competitions/${id as string}`);

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  it("DELETE /competitions Não deve ser possivel deletar um campeonato com um id inválido", async () => {
    const loginResponse = await request(app).post("/login").send(mockedLogin);
    const token = loginResponse.body.token;

    const response = await request(app)
      .delete(`/competitions/07389483-27e8-4870-809e-90b5e3533045`)
      .set("Authorization", `Bearer ${token as string}`);

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  it("DELETE /compeitions Não deve ser possivel editar campeonatos de outros usuários.", async () => {
    const loginResponse = await request(app).post("/login").send(mockedLoginDeleted);
    const token = loginResponse.body.token;

    const competitions = await request(app)
      .get("/competitions")
      .set("Authorization", `Bearer ${token as string}`);

    const id = competitions.body[0].id;
    const response = await request(app)
      .delete(`/competitions/${id as string}`)
      .set("Authorization", `Bearer ${token as string}`);

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  it("DELETE /competitions Deve ser possivel deletar uma competição", async () => {
    const loginResponse = await request(app).post("/login").send(mockedLogin);
    const token = loginResponse.body.token;

    const competitions = await request(app)
      .get("/competitions")
      .set("Authorization", `Bearer ${token as string}`);

    const id = competitions.body[0].id;
    const response = await request(app)
      .delete(`/competitions/${id as string}`)
      .set("Authorization", `Bearer ${token as string}`);

    expect(response.statusCode).toBe(204);
  });
});
