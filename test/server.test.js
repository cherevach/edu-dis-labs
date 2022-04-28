const axios = require("axios");
const url = "http://localhost:8080/presidents";

describe("Сreate entities", () => {
  test("Create one entity", async () => {
    const response = await axios.post(url, {
      name: "Donald Trump",
      photo:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Donald_Trump_official_portrait.jpg/440px-Donald_Trump_official_portrait.jpg",
    });
    expect(response.status).toBe(201);
  });
  test("Create one more entity", async () => {
    const response = await axios.post(url, {
      name: "Barack Obama",
      photo:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/President_Barack_Obama.jpg/440px-President_Barack_Obama.jpg",
    });
    expect(response.status).toBe(201);
  });

  test("Create one more entity", async () => {
    const response = await axios.post(url, {
      name: "Joe Biden",
      photo:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Joe_Biden_presidential_portrait.jpg/440px-Joe_Biden_presidential_portrait.jpg",
    });
    expect(response.status).toBe(201);
  });

  test("Create entity with invalid body", async () => {
    try {
      await axios.post(url, { name: "Some Name" });
    } catch (err) {
      expect(err.response.status).toBe(400);
    }
  });
});

describe("Get entities", () => {
  test("Get all entities", async () => {
    const response = await axios.get(url);
    expect(response.status).toBe(200);
    expect(response.data.length).toBe(3);
  });

  test("Get entity by id in params", async () => {
    const entities = await axios.get(url);
    const id = entities.data[0]._id;
    const response = await axios.get(`${url}/${id}`);
    expect(response.status).toBe(200);
    expect(response.data.name).toBe("Donald Trump");
  });

  test("Get entity by id in query", async () => {
    const entities = await axios.get(url);
    const id = entities.data[1]._id;
    const response = await axios.get(`${url}?id=${id}`);
    expect(response.status).toBe(200);
    expect(response.data.name).toBe("Barack Obama");
  });

  test("Get entity by non-existent id in params", async () => {
    try {
      await axios.get(`${url}/1`);
    } catch (err) {
      expect(err.response.status).toBe(404);
    }
  });
  test("Get entity by non-existent id in query", async () => {
    try {
      await axios.get(`${url}?id=1`);
    } catch (err) {
      expect(err.response.status).toBe(404);
    }
  });
});

describe("Update entities", () => {
  test("Update entity by id in params", async () => {
    const entities = await axios.get(url);
    const response = await axios.put(`${url}/${entities.data[0]._id}`, {
      name: "New President 1",
      photo: "new photo 1",
    });
    expect(response.status).toBe(204);
  });

  test("Update entity by id in query", async () => {
    const entities = await axios.get(url);
    const response = await axios.put(`${url}?id=${entities.data[1]._id}`, {
      name: "New President 2",
      photo: "new photo 2",
    });
    expect(response.status).toBe(204);
  });

  test("Update entity with non-existent id", async () => {
    try {
      await axios.put(`${url}/1`, {
        name: "Name",
        photo: "Photo",
      });
    } catch (err) {
      expect(err.response.status).toBe(404);
    }
  });

  test("Update entity with invalid body", async () => {
    const entities = await axios.get(url);
    try {
      await axios.put(`${url}/${entities.data[0]._id}`, {
        name: "New name",
      });
    } catch (err) {
      expect(err.response.status).toBe(400);
    }
  });
});

describe("Update entities", () => {
  test("Update entity by id in params", async () => {
    const entities = await axios.get(url);
    const response = await axios.put(`${url}/${entities.data[0]._id}`, {
      name: "New President 1",
      photo: "new photo 1",
    });
    expect(response.status).toBe(204);
  });

  test("Update entity by id in query", async () => {
    const entities = await axios.get(url);
    const response = await axios.put(`${url}?id=${entities.data[1]._id}`, {
      name: "New President 2",
      photo: "new photo 2",
    });
    expect(response.status).toBe(204);
  });

  test("Update entity with non-existent id", async () => {
    try {
      await axios.put(`${url}/1`, {
        name: "Name",
        photo: "Photo",
      });
    } catch (err) {
      expect(err.response.status).toBe(404);
    }
  });
});

describe("Delete entities", () => {
  test("Delete entity by id in params", async () => {
    const entities = await axios.get(url);
    const response = await axios.delete(`${url}/${entities.data[0]._id}`);
    expect(response.status).toBe(204);
  });

  test("Delete entity by id in query", async () => {
    const entities = await axios.get(url);
    const response = await axios.delete(`${url}?id=${entities.data[1]._id}`);
    expect(response.status).toBe(204);
  });
  test("Delete entity by non-existent id in params", async () => {
    try {
      await axios.delete(`${url}/1`);
    } catch (err) {
      expect(err.response.status).toBe(404);
    }
  });
  test("Delete entity by non-existent id in query", async () => {
    try {
      await axios.delete(`${url}?id=1`);
    } catch (err) {
      expect(err.response.status).toBe(404);
    }
  });
  test("Delete all entities", async () => {
    const response = await axios.delete(url);
    expect(response.status).toBe(204);
  });
});
