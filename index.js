const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const connection = require("./database/database")
const Pergunta = require("./database/Pergunta")
const Resposta = require("./database/Resposta")

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
 
    Pergunta.findAll({raw:true,order:[
        ['id','DESC'] //ASC = Crescente || DESC = Decrescente
    ]}).then(perguntas =>{
      
        res.render("index",{
            perguntas: perguntas,
         
        })
        
    })
    
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

app.get("/pergunta/:id",(req,res)=>{

    var id = req.params.id

    Pergunta.findOne({
        where: {id:id}
    }).then( pergunta => {
        if(pergunta != undefined){ // pergunta encontrada

            Resposta.findAll({
                where:{perguntaId: pergunta.id},
                order: [['id','DESC']]
            }).then(respostas =>{

                res.render("pergunta",{
                    pergunta: pergunta,
                    respostas: respostas
                    
                })

            })

            
        }else{ //pergunta nao encontrada
            res.redirect("/")
        }
    })

})

app.post("/responder",(req,res)=>{
    var corpo = req.body.corpo
    var perguntaId = req.body.pergunta

    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(()=>{
        res.redirect("/pergunta/"+perguntaId)
    })

})

app.listen(8095,()=>{console.log("app rodando! sim")})