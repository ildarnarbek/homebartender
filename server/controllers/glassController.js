const { Glass } = require('../models/models');
const { model } = require("../db");

class GlassController {
  async  create(req,res) {
    const {name} = req.body
    const glass = await Glass.create({name})
    return res.json(glass)
  }

  async  getAll(req,res) {
    const glasses = await Glass.findAll()
    return res.json(glasses)
  }
}

module.exports = new GlassController()