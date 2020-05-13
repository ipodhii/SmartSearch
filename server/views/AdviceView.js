class AdviceView {
  constructor(advice) {
    let {
      user,
      type,
      city,
      country,
      rating,
      placeName,
      description,
      email,
      phone,
    } = advice;
    this.user = user;
    this.type = type;
    this.city = city;
    this.country = country;
    this.rating = rating;
    this.placeName = placeName;
    this.description = description;
    this.email = email;
    this.phone = phone;
  }
}

module.exports = AdviceView;
