require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const db = require('./db/db')
const resgistration = require('./routes/Registration')
const product = require('./routes/Product')
const customers = require('./routes/Customer')
const cors = require('cors')


app.use(cors())
app.use(express.json())

app.use('/regis',resgistration)
app.use('/product',product)
app.use('/customer',customers)

app.get('/',(req,res)=>{
    res.json('hello from the server')
})



app.listen(port,()=>{
    console.log(`server unning at ${port}`)
})