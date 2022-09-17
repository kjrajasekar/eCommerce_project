const  expressJwt  = require('express-jwt');

exports.isAuthorized=[expressJwt({
    secret:process.env.TOKEN_KEY,
    userProperty:"auth",
    algorithms:['HS256'],
}), function(err, req, res, next){
    res.status(err.status).json(err);
}]