const mongoose=require('mongoose')
const validator=require('validator')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')

const instituteSchema=mongoose.Schema({
    regId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
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
        required: true
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
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    logo: {
        type: String
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
})

instituteSchema.methods.generateAuthToken=async function() {
    const institute=this
    const token=jwt.sign({_id: institute._id.toString()}, process.env.JWT_SECRET)
    institute.tokens=institute.tokens.concat({token})
    await institute.save()
    return token
}

instituteSchema.methods.toJSON = function () {
    const institute = this
    const instituteObject = institute.toObject()
    delete instituteObject.password
    delete instituteObject.tokens
    return instituteObject
}

instituteSchema.statics.findByCredentials=async (email, password)=>{
    const institute=await Institute.findOne({email})
    if (!institute) {
        throw new Error('InstituteNotExist')
    }
    const isMatch=await bcrypt.compare(password, institute.password)
    if (!isMatch) {
        throw new Error('PasswordNotMatch')
    }
    return institute
}

instituteSchema.pre('save', async function (next) {
    const institute=this
    if (institute.isModified('password')) {
        const fname=institute.name.split(" ")[0]
        institute.password=await bcrypt.hash(institute.password, fname.length>8?fname.length:8)
    }
    next()
})

const Institute=mongoose.model('Institute', instituteSchema)

module.exports=Institute