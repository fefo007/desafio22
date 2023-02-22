const Router = require('koa-router')
const routerProd = new Router({
    prefix:'/productos'
})
const {getProducts,
    getProduct,
    postChargeProducts,
    putChargeProducts,
    deleteChargeProducts}=require('../controllers/controllerProducts')

routerProd.get('/',getProducts)

routerProd.get('/cargarProductos/:id',getProduct)

routerProd.post('/cargarProductos',postChargeProducts)

routerProd.put('/cargarProductos/:id',putChargeProducts)

routerProd.delete('/cargarProductos/:id',deleteChargeProducts)

module.exports=routerProd