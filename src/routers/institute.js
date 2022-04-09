const express=require('express')
const auth=require('../middleware/instituteAuth')
const Institute=require('../models/institute')

const router = express.Router()

router.post('/institute/create', async (req, res)=>{
    const institute=new Institute(req.body)
    try {
        await institute.save()
        const token=institute.generateAuthToken()
        res.status(201).send({
            response: {
                code: 201,
                message: 'created'
            },
            institute,
            token
        })
    } catch (error) {
        res.status(400).send({
            response: {
                code: 400,
                message: 'bad request'
            }
        })
    }
})

router.post('/institute', async (req, res)=>{
    const email=req.body.email
    const password=req.body.password
    try {
        const institute=await Institute.findByCredentials(email, password)
        const token=await institute.generateAuthToken()
        res.status(200).send({
            response: {
                code: 200,
                message: 'logged-in'
            },
            institute,
            token
        })
    } catch (error) {
        if (error.message === 'InstituteNotExist') {
            return res.status(404).send({
                response: {
                    code: 404,
                    message: 'institute not registered'
                }
            })
        } else if (error.message === 'PasswordNotMatch') {
            return res.status(403).send({
                response: {
                    code: 403,
                    message: 'password didn\'t matched'
                }
            })
        }
        res.status(400).send({
            response: {
                codde: 400,
                message: 'bad request'
            }
        })
    }
})

router.get('/institute', auth, (req, res)=>{
    const institute=req.institute
    const token=req.token
    res.status(200).send({
        response: {
            code: 200,
            message: 'successful'
        },
        institute,
        token
    })
})

router.post('/institute/logout', auth, async (req, res)=>{
    const institute=req.institute
    try {
        institute.tokens=institute.tokens.filter((token)=>{
            return token.token!==req.token
        })
        await institute.save()
        res.status(200).send({
            response: {
                code: 200,
                message: 'logged-out'
            },
        })
    } catch (error) {
        res.status(500).send({
            response: 500,
            message: 'internal server error'
        })
    }
})

router.post('/institute/logoutall', auth, async (req, res)=>{
    const institute=req.institute
    try {
        institute.tokens=[]
        await institute.save()
        res.status(200).send({
            response: 200,
            message: 'logged-out-all'
        })
    } catch (error) {
        res.status(500).send({
            response: 500,
            message: 'internal server error'
        })
    }
})

router.patch('/institute', auth, async (req, res)=>{
    const updates=Object.keys(req.body)
    const allowedUpdates=['email', 'password', 'summary', 'contactNo', 'alternateNo', 'address', 'pincode', 'city', 'state', 'country']
    const isValidOperation=updates.every((update)=>allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({
            response: {
                code: 400,
                message: 'bad request'
            }
        })
    }
    const institute=req.institute
    try {
        updates.forEach((update)=>institute[update]=req.body[update])
        await institute.save()
        res.status(200).send({
            response: {
                code: 200,
                message: 'updated'
            },
            institute
        })
    } catch (error) {
        res.status(400).send({
            response: {
                code: 400,
                message: 'bad request'
            }
        })
    }
})

router.delete('/institute', auth, async (req, res)=>{
    const institute=req.institute
    try {
        await institute.remove()
        res.status(200).send({
            response: {
                code: 200,
                message: 'institute deleted'
            }
        })
    } catch (error) {
        res.status(500).send({
            response: 500,
            message: 'internal server error'
        })
    }
})

module.exports=router