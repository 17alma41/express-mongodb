//require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const app = express()
const port = 3000
//const USER = process.env.USER
//const PASSWORD = process.env.PASSWORD
//mongoose.connect(`mongodb://${USER}:${PASSWORD}@0.0.0.0:27017/teztz`, { useNewUrlParser: true, useUnifiedTopology: true })

app.use(express.json())

mongoose.connect('mongodb://localhost:27017/teztz', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexión a la base de datos establecida')
  })
  .catch(err => {
    console.error('Error al conectar a la base de datos', err)
  })

const usuarioSchema = new mongoose.Schema({
  name: String,
  password: String
})

const Usuario = mongoose.model('usuarios', usuarioSchema)

app.get("/", (req, res) => {
  res.status(200).send("Hola mundo")
})

app.get("/usuarios", async (req, res) => {
    try{
        const usuarios = await Usuario.find()
        res.status(200).json(usuarios)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
    
});

app.get("/usuarios/:name", async (req, res) => {
    try {
        const { name } = req.params
        const usuario = await Usuario.findOne({ name })
        res.status(200).json(usuario)   
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

app.post("/usuarios", async (req, res) => {
  const { name, password } = req.body
  try {
    const usuario = new Usuario({ name, password })
    await usuario.save() // Guarda el usuario en la base de datos
    res.status(201).json(usuario)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
});

app.put("/usuarios/:name", async (req, res) => {

    try {
        const { name } = req.params
        const { password } = req.body
        const usuario = await Usuario.findOneAndUpdate({ name }, { password }, { new: true })
        res.status(200).json(usuario)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

app.delete("/usuarios/:name", async (req, res) => {
    try {
        const { name } = req.params
        const usuario = await Usuario.findOneAndDelete({ name })
        res.status(204).json(usuario)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
 
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`)
})