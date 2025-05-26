//REQUERIR MODULOS
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import routerVeterinario from './routers/veterinario.router.js'

// INICIALIZAR
const app = express()
dotenv.config()

//CONFIGUARCION
app.set('port',process.env.PORT || 3000)
app.use(cors())

//MIDDLEWARE
app.use(express.json())

//RUTAS
app.get('/',(req,res)=>{
    res.send("Server On")
})

//RUTAS para veterinaria
app.use('/api',routerVeterinario)


//EXPORTACION A LA INSTANCIA DE LA APPs
export default app