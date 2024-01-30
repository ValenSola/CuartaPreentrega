
const express = require('express');
const {engine} = require('express-handlebars');
const Contenedor = require('./src/contenedor')
const contenedor = new Contenedor("products.json");
const app = express();

var cartsRoutes = require('./src/routes/carts.routes.js');
var productsRoutes = require('./src/routes/products.routes.js');


app.use("/api/products", productsRoutes);
app.use("/api/carts", cartsRoutes);

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

app.set('views', './src/views');
app.set('view engine', 'hbs');

app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
    pagesDir: __dirname + '/views/pages'
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