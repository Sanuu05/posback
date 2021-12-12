const { json } = require('express')
const express = require('express')
const route = express.Router()
const Cath = require('../models/category')
const Product = require('../models/products')
const Orderlist = require('../models/order')

route.post('/addcath', async (req, res) => {
    const { category } = req.body
    // console.log(category)
    try {
        if (category) {
            const find = await Cath.findOne({ category })
            if (find) {
                res.status(400).json('Category already exists')

            } else {
                const ndata = new Cath({ category })
                const sdata = await ndata.save()
                res.json("Category Added sucessfully")
                
            }

        }
    } catch (error) {
        console.log(error)

    }

})
route.delete('/delprocath/:id', async (req, res) => {
    try {
        const { id } = req.params
        // console.log(id)
        console.log('klkk')
        if (id) {
            const del = await Cath.findByIdAndDelete(id)
            res.json('Deleted Sucesfully')
        }
    } catch (error) {

    }
})
route.get('/cath', async (req, res) => {
    const data = await Cath.find()
    // console.log(data)
    res.json(data)
})

route.post('/addproduct', async (req, res) => {
    try {
        const { name, code, stock, sellPrice, costPrice, category, tax, description, barcode,img } = req.body
        console.log(name?.length)
        if (name && code && stock && sellPrice && costPrice && category && tax && description && barcode && img) {
            const unicode = await Product.findOne({ code })
            if (unicode) {
                res.status(400).json('code already exists')
            } else {
                const unibarcode = await Product.findOne({ barcode })
                if (unibarcode) {
                    res.status(400).json(`barcode already exists , name: ${unibarcode?.name}`)
                } else {
                    const sdata = new Product({
                        name, code, stock, sellPrice, costPrice, category, tax, description, barcode,img
                    })
                    const savedata = await sdata.save()
                    // console.log(savedata)
                    res.json("Product Added Sucessfully")

                }

            }

        } else {
            res.status(400).json('Fill all the fields')
        }

    } catch (error) {
        console.log(error)

    }
})
route.patch('/updateproduct', async (req, res) => {
    try {
        const { _id, name, stock, code, costPrice, sellPrice, category, tax,description,barcode,img } = req.body
        console.log("update")
        try {
            const findx = await Product.findById(_id)
            // console.log(findx)
            if (findx.code === code) {
                // console.log('true')
                const update = await Product.findByIdAndUpdate(_id, {
                    name, stock, code, costPrice, sellPrice, category, tax,description,img
                },{
                    new:true
                })
                console.log('up',update)
                res.json("Updated Sucesfully")

            }
            else {
                // console.log('false')
                const findx = await Product.findOne({ code })
                // console.log(findx)
                if (findx) {
                    res.status(400).json('code already exists')
                } else {
                    const update = await Product.findByIdAndUpdate(_id, {
                        name, stock, code, costPrice, sellPrice, category, taxdescription,barcode ,description
                    })
                    res.json("Updated Sucesfully")

                }
            }
        } catch (error) {

        }

    } catch (error) {
        console.log(error)
    }
})
route.delete('/delproduct/:id', async (req, res) => {
    try {
        const { id } = req.params
        // console.log(id)
        if (id) {
            const del = await Product.findByIdAndDelete(id)
            res.json('Deleted Sucesfully')
        }
    } catch (error) {

    }
})
route.get('/product', async (req, res) => {
    const data = await Product.find()
    res.json(data)
})


route.patch('/order', async (req, res) => {
    try {

        const { _id, name, code, costPrice, sellPrice, category, qyt } = req.body

        const date = new Date().toDateString()
        console.log(req.body)
        const ndata = new Orderlist({
            order: req.body,
            date: date
        })
        const dsave = await ndata.save()
        // console.log('fff',dsave)
        req.body?.map(async (v, i) => {
            const findx = await Product.findById(v._id)



            if (findx) {
                const update = await Product.findByIdAndUpdate(v._id, {
                    "stock": findx?.stock - Number(v.qyt)
                }, { new: true })

            }

        })

    } catch (error) {
        console.log('error', error)
    }
})
route.get('/order', async (req, res) => {
    try {
        const findx = await Orderlist.find()
        res.json(findx)
    } catch (error) {

    }
})



module.exports = route