const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const connection = require("./database/database")
const Pergunta = require("./database/Pergunta")

//database

connection
    .authenticate()
    .then(()=>{
        console.log("Conexao estabelecida")
    })
    .catch((msgerro)=>{
        console.log(msgerro)
    })

//definindo o ejs para ser view do express
app.set('view engine','ejs')
app.use(express.static('public'))

//body parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//rotas
app.get("/",(req,res)=>{
 

    res.render("index")
})

app.get("/perguntar",(req,res)=>{
    res.render("perguntar")
})

app.post("/salvarpergunta",(req,res)=>{

    var titulo = req.body.titulo
    var descricao = req.body.descricao

   //res.send("Formulario recebido!! titulo: "+titulo+" descricao: "+descricao)

   Pergunta.create({
       titulo: titulo,
       descricao: descricao
   }).then(()=>{
       res.redirect("/")
   })

})

app.listen(8095,()=>{console.log("app rodando! sim")})