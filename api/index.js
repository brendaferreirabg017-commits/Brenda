import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import { createServer } from 'http';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Caminho correto das views e public
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// COLOCAR OS MODELS AQUI (colocar o caminho ../)

import Artista from '../models/Artista.js';
import Cliente from '../models/Cliente.js';
import Funcionario from '../models/Funcionario.js';
import Obra from '../models/Obra.js';

//FIM MODELS

// Servir arquivos estáticos
//app.use(express.static(join(__dirname, '../public')));
app.set('views', join(__dirname, '../views'));

// Rotas
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

// COLOCAR AS ROTAS AQUI

//rotas
app.get('/', (req, res) => {
    res.render("index")
})

app.get('/Artista/lst', async (req, res) => {
    const Artistas = await Artista.find()
    res.render("Artista/lst", { Artistas: Artistas })
})
app.post('/Artista/lst', async (req, res) => {
    const Artistas = await Artista.find({
nome: {
$regex: req.body.nome,
$options: "i"
}
})
    res.render("Artista/lst", { Artistas: Artistas })
})

app.get('/Artista/add', async (req, res) => {
    res.render("Artista/add")
})

app.post('/Artista/add/ok',upload.single("foto"), async(req, res) => {
    //se o formulario tem os memos nomes do schema(model) ele grava tudo direto
    //const artista=await Artista.create(req.body)
    await Artista.create({
        nome:req.body.nome,
        foto:req.file.buffer,
        salario:req.body.salario,
        areaexercida:req.body.areaexercida,
        iniciocontrato:req.body.iniciocontrato,
        fimcontrato:req.body.fimcontrato


    })
  res.render("Artista/addok");
})


app.get('/Artista/edt/:id', async (req, res) => {
const artista = await Artista.findById(req.params.id)
res.render("Artista/edt", {artista})
})

app.post('/Artista/edt/:id', async (req, res) => {
const artista = await Artista.findByIdAndUpdate(req.params.id, req.body)
res.render("Artista/edtok")
})


app.get('/Artista/del/:id', async (req, res) => {
const artista = await Artista.findByIdAndDelete(req.params.id)
res.redirect("/Artista/lst")
})



///////////////////////////////////////////////////////////////////



app.get('/Cliente/lst', async (req, res) => {
    const Clientes = await Cliente.find()
    res.render("Cliente/lst", {Clientes:Clientes})
})
app.post('/Cliente/lst', async (req, res) => {
    const Clientes = await Cliente.find({
nome: {
$regex: req.body.nome,
$options: "i"
}})
    res.render("Cliente/lst", {Clientes:Clientes})
})

app.get('/Cliente/add', async (req, res) => {
    res.render("Cliente/add")
})

app.post('/Cliente/add/ok', async (req, res) => {
    const cliente=await Cliente.create(req.body)
  res.render("Cliente/addok");
})

app.get('/Cliente/edt/:id', async (req, res) => {
const cliente = await Cliente.findById(req.params.id)
res.render("Cliente/edt", {cliente})
})

app.post('/Cliente/edt/:id', async (req, res) => {
const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body)
res.render("Cliente/edtok")
})


app.get('/Cliente/del/:id', async (req, res) => {
const cliente = await Cliente.findByIdAndDelete(req.params.id)
res.redirect("/Cliente/lst")
})




//////////////////////////////////////////////////////////////////////////////


app.get('/Funcionario/lst', async (req, res) => {
    const Funcionarios = await Funcionario.find()
    res.render("Funcionario/lst", { Funcionarios: Funcionarios })
})
app.post('/Funcionario/lst', async (req, res) => {
    const Funcionarios = await Funcionario.find({
nome: {
$regex: req.body.nome,
$options: "i"
}
})
    res.render("Funcionario/lst", { Funcionarios: Funcionarios })
})

app.get('/Funcionario/add', async (req, res) => {
    res.render("Funcionario/add")
})

app.post('/Funcionario/add/ok', async(req, res) => {
    const funcionario=await Funcionario.create(req.body)
  res.render("Funcionario/addok");
})


app.get('/Funcionario/edt/:id', async (req, res) => {
const funcionario = await Funcionario.findById(req.params.id)
res.render("Funcionario/edt", {funcionario})
})

app.post('/Funcionario/edt/:id', async (req, res) => {
const funcionario = await Funcionario.findByIdAndUpdate(req.params.id, req.body)
res.render("Funcionario/edtok")
})


app.get('/Funcionario/del/:id', async (req, res) => {
const funcionario = await Funcionario.findByIdAndDelete(req.params.id)
res.redirect("/Funcionario/lst")
})
app.get('/Obra/lst', async (req, res) => {
    const Obras = await Obra.find()
    res.render("Obra/lst", { Obras: Obras })
})
app.post('/Obra/lst',async (req, res) => {
    const Obras = await Obra.find
    ({
nome: {
$regex: req.body.nome,
$options: "i"
}
})
    res.render("Obra/lst", { Obras: Obras })
})

app.get('/Obra/add', async (req, res) => {
    res.render("Obra/add")
})

app.post('/Obra/add/ok',upload.single("foto") , async(req, res) => {
    //await Obra.create(req.body)
    await Obra.create({
        nome:req.body.nome,
        foto:req.file.buffer,
        nomeartista:req.body.nomeartista,
        materiais:req.body.materiais,
        dataobra:req.body.dataobra


    })

  res.render("Obra/addok");
})


app.get('/Obra/edt/:id', async (req, res) => {
const obra = await Obra.findById(req.params.id)
res.render("Obra/edt", {obra})
})

app.post('/Obra/edt/:id', async (req, res) => {
const obra = await Obra.findByIdAndUpdate(req.params.id, req.body)
res.render("Obra/edtok")
})
app.get('/Obra/del/:id', async (req, res) => {
const obra = await Obra.findByIdAndDelete(req.params.id)
res.redirect("/Obra/lst")
})


app.get('/site', async (req, res) => {
    
    const Obras= await Obra.find()
    const Artistas=await Artista.find()
    const Clientes=await Cliente.find()
    const Funcionarios=await Funcionario.find()
   
    res.render("site/index",{Obras,Artistas,Clientes,Funcionarios})
})

//FIM ROTAS
app.listen(3001)
// Exporta o handler compatível com Vercel
export default app;