const express = require('express')
const cors = require('cors')
require('./db/mongoose')
const userRouter = require('./routers/user')
const resumeRouter = require('./routers/resume')
const instituteRouter = require('./routers/institute')

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(cors())
app.use(userRouter)
app.use(resumeRouter)
app.use(instituteRouter)

app.listen(port, ()=>{
    console.log(`Server running up on port ${port}`)
})