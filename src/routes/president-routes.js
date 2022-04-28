const Router = require("koa-router");
const {
  getOne,
  getAll,
  deleteOne,
  deleteAll,
  create,
  updateByParams,
  updateByQuery,
} = require("../controllers/president-controller");

const router = new Router();

router
  .post("/presidents", create)
  .get("/presidents", getAll)
  .get("/presidents/:id", getOne)
  .delete("/presidents/:id", deleteOne)
  .delete("/presidents", deleteAll)
  .put("/presidents/:id", updateByParams)
  .put("/presidents", updateByQuery);

module.exports = router;
