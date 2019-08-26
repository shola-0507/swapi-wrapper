exports.sendSuccessResponse = (res, message= "Success", data= [], status= 200) => {
    return res.status(status).json({
        success: true,
        message,
        data
    })
}

exports.sendFailureResponse = (res, message= "Something went wrong", data= [], status= 500) => {
    return res.status(status).json({
        success: false,
        message,
        data
    })
}