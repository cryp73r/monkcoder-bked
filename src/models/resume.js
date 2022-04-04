const mongoose=require('mongoose')
const validator=require('validator')

const resumeSchema=mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('invalid email')
            }
        }
    },
    photo: {
        type: Buffer
    },
    summary: {
        type: String,
        trim: true
    },
    contactNo: {
        type: Number,
        required: true
    },
    alternateNo: {
        type: Number
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    educations: [{
        education: {
            type: Map,
            required: true
        }
    }],
    skills: [{
        skill: {
            type: String,
            required: true
        }
    }],
    certificates: [{
        certificate: {
            type: Map
        }
    }],
    languages: [{
        language: {
            type: String,
            required: true
        }
    }],
    workExperiences: [{
        workExperience: {
            type: Map,
        }
    }],
    interests: [{
        interest: {
            type: String,
            required: true
        }
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Resume=mongoose.model('Resume', resumeSchema)

module.exports=Resume