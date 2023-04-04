import validator from 'validator';


const emailIsValid = (value) => validator.isEmail(value);

const passwordIsLength = (value) => validator.isLength(value, { min: 6 });

const textIsLength = (value) => validator.isLength(value, { min: 10 });

const nameIsLength = (value) => validator.isLength(value, { min: 5 });

const isEqual = (pass, rePass) => validator.equals(pass, rePass);

const isEmpty = (value) => !(validator.isEmpty(value));

const validationFunctions = {
    emailIsValid,
    passwordIsLength,
    nameIsLength,
    textIsLength,
    isEqual,
    isEmpty,
};


export default validationFunctions;