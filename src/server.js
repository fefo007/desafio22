const koa = require('koa')
const {koaBody} = require('koa-body')
// const {engine} = require('express-handlebars')
const logger = require('./utils/loggers/loggers')
// const path = require('path')
// USADO YARGS EN EL PUERTO
// const yargs = require('yargs/yargs')(process.argv.slice(2))
// USANDO MINIMIST EN EL PUERTO
const parseArgs = require('minimist')
let routerProd = require('./routes/productsRoutes')

const app = new koa

app.use(koaBody())
app.use(routerProd.routes())
// app.use(express.static('public'))
// app.use('/public',express.static(`${__dirname}/public`))

// app.engine("handlebars",engine())
// app.set("view engine","handlebars")
// app.set("views",path.join(__dirname,'views'))

// app.use('/',ctx=>{
//     ctx.redirect('/productos')
// })

// app.get('*',(req,res)=>{
    //     logger.warn('ruta inexistente')
    //     res.redirect('/user/login')
// })

const options ={
    alias: {
        'p':'PORT'
    },
    default: {
        'PORT': 8080
    }
}
const {PORT} = parseArgs(process.argv.slice(2), options)

const server = app.listen(PORT, () => { 
    logger.info(`Servidor Http con Websockets escuchando en el puerto ${server.address().port}`);
})
server.on('error', error => logger.error(`Error en servidor ${error}`))

// CLUSTER POR MODULO DE NODE
// const cluster = require('cluster')
// const os = require('os')

// const clusterMode = process.argv[3] == "CLUSTER"

// if(clusterMode && cluster.isMaster){
//     const cpus = os.cpus().length

//     for(let i=0; i<cpus;i++){
//         cluster.fork()
//     }
//     cluster.on('exit',worker=>{
//         console.log('worker',worker.process.pid,'died')
//         cluster.fork()
//     })
// }else{
//     const app=express()
//     const options ={
//         alias: {
//             'p':'PORT'
//         },
//         default: {
//             'PORT': 8080
//         }
//     }
// const {PORT} = parseArgs(process.argv.slice(2), options)

// const server = app.listen(PORT, () => { 
//     console.log(`Servidor Http con Websockets escuchando en el puerto ${server.address().port}`);
// })
// server.on('error', error => console.log(`Error en servidor ${error}`))

// USADO YARGS EN EL PUERTO
// const args = yargs.default({port: 8080}).alias({port: 'p'}).argv
// const PORT = args.port
// USANDO MINIMIST EN EL PUERTO
