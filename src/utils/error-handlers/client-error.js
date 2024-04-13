const AppError = require('./error-handles');
const {StatusCodes} = require('http-status-codes');

class  ClientError extends AppError {
    constructor () {
        let errorName = "Attribute Not Found";
        let errorMessage = "Invalid Email";
        let errorExplanation = "Please check email, as there is no record of email";

        super(
            errorName,
            errorMessage,
            errorExplanation,
            StatusCodes.NOT_FOUND, 
             
        )
    }
}

module.exports = ClientError