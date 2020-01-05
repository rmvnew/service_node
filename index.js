const express = require("express")
const app = express()
app.set('view engine','ejs')
app.use(express.static('public'))


app.get("/:name/:lang",function(req,res){

    var name = req.params.name
    var lang = req.params.lang
    var viewMsg = true

    var products = [
        {name:"Doritos", price:6.88},
        {name:"Coca", price:5.30},
        {name:"Arroz", price:3.33}
    ]

    res.render("index",{
        name: name,
        lang: lang,
        empresa: "Delta Corp",
        msg: viewMsg,
        products: products
    })
})

app.listen(8095,()=>{console.log("app rodando!")})