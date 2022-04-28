const { _create, _update, _read, _delete } = require("../db/queries");

const errors = {
  CastError: 404,
  ValidationError: 400,
};

const handleError = (err, ctx) => {
  errors[err.name] ? ctx.throw(errors[err.name]) : ctx.throw(500);
};

const getOne = async (ctx) => {
  try {
    const president = await _read(ctx.params.id);
    if (!president) {
      ctx.throw(404);
    }
    ctx.body = president;
    ctx.status = 200;
  } catch (err) {
    handleError(err, ctx);
  }
};

const getAll = async (ctx) => {
  try {
    const presidents = await _read(ctx.request.query.id);
    if (!presidents) {
      ctx.throw(404);
    }
    ctx.body = presidents;
    ctx.status = 200;
  } catch (err) {
    handleError(err, ctx);
  }
};

const deleteOne = async (ctx) => {
  try {
    await _delete(ctx.params.id);
    ctx.status = 204;
  } catch (err) {
    handleError(err, ctx);
  }
};

const deleteAll = async (ctx) => {
  try {
    await _delete(ctx.request.query.id);
    ctx.status = 204;
  } catch (err) {
    handleError(err, ctx);
  }
};

const create = async (ctx) => {
  try {
    await _create(ctx.request.body);
    ctx.status = 201;
  } catch (err) {
    handleError(err, ctx);
  }
};

const updateByParams = async (ctx) => {
  try {
    await _update(ctx.params.id, ctx.request.body);
    ctx.status = 204;
  } catch (err) {
    handleError(err, ctx);
  }
};

const updateByQuery = async (ctx) => {
  try {
    await _update(ctx.request.query.id, ctx.request.body);
    ctx.status = 204;
  } catch (err) {
    handleError(err, ctx);
  }
};

module.exports = {
  getOne,
  getAll,
  deleteOne,
  deleteAll,
  create,
  updateByParams,
  updateByQuery,
};
