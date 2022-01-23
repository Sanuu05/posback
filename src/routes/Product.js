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
route.patch('/updateprocath', async (req, res) => {
    try {
        const { _id, category } = req.body
        if (_id) {
            const newcath = await Cath.findOne({ category: category })
            if (newcath) {
                res.status(400).json('category already exists')
            } else {
                const update = await Cath.findByIdAndUpdate(_id, { category: category })
                res.json("updated Succesfully")
            }
        }
    } catch (error) {

    }
})

route.post('/addproduct', async (req, res) => {
    try {
        const { name, code, altcode, stock, sellPrice, costPrice, category, tax, description, barcode, img } = req.body
        console.log(name?.length)
        if (name && code && altcode && stock && sellPrice && costPrice && category && tax && description && barcode && img && altcode) {
            const unicode = await Product.findOne({ code })
            if (unicode) {
                res.status(400).json('code already exists')

            } else {
                const unicodealt = await Product.findOne({ altcode })
                if (unicodealt) {
                    res.status(400).json('Alternate code already exists')
                } else {
                    const unibarcode = await Product.findOne({ barcode })
                    if (unibarcode) {
                        res.status(400).json(`barcode already exists , name: ${unibarcode?.name}`)
                    } else {
                        const sdata = new Product({
                            name, code, stock, sellPrice, costPrice, category, tax, description, barcode, img, altcode
                        })
                        const savedata = await sdata.save()
                        // console.log(savedata)
                        res.json("Product Added Sucessfully")

                    }
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
        const { _id, name, stock, code, altcode, costPrice, sellPrice, category, tax, description, barcode, img } = req.body
        console.log("update", req.body)
        try {
            const findx = await Product.findById(_id)
            // console.log(findx)
            if (findx.code === code && findx.altcode === altcode && findx.barcode === barcode) {
                // console.log('true')
                const update = await Product.findByIdAndUpdate(_id, {
                    name, stock, code, costPrice, sellPrice, category, tax, description, img, altcode, barcode
                }, {
                    new: true
                })
                console.log('up', update)
                res.json("Updated Sucesfully")

            }
            else {
                // console.log('false')
                const findcode = await Product.findOne({ code })

                const findbarcode = await Product.findOne({ barcode })
                const findcus = await Product.findById(_id)
                if (findcode?.id === findcus?.id) {

                    const findaltcode = await Product.findOne({ altcode })
                    const findcus = await Product.findById(_id)
                    if (findaltcode?.id === findcus?.id) {

                        const findaltcode = await Product.findOne({ barcode })
                        const findcus = await Product.findById(_id)
                        if (findaltcode?.id === findcus?.id) {


                        } else {

                            const findcode = await Product.findOne({ barcode })
                            if (findcode) {

                                res.status(400).json('Code aldeary exists 3')
                            }
                            else {

                                const update = await Product.findByIdAndUpdate(_id, {
                                    barcode
                                })
                                res.json("Updated Sucesfully")
                            }

                        }


                    } else {

                        const findcode = await Product.findOne({ altcode })
                        if (findcode) {

                            res.status(400).json('Alternate Code already exists ')
                        }
                        else {
                            const update = await Product.findByIdAndUpdate(_id, {
                                altcode
                            })

                            res.json("Updated Sucesfully")
                        }

                    }


                } else {

                    const findcode = await Product.findOne({ code })
                    if (findcode) {

                        res.status(400).json('Code already exists')
                    }
                    else {

                        const update = await Product.findByIdAndUpdate(_id, {
                            code
                        })
                        res.json("Updated Sucesfully ")
                    }

                }
                // console.log(findx)

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
route.get('/outofstock', async (req, res) => {
    const data = await Product.find()
    const fildata = data?.filter(p=>p.stock===0)
    res.json(fildata)
})


route.patch('/order', async (req, res) => {
    try {

        const { _id, name, code, costPrice, sellPrice, category, qyt } = req.body

        const date = new Date().toDateString()
        console.log("aaa", req.body?.customer)
        const monthm = new Date().getMonth()
        const year = new Date().getFullYear()
        
        
        const month = ['jan', 'feb', 'march', 'april','may','june','july','aug', 'sep' , 'oct', 'nov' , 'dec']
        // console.log("aaammm", month[Number(monthm)])
        const ndata = new Orderlist({
            order: req.body?.data,
            date: date,
            year:year,
            month:month[monthm],
            cus:req.body?.customer,
            sell:req.body?.sell,
            cost:req.body?.cost,
            income:req.body?.sell-req.body?.cost
        })
        const dsave = await ndata.save()
        // console.log('fff',dsave)
        req.body?.data?.map(async (v, i) => {
            const findx = await Product.findById(v._id)



            if (findx) {
                const update = await Product.findByIdAndUpdate(v._id, {
                    "stock": findx?.stock - Number(v.qyt)
                }, { new: true })

            }

        })
        res.json(dsave)

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
route.get('/graph', async(req,res)=>{
    try {
        const find = await Orderlist.find()
        const month = ['jan', 'feb', 'march', 'april','may','june','july','aug', 'sep' , 'oct', 'nov' , 'dec']
        const monthdata = []
        for (let i = 0; i <= month?.length-1; i++) {
        
            const findjan = await find?.filter(p => p.month === month[i] && p.year === "2022")
            const jancost = await findjan?.reduce((p, a) => a?.cost + p, 0)
            const jansell = await findjan?.reduce((p, a) => a?.sell + p, 0)
            // console.log(jancost)
            monthdata?.push({
                month:month[i],
                cost:jancost.toFixed(2),
                sell:jansell.toFixed(2),
                profit:(jansell - jancost).toFixed(2)
    
    
            })
    
        }
        res.json(monthdata)
    } catch (error) {
        
    }
})



module.exports = route