import request from "supertest";
import { DataSource } from "typeorm";

import app from "../../app";
import AppDataSource from "../../data-source";
import { mockCompetition } from "../mocks/competitions";
import { mockedPlayer1, mockedPlayer2, mockedPlayer3, mockedPlayer4 } from "../mocks/players";
import { mockedLogin, mockedUser, mockedUserDeleted, mockedLoginDeleted } from "../mocks/user";

describe("/players", () => {
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

  it("POST / Deve ser possivel adicionar players as competições", async () => {
    await request(app).post("/users").send(mockedUser);
    const loginResponse = await request(app).post("/login").send(mockedLogin);
    const token: string = loginResponse.body.token;

    const competition = await request(app)
      .post("/competitions")
      .send(mockCompetition)
      .set("Authorization", `Bearer ${token}`);
    const id: string = competition.body.id;

    const response = await request(app)
      .post(`/competitions/${id}/players`)
      .send(mockedPlayer1)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("competition");
    expect(response.body).toHaveProperty("photo");
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toEqual("victor");
  });

  it("POST /players Não deve ser possivel adicionar players a uma competição sem token de autenticação.", async () => {
    const competition = await request(app).post("/competitions").send(mockCompetition);

    const id: string = competition.body.id;

    const response = await request(app).post(`/competitions/${id}/players`).send(mockedPlayer1);

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  it("POST /players Não deve ser possivel adicionar players a um campeonato com id invalido.", async () => {
    const loginResponse = await request(app).post("/login").send(mockedLogin);
    const token: string = loginResponse.body.token;

    const response = await request(app)
      .post(`/competitions/07389483-27e8-4870-809e-90b5e3533045/players`)
      .send(mockedPlayer1)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  it("POST /players Não deve ser possivel adicionar um numero de players maior que os de competidores do campeonato", async () => {
    const loginResponse = await request(app).post("/login").send(mockedLogin);
    const token: string = loginResponse.body.token;

    const competition = await request(app)
      .post("/competitions")
      .send(mockCompetition)
      .set("Authorization", `Bearer ${token}`);
    const id: string = competition.body.id;

    await request(app)
      .post(`/competitions/${id}/players`)
      .send(mockedPlayer1)
      .set("Authorization", `Bearer ${token}`);
    await request(app)
      .post(`/competitions/${id}/players`)
      .send(mockedPlayer2)
      .set("Authorization", `Bearer ${token}`);
    await request(app)
      .post(`/competitions/${id}/players`)
      .send(mockedPlayer3)
      .set("Authorization", `Bearer ${token}`);
    await request(app)
      .post(`/competitions/${id}/players`)
      .send(mockedPlayer4)
      .set("Authorization", `Bearer ${token}`);
    const response = await request(app)
      .post(`/competitions/${id}/players`)
      .send(mockedPlayer1)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(409);
    expect(response.body).toHaveProperty("message");
  });

  it("PATCH /players Deve ser possivel editar um player", async () => {
    const loginResponse = await request(app).post("/login").send(mockedLogin);
    const token: string = loginResponse.body.token;

    const competition = await request(app)
      .post("/competitions")
      .send(mockCompetition)
      .set("Authorization", `Bearer ${token}`);
    const id: string = competition.body.id;
    const player = await request(app)
      .post(`/competitions/${id}/players`)
      .send(mockedPlayer1)
      .set("Authorization", `Bearer ${token}`);
    const playerId: string = player.body.id;

    const response = await request(app)
      .patch(`/players/${playerId}`)
      .send({ name: "Ernesto" })
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("photo");
    expect(response.body.name).toEqual("Ernesto");
  });

  it("PATCH /players Não deve ser possivel editar player sem token de autenticação", async () => {
    const loginResponse = await request(app).post("/login").send(mockedLogin);
    const token: string = loginResponse.body.token;

    const competition = await request(app)
      .post("/competitions")
      .send(mockCompetition)
      .set("Authorization", `Bearer ${token}`);
    const id: string = competition.body.id;

    const player = await request(app)
      .post(`/competitions/${id}/players`)
      .send(mockedPlayer1)
      .set("Authorization", `Bearer ${token}`);
    const playerId: string = player.body.id;

    const response = await request(app).patch(`/players/${playerId}`).send({ name: "Ernesto" });

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  it("PATCH /players Não deve ser possivel editar um player com id inválido", async () => {
    const loginResponse = await request(app).post("/login").send(mockedLogin);
    const token: string = loginResponse.body.token;

    const competition = await request(app)
      .post("/competitions")
      .send(mockCompetition)
      .set("Authorization", `Bearer ${token}`);
    const id: string = competition.body.id;

    await request(app)
      .post(`/competitions/${id}/players`)
      .send(mockedPlayer1)
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .patch(`/players/07389483-27e8-4870-809e-90b5e3533045`)
      .send({ name: "Ernesto" })
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  it("PATCH /players Não deve ser possivel editar player de outro usuário", async () => {
    const loginResponse = await request(app).post("/login").send(mockedLogin);
    const token: string = loginResponse.body.token;

    const competition = await request(app)
      .post("/competitions")
      .send(mockCompetition)
      .set("Authorization", `Bearer ${token}`);
    const id: string = competition.body.id;

    const player = await request(app)
      .post(`/competitions/${id}/players`)
      .send(mockedPlayer1)
      .set("Authorization", `Bearer ${token}`);
    const playerId: string = player.body.id;

    await request(app).post("/users").send(mockedUserDeleted);
    const secondLoginResponse = await request(app).post("/login").send(mockedLoginDeleted);
    const secondToken: string = secondLoginResponse.body.token;
    const response = await request(app)
      .patch(`/players/${playerId}`)
      .send({ name: "Ernesto" })
      .set("Authorization", `Bearer ${secondToken}`);

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  it("GET /players Deve ser possivel listar todos os players de uma competição", async () => {
    const loginResponse = await request(app).post("/login").send(mockedLogin);
    const token: string = loginResponse.body.token;

    const competition = await request(app)
      .post("/competitions")
      .send(mockCompetition)
      .set("Authorization", `Bearer ${token}`);
    const id: string = competition.body.id;

    await request(app)
      .post(`/competitions/${id}/players`)
      .send(mockedPlayer1)
      .set("Authorization", `Bearer ${token}`);
    await request(app)
      .post(`/competitions/${id}/players`)
      .send(mockedPlayer2)
      .set("Authorization", `Bearer ${token}`);
    await request(app)
      .post(`/competitions/${id}/players`)
      .send(mockedPlayer3)
      .set("Authorization", `Bearer ${token}`);
    await request(app)
      .post(`/competitions/${id}/players`)
      .send(mockedPlayer4)
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .get(`/competitions/${id}/players`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("GET /players Não deve ser possivel listar os player de uma competição sem token de autenticação", async () => {
    const loginResponse = await request(app).post("/login").send(mockedLogin);
    const token: string = loginResponse.body.token;

    const competition = await request(app)
      .post("/competitions")
      .send(mockCompetition)
      .set("Authorization", `Bearer ${token}`);
    const id: string = competition.body.id;

    await request(app)
      .post(`/competitions/${id}/players`)
      .send(mockedPlayer1)
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app).get(`/competitions/${id}/players`);

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  it("GET /players Não deve ser possivel listar os players de um campeonato com id inválido", async () => {
    const loginResponse = await request(app).post("/login").send(mockedLogin);
    const token: string = loginResponse.body.token;

    const competition = await request(app)
      .post("/competitions")
      .send(mockCompetition)
      .set("Authorization", `Bearer ${token}`);
    const id: string = competition.body.id;

    await request(app)
      .post(`/competitions/${id}/players`)
      .send(mockedPlayer1)
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .get(`/competitions/07389483-27e8-4870-809e-90b5e3533045/players`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("message");
  });
});
