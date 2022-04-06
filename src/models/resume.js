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
        type: String
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
    pincode: {
        type: Number,
        required: true,
        
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    educations: {
        type: Array,
        of: Map
    },
    skills: {
        type: Array,
        of: String
    },
    certificates: {
        type: Array,
        of: Map
    },
    languages: {
        type: Array,
        of: String
    },
    workExperiences: {
        type: Array,
        of: Map
    },
    achievements: {
        type: Array,
        of: Map
    },
    interests: {
        type: Array,
        of: String
    },
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