class NoteView {
  constructor(note) {
    let {title, content, user, date, id} = note;
    this.id = id;
    this.title = title;
    this.content = content;
    this.user = user;
    this.date = date;
  }
}
module.exports = NoteView;
