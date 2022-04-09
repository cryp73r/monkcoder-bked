const jwt=require('jsonwebtoken')
const Institute=require('../models/institute')

const auth=async (req, res, next)=>{
    try {
        const token=req.header('Authorization').replace('Bearer ', '')
        const decoded=jwt.verify(token, process.env.JWT_SECRET)
        const institute=await Institute.findOne({_id: decoded._id, 'tokens.token': token})
        if (!institute) {
            throw new Error()
        }
        req.token=token
        req.institute=institute
        next()

    } catch (error) {
        res.status(401).send({
            response: {
                code: 401,
                message: 'authentication required'
            }
        })
    }
}

module.exports=auth