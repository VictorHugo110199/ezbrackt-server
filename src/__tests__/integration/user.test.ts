import request from "supertest";
import { DataSource } from "typeorm";

import app from "../../app";
import AppDataSource from "../../data-source";
import { mockedLogin, mockedUser } from "../mocks/user";

describe("/users", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("POST /users - must be able to create a user", async () => {
    const response = await request(app).post("/users").send(mockedUser);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("isActive");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body.name).toEqual("Fred");
    expect(response.body.email).toEqual("fred@mail.com");
    expect(response.body.isActive).toEqual(true);
    expect(response.status).toBe(201);
  });

  it("POST /user - Should not be able to create a user that already exists.", async () => {
    const response = await request(app).post("/users").send(mockedUser);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(409);
  });

  it("GET /users -  Must be able to list users", async () => {
    await request(app).post("/users").send(mockedUser);
    const loginResponse = await request(app).post("/login").send(mockedLogin);
    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${loginResponse.body.token as string}`);

    expect(response.body).toHaveLength(1);
    expect(response.body[0]).not.toHaveProperty("password");
  });

  it("GET /users -  should not be able to list users without authentication", async () => {
    const response = await request(app).get("/users");

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  it("GET /users/:id -  Must be able to list user by id", async () => {
    await request(app).post("/users").send(mockedUser);

    const loginResponse = await request(app).post("/login").send(mockedLogin);
    const UserToBeGet = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${loginResponse.body.token as string}`);

    const response = await request(app)
      .get(`/users/${UserToBeGet.body[0].id as string}`)
      .set("Authorization", `Bearer ${loginResponse.body.token as string}`);

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

  it("GET /users/:id - should not be able to list user by id without authentication", async () => {
    const loginResponse = await request(app).post("/login").send(mockedLogin);
    const UserToBeGet = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${loginResponse.body.token as string}`);

    const response = await request(app).get(`/users/${UserToBeGet.body[0].id as string}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  it("GET /users/:id -  should not be able to list user by id with invalid id", async () => {
    await request(app).post("/users").send(mockedUser);

    const loginResponse = await request(app).post("/login").send(mockedLogin);

    const response = await request(app)
      .get(`/users/13970660-5dbe-423a-9a9d-5c23b37943cf`)
      .set("Authorization", `Bearer ${loginResponse.body.token as string}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  it("DELETE /users/:id -  should not be able to delete user without authentication", async () => {
    const loginResponse = await request(app).post("/login").send(mockedLogin);
    const UserTobeDeleted = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${loginResponse.body.token as string}`);

    const response = await request(app).delete(`/users/${UserTobeDeleted.body[0].id as string}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  it("DELETE /users/:id -  Must be able to soft delete user", async () => {
    await request(app).post("/users").send(mockedUser);

    const loginResponse = await request(app).post("/login").send(mockedLogin);

    const UserTobeDeleted = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${loginResponse.body.token as string}`);

    const response = await request(app)
      .delete(`/users/${UserTobeDeleted.body[0].id as string}`)
      .set("Authorization", `Bearer ${loginResponse.body.token as string}`);

    const findUser = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${loginResponse.body.token as string}`);

    expect(response.status).toBe(204);
    expect(findUser.body[0].isActive).toBe(false);
  });

  it("DELETE /users/:id -  shouldn't be able to delete user with isActive = false", async () => {
    await request(app).post("/users").send(mockedUser);

    const loginResponse = await request(app).post("/login").send(mockedLogin);

    const UserTobeDeleted = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${loginResponse.body.token as string}`);

    const response = await request(app)
      .delete(`/users/${UserTobeDeleted.body[0].id as string}`)
      .set("Authorization", `Bearer ${loginResponse.body.token as string}`);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("message");
  });

  it("DELETE /users/:id -  should not be able to delete user with invalid id", async () => {
    await request(app).post("/users").send(mockedUser);

    const loginResponse = await request(app).post("/login").send(mockedLogin);

    const response = await request(app)
      .delete(`/users/13970660-5dbe-423a-9a9d-5c23b37943cf`)
      .set("Authorization", `Bearer ${loginResponse.body.token as string}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  it("PATCH /users/:id -  should not be able to update user without authentication", async () => {
    const loginResponse = await request(app).post("/login").send(mockedLogin);
    const userTobeUpdate = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${loginResponse.body.token as string}`);
    const response = await request(app).patch(`/users/${userTobeUpdate.body[0].id as string}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  it("PATCH /users/:id - should not be able to update user with invalid id", async () => {
    const newValues = { name: "Joana Brito", email: "joanabrito@mail.com" };

    const admingLoginResponse = await request(app).post("/login").send(mockedLogin);
    const token = `Bearer ${admingLoginResponse.body.token as string}`;

    const response = await request(app)
      .patch(`/users/13970660-5dbe-423a-9a9d-5c23b37943cf`)
      .set("Authorization", token)
      .send(newValues);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  it("PATCH /users/:id -  should be able to update user", async () => {
    const newValues = { name: "Joana Brito", email: "joanabrito@mail.com" };

    const admingLoginResponse = await request(app).post("/login").send(mockedLogin);
    const token = `Bearer ${admingLoginResponse.body.token as string}`;

    const userTobeUpdateRequest = await request(app).get("/users").set("Authorization", token);
    const userTobeUpdateId = userTobeUpdateRequest.body[0].id;

    const response = await request(app)
      .patch(`/users/${userTobeUpdateId as string}`)
      .set("Authorization", token)
      .send(newValues);

    const userUpdated = await request(app).get("/users").set("Authorization", token);

    expect(response.status).toBe(200);
    expect(userUpdated.body[0].name).toEqual("Joana Brito");
    expect(userUpdated.body[0]).not.toHaveProperty("password");
  });
});
