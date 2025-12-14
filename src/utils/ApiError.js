class ApiError extends Error{
    constructor(
        statusCode,
        massage = 'something went wrong',
        errors  = [],
        stack   = ''
    ){
        super(massage)
        this.statusCode = statusCode
        this.message    = massage
        this.errors     = errors
        this.data       = null
        this.success    = false

        if(stack){

        this.stack      = stack
        
        }else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
};

export{ApiError};