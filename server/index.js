require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const PORT = process.env.PORT || 5000
const app = express()

const start = async()=>{
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server up ${PORT}`))
    }catch(e){
        console.log(e)
    }
}

start()

// npm i express pg pg-hstore sequelize cors dotenv
// npm i nodemon