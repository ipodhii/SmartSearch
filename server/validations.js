//const Joi = require('@hapi/joi');

const WRONG_NAME = "WRONG_NAME"
const WRONG_EMAIL = "WRONG_EMAIL"
const WRONG_PASSWORD = "WRONG_PASSWORD"


//Register validation
const registerValidation = (data) => {
    let { phone, email, password,confirmPassword,userContactsMember } = data;
    let error=false;
    if (!phone|| !confirmPassword || !email|| !password  || !userContactsMember || email.length < 6|| password.length < 6|| confirmPassword.length < 6||phone.length < 10|| userContactsMember===""
    || password!==confirmPassword)
        error=true;
    return error

}

//Register validation
const loginValidation = (data) => {
    let { phone, email } = data;
    let error=false;
    if (!phone || !email || phone.length < 10 || email.length < 6)
        error= true
    return error
}

//Register validation
const adviceValidation = (data) => {
    let { placeName, description, rating,phone,email} = data
    let error=false;
    
    if (!placeName||!description||!rating||!phone||!email ||  phone.length < 10 || email.length < 6|| rating===""|| name==="")
        error= true;
    return error
}

module.exports = {
    registerValidation,
    loginValidation,
    adviceValidation
}