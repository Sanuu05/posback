require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 8080
// process.env.PORT ||
const db = require('./db/db')
const resgistration = require('./routes/Registration')
const product = require('./routes/Product')
const customers = require('./routes/Customer')
const cors = require('cors')


app.use(cors())
app.use(express.json())

app.use('/regis', resgistration)
app.use('/product', product)
app.use('/customer', customers)

app.get('/', (req, res) => {
    res.json('hello from the server')
})
const data = [
    {
        name: 'one',
        sell: 920,
        cost: 1330,
        month: 'jan',
        year: '2020'
    },
    {
        name: 'one',
        sell: 1120,
        cost: 1230,
        month: 'jan',
        year: '2021'
    },
    {
        name: 'two',
        sell: 1220,
        cost: 1030,
        month: 'jan',
        year: '2021'
    },
    {
        name: 'three',
        sell: 1620,
        cost: 1430,
        month: 'jan',
        year: '2021'
    },
    {
        name: 'feb1',
        sell: 1460,
        cost: 1030,
        month: 'feb',
        year: '2021'
    },
    {
        name: 'feb2',
        sell: 960,
        cost: 1230,
        month: 'feb',
        year: '2021'
    },
    {
        name: 'feb3',
        sell: 1460,
        cost: 1030,
        month: 'feb',
        year: '2021'
    },

    {
        name: 'feb4',
        sell: 1460,
        cost: 1030,
        month: 'feb',
        year: '2021'
    }
]
const dataa = async () => {
    const findjan = await data?.filter(p => p.month === "jan" && p.year === "2021")
    // const jancost = await findjan?.reduce((p,a)=>a?.cost + p,0)
    // const jansell = await findjan?.reduce((p,a)=>a?.sell + p,0)
    // console.log(findjan)
    const year = new Date().getMonth()
    const yearm = new Date().getFullYear()
    console.log('v',yearm)
    const month = ['jan', 'feb', 'march', 'april']
    const monthdata = []
    for (let i = 0; i <= month?.length-1; i++) {
        
        const findjan = await data?.filter(p => p.month === month[i] && p.year === "2021")
        const jancost = await findjan?.reduce((p, a) => a?.cost + p, 0)
        const jansell = await findjan?.reduce((p, a) => a?.sell + p, 0)
        // console.log(jancost)
        monthdata?.push({
            month:month[i],
            cost:jancost,
            sell:jansell,
            income:jansell - jancost


        })

    }
    console.log(monthdata)
}
// dataa()



app.listen(port, () => {
    console.log(`server unning at ${port}`)
})