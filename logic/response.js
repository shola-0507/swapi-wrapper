exports.sendSuccessResponse = (res, message= "Success", results= [], status= 200, meta={}, next= null, previous=null) => {
    return res.status(status).json({
        success: true,
        message,
        count: results.length,
        previous,
        next,
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