const mongoose = require('mongoose');
const Joi = require('joi');
const {Schema} = mongoose;

const noteSchema = new Schema({
  title: {
    required: true,
    type: String,
  },
  content: {
    type: String,
  },
  user: {
    required: true,
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const Note = mongoose.model('notes', noteSchema);
function noteValidation(note) {
  const schema = {
    title: Joi.string().required(),
    content: Joi.string(),
    user: Joi.string().required(),
  };
  return Joi.validate(note, schema);
}
module.exports = {
  Note,
  noteValidation,
};
