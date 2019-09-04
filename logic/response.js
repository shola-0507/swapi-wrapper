exports.sendSuccessResponse = (res, message= "Success", results= [], status= 200, meta=null, success= true) => {
    return res.status(status).json({
        success,
        message,
        count: results.length,
        meta,
        results
    })
}

exports.sendFailureResponse = (res, message= "Something went wrong", error= [], status= 500) => {
    return res.status(status).json({
        success: false,
        message,
        error
    })
}