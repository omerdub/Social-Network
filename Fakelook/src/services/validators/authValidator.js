import validator from 'validator';

export const registerValidator = (inputs) => {
    let errors = [];
    if (inputs.email.length > 0 && !validator.isEmail(inputs.email)) {
        errors.push("Email must be in email format");
    }
    if (inputs.password.length > 0 && !validator.isLength(inputs.password, { min: 8 })) {
        errors.push("Password must be at least 8 characters");
    }
    if (inputs.name.length > 0 && !validator.isLength(inputs.name, { min: 2 })) {
        errors.push("Name must be at least 2 characters");
    }
    return errors;
}

export const loginValidator = (inputs) => {
    let errors = [];
    if (inputs.email.length > 0 && !validator.isEmail(inputs.email)) {
        errors.push("Email must be in email format");
    }
    if (inputs.password.length > 0 && !validator.isLength(inputs.password, { min: 8 })) {
        errors.push("Password must be at least 8 characters");
    }
    return errors;
}