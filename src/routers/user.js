const express=require('express')
const User=require('../models/user')
const auth=require('../middleware/auth')

const router = express.Router()

router.get('/', (req, res)=>{
    res.redirect('https://github.com/cryp73r/monkcoder-bked')
})

router.post('/user/create', async (req, res)=>{
    const user=new User(req.body)
    try {
        await user.save()
        const token=await user.generateAuthToken()
        res.status(201).send({
            response: {
                code: 201,
                message: 'created'
            },
            user,
            token
        })
    } catch (error) {
        if (error.name === 'MongoServerError' && error.code === 11000) {
            return res.status(400).send({
                response: {
                    code: 400,
                    message: 'email already exists'
                }
            })
        }
        res.status(400).send({
            response: {
                code: 400,
                message: 'bad request'
            }
        })
    }
})

router.post('/user', async (req, res)=>{
    const email=req.body.email
    const password=req.body.password
    try {
        const user=await User.findByCredentials(email, password)
        const token=await user.generateAuthToken()
        res.status(200).send({
            response: {
                code: 200,
                message: 'logged-in'
            },
            user,
            token
        })
    } catch (error) {
        if (error.message === 'UserNotExist') {
            return res.status(404).send({
                response: {
                    code: 404,
                    message: 'user not registered'
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

router.get('/user', auth, (req, res)=>{
    const user=req.user
    const token=req.token
    res.status(200).send({
        response: {
            code: 200,
            message: 'successful'
        },
        user,
        token
    })
})

router.post('/user/logout', auth, async (req, res)=>{
    const user=req.user
    try {
        user.tokens=user.tokens.filter((token)=>{
            return token.token!==req.token
        })
        await user.save()
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

router.post('/user/logoutall', auth, async (req, res)=>{
    const user=req.user
    try {
        user.tokens=[]
        await user.save()
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

router.patch('/user', auth, async (req, res)=>{
    const updates=Object.keys(req.body)
    const allowedUpdates=['name', 'email', 'password']
    const isValidOperation=updates.every((update)=>allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({
            response: {
                code: 400,
                message: 'bad request'
            }
        })
    }
    const user=req.user
    try {
        updates.forEach((update)=>user[update]=req.body[update])
        await user.save()
        res.status(200).send({
            response: {
                code: 200,
                message: 'updated'
            },
            user
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

router.delete('/user', auth, async (req, res)=>{
    const user=req.user
    try {
        await user.remove()
        res.status(200).send({
            response: {
                code: 200,
                message: 'user deleted'
            }
        })
    } catch (error) {
        res.status(500).send({
            response: 500,
            message: 'internal server error'
        })
    }
})

module.exports = router