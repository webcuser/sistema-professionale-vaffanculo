// controllers/templateController.js
const MessageTemplate = require('../models/MessageTemplate');

// Create a new template
exports.createTemplate = async (req, res) => {
  try {
    const { name, subject, body } = req.body;
    const template = new MessageTemplate({ name, subject, body });
    await template.save();
    res.status(201).json(template);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all templates
exports.getTemplates = async (req, res) => {
  try {
    const templates = await MessageTemplate.find();
    res.json(templates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single template by ID
exports.getTemplateById = async (req, res) => {
  try {
    const template = await MessageTemplate.findById(req.params.id);
    if (!template) return res.status(404).json({ error: 'Template not found' });
    res.json(template);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a template
exports.updateTemplate = async (req, res) => {
  try {
    const { name, subject, body } = req.body;
    const template = await MessageTemplate.findByIdAndUpdate(
      req.params.id,
      { name, subject, body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    if (!template) return res.status(404).json({ error: 'Template not found' });
    res.json(template);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a template
exports.deleteTemplate = async (req, res) => {
  try {
    const template = await MessageTemplate.findByIdAndDelete(req.params.id);
    if (!template) return res.status(404).json({ error: 'Template not found' });
    res.json({ message: 'Template deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
