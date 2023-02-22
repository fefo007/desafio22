const FileProd = require('../db/daos/fileDaos/FileProd')
const apiProd = new FileProd()

const getProducts = async ctx=>{
    const products = apiProd.getAll()
    ctx.body={
        status:'succes',
        message:products
    }
}

const getProduct = async ctx=>{
    const product = apiProd.getById(ctx.params.id)
    if (product){
        ctx.response.status=200
        ctx.body={
            status:'succes',
            message:product
        }}
        else{
            ctx.response.status=404
            ctx.body={
                status:'error',
                message:`no se encontro el producto con el id : ${ctx.params.id}`
            }
        }
}

const postChargeProducts = async ctx=>{
    apiProd.save(ctx.request.body)
    ctx.response.status=200
    ctx.body={
        status:'succes',
        message:`se agrego el producto con nombre:${ctx.request.body.name}`
    }
}

const putChargeProducts = async ctx=>{
    let id = parseInt(ctx.params.id)
    let newProd = ctx.request.body
    await apiProd.updateById(id,newProd)
    ctx.response.status=200
    ctx.body={
        status:'succes',
        message:`Se actualizo correctamente..`
    }
}

const deleteChargeProducts = async ctx=>{

    let id = parseInt(ctx.params.id)
    let productDeleted =JSON.stringify(apiProd.deleteById(id))
    if (productDeleted){
        ctx.response.status = 200
        ctx.body = 
        {status:'succes',
        message:`Se elimino correctamente el producto con id : ${id}`}}
    else{
        ctx.response.status = 200
        ctx.body = 
        {status:'error',
        message:`error: Product not found `}}
    }


module.exports={getProducts,
    getProduct,
    postChargeProducts,
    putChargeProducts,
    deleteChargeProducts}