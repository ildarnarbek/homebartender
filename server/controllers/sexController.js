const { Sex } = require('../models/models');
const { model } = require("../db");

class SexController {
  async  create(req,res) {
    const {name} = req.body
    const sex = await Sex.create({name})
    return res.json(sex)
  }

  async  getAll(req,res) {
    res.json('alllllll')
  }
}

module.exports = new SexController()