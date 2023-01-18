import { Response } from "superagent";
import request from "supertest";
import { DataSource } from "typeorm";

import app from "../../app";
import AppDataSource from "../../data-source";
import { mockCompetition } from "../mocks/competitions";
import { mockedPlayer1, mockedPlayer2, mockedPlayer3, mockedPlayer4 } from "../mocks/players";
import { mockedLogin, mockedUser } from "../mocks/user";

describe("/brackets", () => {
  let connection: DataSource;
  let id: string;
  let token: string;
  let user: Response;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Database initialization", err);
      });

    user = await request(app).post("/users").send(mockedUser);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  beforeEach(async () => {
    const loginResponse = await request(app).post("/login").send(mockedLogin);
    token = loginResponse.body.token;

    const competition = await request(app)
      .post("/competitions")
      .send(mockCompetition)
      .set("Authorization", `Bearer ${token}`);

    id = competition.body.id;

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
  });

  it("POST /brackets Deve ser possivel criar o chaveamento inicial do torneio", async () => {
    const response = await request(app).post(`/brackets/${id}`).set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("winner");
    expect(response.body).toHaveProperty("number_players");
    expect(response.body).toHaveProperty("isActive");
    expect(response.body).toHaveProperty("players");
    expect(response.body).toHaveProperty("bracket");
    expect(response.body.isActive).toBe(true);
    expect(response.body.status).toBe(true);
    expect(Array.isArray(response.body.players)).toBe(true);
    expect(Array.isArray(response.body.bracket)).toBe(true);
  });

  it("POST /brackets Deve ser possivel declarar o vencedor da rodada", async () => {
    const bracket = await request(app).post(`/brackets/${id}`).set("Authorization", `Bearer ${token}`);

    const bracketId: string = bracket.body.bracket[0].id;

    const winner = bracket.body.bracket[0].player1;

    const response = await request(app)
      .post(`/brackets/winner/${bracketId}`)
      .send({ winner: winner.id })
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("currentRound");
    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("winner");
    expect(response.body).toHaveProperty("player1");
    expect(response.body).toHaveProperty("player2");
    expect(response.body).toHaveProperty("competition");

    expect(response.body.status).toBe(true);
    expect(response.body.winner.id).toEqual(winner.id);
    expect(response.body.winner.name).toEqual(winner.name);
  });

  it("POST /brackets Deve ser possivel gerar a proxima rodada", async () => {
    const bracket = await request(app).post(`/brackets/${id}`).set("Authorization", `Bearer ${token}`);
    const bracketId: string = bracket.body.bracket[0].id;

    const winner = bracket.body.bracket[0].player2;

    await request(app).post(`/brackets/winner/${bracketId}`).send({ winner: winner.id });
    const response = await request(app).post(`/brackets/games/${id}`).set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("winner");
    expect(response.body).toHaveProperty("number_players");
    expect(response.body).toHaveProperty("isActive");
    expect(response.body).toHaveProperty("players");
    expect(response.body).toHaveProperty("bracket");
    expect(Array.isArray(response.body.players)).toBe(true);
    expect(Array.isArray(response.body.bracket)).toBe(true);
  });
});
