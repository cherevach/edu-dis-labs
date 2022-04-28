require("dotenv").config();
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const connectDB = require("./db/connection");
const router = require("./routes/president-routes");

const PORT = process.env.PORT || 8080;
const app = new Koa();

connectDB();

app.use(bodyParser());
app.use(router.routes());

module.exports = app.listen(PORT, console.log(`server starts at port ${PORT}`));

