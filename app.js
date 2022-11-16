require('dotenv').config()
require('express-async-errors')
const connectDB = require('./db/connect')

 
const express = require('express')
const app = express()

const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')
const router = require('./routes/products')

app.use(express.json())

const PORT = process.env.PORT || 3000

app.get('/',(req,res)=>{
    res.send('<h1>store API </><a href="api/v1/products">product route</>')
})
app.use('/api/v1/products',router)
app.use(notFoundMiddleware)
app.use(errorMiddleware)

const start = async()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        console.log('connected to DB')
        await app.listen(PORT,()=>{
            console.log(`server is listening to port ${PORT}`)
        })
    }catch(err){
        console.log(err)
    }
}

start()