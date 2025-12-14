const asyncHandler = (RequestHandler)=>{
    return (res,req,next)=>{
        Promise.resolve(RequestHandler(res,req,next)).catch((error)=>(error))
    }
};
export{asyncHandler};