const jwt = require('jsonwebtoken')

function auth(req , res, next) {
    const token = req.header('auth-token');
    if (!token){
        return res.status(401).send('Access Denied');
    }

    try{
        req.user = jwt.verify(token, process.env.SECRET_TOKEN);
        next();
    }catch (e) {
        return res.status(400).send('Invalid Token');
    }
}

module.exports = auth
