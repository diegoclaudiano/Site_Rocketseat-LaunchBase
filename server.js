const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const courses = require('./data')

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false
})

server.get("/", function(req, res){
    const about = {
        img_animation: "/image/astronauts.svg",
        img_school: "/image/school.svg",
        description: "Criamos um ambiente dedicado para que programadores e <br>programadoras <strong>possam se conectar com as oportunidades, estudar <br>e crescer na carreira</strong> através de uma jornada de aprendizado <br>completa e contínua.",
        links: [
            {name:"Email", url:"mailto:oi@rocketseat.com.br"},
            {name:"Github", url: "https://github.com/Rocketseat"},
            {name:"Instagram", url: "https://www.instagram.com/rocketseat_oficial/?hl=pt-br"},
            {name:"Facebook", url: "https://pt-br.facebook.com/rocketseat/"},
            {name:"Telefone", url:"tel:+5557992078767"}
        ]
    }

    return res.render("about", {about: about})
})

server.get("/courses", function(req, res){
    return res.render("courses", {items: courses})
})

server.get("/courses/:id", function(req, res) {
    const id = req.params.id

    const course = courses.find(function(course){
        return course.id == id
    })

    if (!course) {
        return res.render("not-found")
    }
  
    return res.render("course", {item: course})
  })

server.use(function(req, res){
    res.status(404).render("not-found")
})

server.listen(5000, function(){
    console.log("server is running")
})