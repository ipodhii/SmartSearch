const UserView = require('./UserView');

class AdviceView {
  constructor(advice) {
    let {
      user,
      type,
      city,
      country,
      rating,
      placeName,
      placeId,
      description,
      email,
      phone,
      date,
    } = advice;
    if (typeof user === 'object') {
      this.user = new UserView(user);
    } else {
      this.user = user;
    }
    this.type = type;
    this.city = city;
    this.country = country;
    this.rating = rating;
    this.placeName = placeName;
    this.placeId = placeId;
    this.description = description;
    this.email = email;
    this.phone = phone;
    this.date = date;
  }
}

module.exports = AdviceView;
