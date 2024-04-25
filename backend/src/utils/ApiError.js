export class ApiError extends Error {

    constructor(
        statusCode, 
        message = "Something went wrong!",
        errorStack = "",
        errors = []
    ) {
        // Call super constructor first
        super(message);

        // Initialize properties
        this.statusCode = statusCode;
        this.message = message;
        this.payload = null;
        this.success = false;
        this.errors = errors;
        
        if(errorStack) {
            this.errorStack = errorStack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }

    }

}