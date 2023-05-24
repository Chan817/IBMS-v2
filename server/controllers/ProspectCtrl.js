const Prospect = require("../models/prospect");

class ProspectController {
  static async fetchAllProspects(req, res) {
    try {
      const prospects = await Prospect.find();
      res.status(200).json(prospects);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  static async fetchProspectByID(req, res) {
    const id = req.params.id;
    try {
      const prospect = await Prospect.findById(id);
      res.status(200).json(prospect);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  static async createProspect(req, res) {
    const prospect = req.body;
    try {
      await Prospect.create(prospect);
      res.status(201).json({ message: "Prospect created successfully!" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static async updateProspect(req, res) {
    const id = req.params.id;
    const newProspect = req.body;
    try {
      console.log("Before update:", newProspect);
      const updatedProspect = await Prospect.findByIdAndUpdate(id, newProspect);
      console.log("After update:", updatedProspect);
      res.status(200).json({ message: "Prospect updated successfully!" });
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  static async deleteProspect(req, res) {
    const id = req.params.id;
    try {
      await Prospect.findByIdAndDelete(id);
      res.status(200).json({ message: "Prospect deleted successfully!" });
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
}

module.exports = ProspectController;
