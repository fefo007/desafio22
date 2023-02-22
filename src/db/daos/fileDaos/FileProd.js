const fs = require('fs');
const logger = require('../../../utils/loggers/loggers');

let instance =  null

class FileProd{
    constructor(){
        this.rute=`${__dirname}/products.json`;
    }
    async getAll(){
        try {
            const object = fs.readFileSync(this.rute, 'utf-8')
            return JSON.parse(object)
        } catch (error) {
            logger.error(`error al cargar el archivo ${error}`)
        }
    }
    async getById(idProduct){
        try {
            const products = await this.getAll()
            const produc = products.find(product=>product.id===Number(idProduct))
            console.log(produc)
            return produc
        } catch (error) {
            logger.error(`error al cargar el archivo ${error}`)
        }
    }
    async save(product){
        const products = await this.getAll()
        let producId 
        if(products.length == 0){
            producId = 1
        }else{
            producId=products.length + 1
        }

        const newProduct={...product,id:producId}
        products.push(newProduct)
        try {
            await fs.writeFileSync(this.rute,JSON.stringify(products,null,2))
            return products
        } catch (error) {
            logger.error(`error al guardar el archivo ${error}`)
        }
    }
    async deleteById(idProduct) {
        const products = await this.getAll()
        const arrayFiltrado =products.filter(products => products.id !== idProduct);
        if(arrayFiltrado == -1){
            logger.error(`error no se encontro un producto con ese id:${idProduct}`)
        }
        try {
            await fs.writeFileSync(this.rute,JSON.stringify(arrayFiltrado,null,2))
        } catch (error) {
            logger.error(`error al borrar : ${error}`)
        }
        // return this.products=arrayFiltrado
    }
    async updateById(idProduc,newProduct){
        const products = await this.getAll()
        newProduct.id=idProduc
        const prodIndex = products.findIndex(prod => prod.id===idProduc)
        products.splice(prodIndex, 1, newProduct)
        try {
            await fs.writeFileSync(this.rute,JSON.stringify(products,null,2))
            return this.getById(idProduc)
        } catch (error) {
            logger.error(`error al actualizar: ${error}`)
        }
}
static getInstance(){
    if(!instance){
        instance =  new FileProd()
    }
    return instance
}
}

module.exports=FileProd