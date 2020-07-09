const {Note, noteValidation} = require('../model/Note');
const constants = require('../utils/constants');
const logger = require('../config/logger');
const NoteView = require('../views/NoteView');
const _ = require('lodash');

class NoteCtrl {
  async updateNote(req, res) {
    logger.log('info', 'put /api/notes');
    let {title, content, user} = req.body;
    const {error} = noteValidation(req.body);
    if (error) {
      logger.log('error', error.details[0].message);
      return res
        .status(constants.HTTP_STATUS.SOURCE_NOT_FOUND)
        .send(error.details[0].message);
    }
    let note = await Note.findOne({user});
    if (!note) {
      return res.sendStatus(constants.HTTP_STATUS.BAD_REQUEST);
    }
    note = await Note.update(
      {_id: note.id},
      {
        $set: {
          title,
          content,
          date: new Date(),
        },
      },
    );
    note = new NoteView(note);
    return res.sendStatus(constants.HTTP_STATUS.OK);
  }
  async createNote(req, res) {
    logger.log('info', 'post /api/notes');
    const {error} = noteValidation(req.body);
    if (error) {
      logger.log('error', error.details[0].message);
      return res.sendStatus(constants.HTTP_STATUS.SOURCE_NOT_FOUND);
    }
    let note = new Note(_.pick(req.body, ['user', 'title', 'content']));
    try {
      note = await note.save();
      note = new NoteView(note);
      return res.status(constants.HTTP_STATUS.OK).send(note);
    } catch (err) {
      return res.status(constants.HTTP_STATUS.ERROR).send(err);
    }
  }
  async getNotes(req, res) {
    logger.log('info', 'get /api/notes');
    console.log('printSetting', req.query.user);
    try {
      let notes = await Note.find({user: req.query.user});
      console.log('printSetting', notes);

      let notesView = [];

      if (!notes || !notes.length) {
        return res
          .status(constants.HTTP_STATUS.ERROR)
          .send('You dont have notes in this user.');
      }
      for (let note of notes) {
        notesView.push(new NoteView(note));
      }
      return res.status(constants.HTTP_STATUS.OK).send(notesView);
    } catch (err) {
      return res.status(constants.HTTP_STATUS.ERROR);
    }
  }
  async deleteNote(req, res) {
    logger.log('info', 'delete /api/notes');
    console.log('notesId', req.query.noteId);
    try {
      await Note.deleteOne({_id: req.query.noteId});
      return res.sendStatus(constants.HTTP_STATUS.OK);
    } catch (err) {
      return res.status(constants.HTTP_STATUS.ERROR);
    }
  }
}

module.exports = NoteCtrl;
