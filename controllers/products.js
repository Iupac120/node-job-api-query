const products = require('../models/product')

const getAllProuctsStatic = async(req,res)=>{
    const product = await products.find({}).sort('name').select('name price').limit(10)
    res.status(201).json({nbhits:product.length,product}) 
}

const getAllProucts = async(req,res)=>{
    const {feature,company, name, sort} = req.query
    const queryObject = {}
    if(feature){
        queryObject.feature = feature === 'true'?true:false
    }
    if(company){
        queryObject.company = company
    }
    if(name){
        queryObject.name = {$regex: name, $options: 'i'}
    }
    let result = products.find(queryObject)
    if(sort){
        console.log(sort)
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
        //result = sortList
    }else{
        result = sortList.sort('createdAt')
    }
    if(field){
        console.log(sort)
        const fieldList = field.split(',').join(' ')
        result = result.sort(fieldList)
    }
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page-1)* limit
    result = result.skip(skip).limit(limit)
    const product = await result
     res.status(201).json({product, nbhits: product.length})  
}

module.exports = {
   getAllProuctsStatic,
   getAllProucts
}