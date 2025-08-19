const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  important: { type: Boolean, default: false },
  completed: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Todo', todoSchema);
