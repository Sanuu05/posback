const express = require('express')
const route = express.Router()
const Customer = require('../models/customer')
const Cuscath = require('../models/cuscategory')

route.get('/', (req, res) => {
    res.json('hello from customers side')
})
route.post('/add', async (req, res) => {
    try {
        const { name, mobile, address1, address2, paymentterms, creditlimitdays, creditlimit, category, barcode, cusstatus, code, altcode } = req.body
        console.log(req.body)
        if (name && mobile && address1 && address2 && code && paymentterms && creditlimitdays && creditlimit && category && altcode && barcode && cusstatus) {
            console.log('helllo')
            const findcode = await Customer.findOne({code}) 
            if(findcode){
                res.status(400).json('Code already exists')
            }
            else{
                const findcodealt = await Customer.findOne({altcode}) 
                if(findcodealt){
                    res.status(400).json('Alternate Code already exists')
                }else{
                    const findcodealt = await Customer.findOne({altcode}) 
                if(findcodealt){
                    res.status(400).json('BarCode already exists')
                }else{
                    const addcus = new Customer({
                        name,
                        mobile, address1, address2, code, paymentterms, creditlimit, creditlimitdays, category, barcode, cusstatus, altcode
                    })
                    const save = await addcus.save()
                    res.json('Customer Added Succesfully')
                }

                }

            }
            

        } else {
            res.status(400).json("Fill all the fields")

        }
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
})

route.get('/all', async (req, res) => {
    try {
        const find = await Customer.find()
        res.json(find)
    } catch (error) {

    }
})
route.post('/addcath', async (req, res) => {
    const { category } = req.body
    // console.log(category)
    try {
        if (category) {
            const find = await Cuscath.findOne({ category })
            if (find) {
                res.status(400).json('Category already exists')

            } else {
                const ndata = new Cuscath({ category })
                const sdata = await ndata.save()
                res.json("Category Added succesfully")
            }

        }
    } catch (error) {
        console.log(error)

    }

})
route.get('/getcuscath', async (req, res) => {
    try {
        const all = await Cuscath.find()
        res.json(all)
    } catch (error) {

    }
})

route.delete('/delcuscath/:id', async (req, res) => {
    try {
        const { id } = req.params
        // console.log(id)
        console.log('klkk')
        if (id) {
            const del = await Cuscath.findByIdAndDelete(id)
            res.json('Deleted Sucesfully')
        }
    } catch (error) {

    }
})

route.patch('/updatecustomer', async (req, res) => {
    try {
        const { _id, name, mobile, address1, address2, paymentterms, creditlimitdays, creditlimit, category, barcode, cusstatus, code, altcode } = req.body
        // console.log("update", req.body)
        try {
            const findx = await Customer.findById(_id)
            // console.log(findx)
            if (findx.code === code && findx.altcode === altcode && findx.barcode === barcode) {
                // console.log('true')
                const update = await Customer.findByIdAndUpdate(_id, {
                    name, mobile, address1, address2, paymentterms, creditlimitdays, creditlimit, category, barcode, cusstatus, code
                })
                res.json("Updated Sucesfully")

            }
            else {
                // console.log('false')
                const findcode = await Customer.findOne({ code })
                
                const findbarcode = await Customer.findOne({ barcode })
                const findcus = await Customer.findById(_id)
                if (findcode?.id === findcus?.id) {
                    
                    const findaltcode = await Customer.findOne({ altcode })
                    const findcus = await Customer.findById(_id)
                    if (findaltcode?.id === findcus?.id) {
                        
                        const findaltcode = await Customer.findOne({ barcode })
                        const findcus = await Customer.findById(_id)
                        if (findaltcode?.id === findcus?.id) {
    
                            
                        } else {
                           
                            const findcode = await Customer.findOne({ barcode })
                            if(findcode){
                                
                                res.status(400).json('Code aldeary exists 3')
                            }
                            else{
                                
                                const update = await Customer.findByIdAndUpdate(_id, {
                                     barcode
                                })
                                res.json("Updated Sucesfully")
                            }
        
                        }


                    } else {
                       
                        const findcode = await Customer.findOne({ altcode })
                        if(findcode){
                           
                            res.status(400).json('Alternate Code already exists ')
                        }
                        else{
                            const update = await Customer.findByIdAndUpdate(_id, {
                                 altcode
                            })
                            
                            res.json("Updated Sucesfully")
                        }
    
                    }


                } else {
                    
                    const findcode = await Customer.findOne({ code })
                    if(findcode){
                        
                        res.status(400).json('Code already exists')
                    }
                    else{
                       
                        const update = await Customer.findByIdAndUpdate(_id, {
                             code
                        })
                        res.json("Updated Sucesfully ")
                    }

                }
                // console.log(findx)
             
            }
        } catch (error) {
            console.log(error)
        }

    } catch (error) {
        console.log(error)
    }
})
route.delete('/delcustomer/:id', async (req, res) => {
    try {
        const { id } = req.params
        // console.log(id)
        console.log('cll')
        if (id) {
            const del = await Customer.findByIdAndDelete(id)
            res.json('Deleted Sucesfully')
        }
    } catch (error) {

    }
})
route.patch('/updatecuscath', async (req, res) => {
    try {
        const { _id, category } = req.body
        if (_id) {
            const newcath = await Cuscath.findOne({ category: category })
            if (newcath) {
                res.status(400).json('category already exists')
            } else {
                const update = await Cuscath.findByIdAndUpdate(_id, { category: category })
                res.json("updated Succesfully")
            }
        }
    } catch (error) {

    }
})






module.exports = route