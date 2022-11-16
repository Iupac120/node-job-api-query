require('dotenv').config()

const connectDB = require('./db/connect')
const product = require('./models/product')

const jsonProduct = require('./products.json')


const start = async()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        await product.deleteMany()
        await product.create(jsonProduct)
        console.log('success')
        process.exit(0)
    }catch(err){
        console.log(err)
        process.exit(1)
    }
}

start()