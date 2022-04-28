const President = require("../models/president");

module.exports = {
  _create: async (data) => await President.create(data),
  _update: async (id, data) => await President.findOneAndReplace({_id:id}, data),
  _delete: async (id = undefined) =>
    id ? await President.findByIdAndDelete(id) : President.deleteMany({}),
  _read: async (id = undefined) =>
    id ? await President.findById(id) : await President.find({}),
};
