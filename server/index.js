require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router =require('./routes/index')
const cookieParser = require("cookie-parser")
const path = require('path')

const PORT = process.env.PORT || 5000
const app = express()


app.use(cors({
    origin: ["http://localhost:3000"],
	credentials:true,
}))
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use(cookieParser());
app.use('/api', router)


const start = async()=>{
    try{
        await sequelize.authenticate()
        await sequelize.sync({ alter: true })
        app.listen(PORT, () => console.log(`Server up ${PORT}`))
    }catch(e){
        console.log(e)
    }
}

start()