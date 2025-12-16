import jwt from 'jsonwebtoken';

function authMiddleware(req, res, next){
    const token = req.headers['authorization'];

    if(!token){return res.status(401).json({message: "No token provided"});}

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err){return res.status(401).json({message: "Invalid token"});}

        req.userId = decoded.id;
        next();             //this means we are allowing the program to proceed on in the program (ie. to the endpoint)
    });
}

export default authMiddleware