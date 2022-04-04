const express=require('express')
const auth=require('../middleware/auth')
const Resume=require('../models/resume')

const router=express.Router()

router.post('/resume/create', auth, (req, res)=>{
    const resume=new Resume({
        ...req.body,
        createdBy: req.user._id
    })
    try {
        await resume.save()
        res.status(201).send({
            response: {
                code: 201,
                message: 'created'
            },
            resume
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

module.exports=router