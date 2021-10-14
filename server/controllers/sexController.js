const { Sex } = require('../models/models');
const { model } = require("../db");

class SexController {
  async  create(req,res) {
    const {name} = req.body
    const sex = await Sex.create({name})
    return res.json(sex)
  }

  async  getAll(req,res) {
    const sex = await Sex.findAll()
    return res.json(sex)
  }
}

module.exports = new SexController()