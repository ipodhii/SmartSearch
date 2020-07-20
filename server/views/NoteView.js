class NoteView {
  constructor(note) {
    let {title, content, user, date, _id} = note;
    console.log('printNoteiddddddxxxx', _id);
    this.id = _id;
    this.title = title;
    this.content = content;
    this.user = user;
    this.date = date;
  }
}
module.exports = NoteView;
