//REQUERIR MODULOS
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

// INICIALIZAR
const app = express()
dotenv.config()

//CONFIGUARCION
app.set('port',process.env.PORT || 3000)
app.use(cors())

//MIDDLEWARE
app.use(express.json())

//RUTAS
app.get('/inde',(req,res)=>{
    res.send("Server On")
})


//EXPORTACION A LA INSTANCIA DE LA APPs
export default app