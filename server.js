
import productRouter from './src/routes/products.routes.js';
import cartRouter from './src/routes/carts.routes.js';
import { __dirname } from './src/path.js';
import express from 'express';
import {engine} from 'express-handlebars';
import Contenedor from './src/contenedor.js';
const contenedor = new Contenedor("products.json");
const app = express();

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

app.set('views', './src/views');
app.set('view engine', 'hbs');

app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + './src/views/layouts',
    partialsDir: __dirname + './src/views/partials',
    pagesDir: __dirname + './src/views/pages'
}))

app.get('/api/products', async(req, res) => {
    const productos = await contenedor.getAll();
    res.render('pages/list', {productos})
})

app.post('/api/products', async(req,res) => {
    const {body} = req;
    await contenedor.save(body);
    res.redirect('/');
})

app.get('/api/products', (req,res) => {
    res.render('pages/form', {})
})


const PORT = 8080;
const server = app.listen(PORT, () => {
console.log(` >>>>> 🚀 Server started at http://localhost:${PORT}`)
})

server.on('error', (err) => console.log(err))