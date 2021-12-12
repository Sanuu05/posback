const jwt = require('jsonwebtoken')


const auth = (req, res, next)=>{
    try {
        const token = req.header("x-auth-token")
      
        if(!token){
            return res.status(401).json({
                msg:"no token"
            })
        }
        const verify = jwt.verify(token,"sdksjkdsadnnasmdnandasdnmsandmnsamd")
        // console.log(verify)
        if(!verify){
            return res.status(400).json({
                msg:"verification failed" 
            })
        }
        // console.log(verify)
        req.user = verify.id;
        // console.log("sasa",verify)
        next()

    } catch (error) {
        return res.status(400).json({
            msg:error
        })
    }
}

module.exports = auth