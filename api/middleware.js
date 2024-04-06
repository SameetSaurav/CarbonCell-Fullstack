import jwt from "jsonwebtoken"

export const userAuth = (req, res, next) => {
    const JWTsecret = process.env.JWT_SECRET
    const token = req.cookies?.token
    if(token){
        jwt.verify(token, JWTsecret, {}, (err, userData) => {
            if (err) {
                res.status(401).json({ error: 'Invalid token' })
            } else {
                req.userData = userData
                next()
            }
        })
    } else{
        res.status(401).json("no token")
    }
}
