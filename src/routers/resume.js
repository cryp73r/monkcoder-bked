const express=require('express')
const auth=require('../middleware/auth')
const Resume=require('../models/resume')

const router=express.Router()

router.post('/resume/create', auth, async (req, res)=>{
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
            },
            error
        })
    }
})

router.get('/resume', auth, async (req, res)=>{
    try {
        const resume=await Resume.findOne({createdBy: req.user._id})
        if (!resume) {
            return res.status(404).send({
                response: {
                    code: 404,
                    message: 'not found'
                }
            })
        }
        res.status(200).send({
            response: {
                code: 200,
                message: 'successful'
            },
            resume
        })
    } catch (error) {
        res.status(500).send({
            response: {
                code: 500,
                message: 'internal server error'
            }
        })
    }
})

router.patch('/resume', auth, async (req, res)=>{
    const updates=Object.keys(req.body)
    const allowedUpdates=['name', 'email', 'summary', 'contactNo', 'alternateNo', 'address', 'state', 'country', 'educations', 'skills', 'certificates', 'languages', 'workExperiences', 'interests']
    const isValidOperation=updates.every((update)=>allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({
            response: {
                code: 400,
                message: 'bad request'
            }
        })
    }
    try {
        const resume=await Resume.findOne({createdBy: req.user._id})
        updates.forEach((update)=>resume[update]=req.body[update])
        await resume.save()
        res.status(200).send({
            response: {
                code: 200,
                message: 'updated'
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

router.delete('/resume', auth, async (req, res)=>{
    try {
        const resume=await Resume.findOneAndDelete({createdBy: req.user._id})
        if (!resume) {
            return res.status(404).send({
                response: {
                    code: 404,
                    message: 'not found'
                }
            })
        }
        res.status(200).send({
            response: {
                code: 200,
                message: 'successful'
            }
        })
    } catch (error) {
        res.status(500).send({
            response: {
                code: 500,
                message: 'internal server error'
            }
        })
    }
})

module.exports=router