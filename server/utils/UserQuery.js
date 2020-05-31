class UserQuery {
  constructor() {
    this.querys = {};
  }
  isNotNull(data) {
    return data !== undefined && data !== '';
  }
  setType(type) {
    if (this.isNotNull(type)) this.querys.type = type;
    return this;
  }
  setCity(city) {
    if (this.isNotNull(city)) this.querys.city = city;
    return this;
  }
  setCountry(country) {
    if (this.isNotNull(country)) this.querys.country = country;
    return this;
  }
  setRating(rating) {
    if (this.isNotNull(rating)) this.querys.rating = rating;
    return this;
  }
  build() {
    return this.querys;
  }
}
module.exports = UserQuery;
