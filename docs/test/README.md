# Тестування працездатності системи

На етапі розробки сервісу було використано [Postman](https://www.postman.com) для тестування обробки запитів. Для unit-тестування було обрано тестовий фреймворк [jest](https://www.npmjs.com/package/jest) та бібліотеку [axios](https://www.npmjs.com/package/axios) для зручної роботи з HTTP-запитами.

Встановлення необхідних залежностей:

```bash
npm i -D jest 
npm i -D axios 
```

В файлі ```package.json``` додамо скрипт для тестування:

```json 
{
  "scripts": {
    "test": "jest"
  }
}
```

Тепер за допомогою команди

```bash
npm test
```

```jest``` знайде всі файли, що в назві містять ```.test``` та запустить тестування. 

Створимо у каталозі для тестів ```./test``` файл ```server.test.js```:

```js
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

```
Імпортуємо бібліотеку ```axios```. Записуємо URL серверу у константу.

За допомогою ```describe``` визначаємо 4 набори тестів:
- для перевірки створення даних (```Create entities```);
- для перевірки отримання даних (```Get entities```);
- для перевірки оновлення даних (```Update entities```);
- для перевірки видалення даних (```Delete entities```);

Набір тестів ```Create entities``` складається тестів :
- для вдалого створення даних;
- для створення даних з помилкою;

Набір тестів ```Get entities``` складається з тестів: 
- для отримання всіх об'єктів;
- для отримання одного об'єкта за допомогою ```ID``` який передається в ```params``` або ```query```; 
- для спроби отримання одного об'єкта з неіснуючим ```ID``` який передається у ```params``` або ```query```;

Набір тестів ```Update entities``` складається з тестів: 
- для оновлення об'єкта за допомогою ```ID``` який передається в ```params``` або ```query``` та нових даних які передаються у ```body```;
- для спроби оновлення об'єкта за допомогою ```ID``` який передається в ```params``` або ```query``` та нових даних які передаються у ```body``` з помилками;

Набір тестів ```Delete entities``` складається з тестів: 
- для видалення об'єкта за допомогою ```ID``` який передається в ```params``` або ```query```;
- для видалення всіх об'єктів;
- для спроби видалення об'єкта з неіснуючим ```ID``` який передається в ```params``` або ```query```;

Результати тестування:

```bash
 PASS  test/server.test.js
  Сreate entities
    ✓ Create one entity (82 ms)
    ✓ Create one more entity (48 ms)
    ✓ Create one more entity (44 ms)
    ✓ Create entity with invalid body (8 ms)
  Get entities
    ✓ Get all entities (59 ms)
    ✓ Get entity by id in params (75 ms)
    ✓ Get entity by id in query (85 ms)
    ✓ Get entity by non-existent id in params (7 ms)
    ✓ Get entity by non-existent id in query (9 ms)
  Update entities
    ✓ Update entity by id in params (79 ms)
    ✓ Update entity by id in query (76 ms)
    ✓ Update entity with non-existent id (8 ms)
    ✓ Update entity with invalid body (50 ms)
    ✓ Update entity by id in params (82 ms)
    ✓ Update entity by id in query (80 ms)
    ✓ Update entity with non-existent id (7 ms)
  Delete entities
    ✓ Delete entity by id in params (76 ms)
    ✓ Delete entity by id in query (81 ms)
    ✓ Delete entity by non-existent id in params (6 ms)
    ✓ Delete entity by non-existent id in query (4 ms)
    ✓ Delete all entities (40 ms)

Test Suites: 1 passed, 1 total
Tests:       21 passed, 21 total
Snapshots:   0 total
Time:        1.637 s, estimated 3 s
Ran all test suites.
```

