import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
    
    reason = 'Error connecting to database';
    constructor(){
        super('Error connecting to DB');
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }
    statusCode = 500;
    serializeError(){
        return [{message: this.reason}]
    }
}