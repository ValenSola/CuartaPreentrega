import { Router } from "express";
import { productModel } from "../models/products.models.js";

const productRouter = Router()

productRouter.get('/api/products', async (req, res) => {
    
    const { limit } = req.query;
    const limitProd = limit ?? 10;

    
    const {page} = req.query; 
    const pageProd = page ?? 1; 

   
    const {query} = req.query
    const {atributeFilter} = req.query

   
    const filter = {};

   
    if (query && atributeFilter) {
        filter[atributeFilter] = query;
    }
    
    
    const sort = req.query.sort;
    let sortProd = null;
    
    
    const sortAsNumber = parseInt(sort);
    
    if (!isNaN(sortAsNumber) && (sortAsNumber === 1 || sortAsNumber === -1)) {
        sortProd = sortAsNumber;
    }
  
    

   
    
    try {
        
        const resultado = await productModel.paginate(filter, {limit: limitProd, sort: { price: sortProd}, page: pageProd})
        res.status(200).send({ respuesta: 'OK', mensaje: resultado })
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en consultar productos', mensaje: error })
    }
})

productRouter.get('/api/products/:pid', async (req, res) => {
    const { id } = req.params

    try {
        const prod = await productModel.findById(id)
        if (prod)
            res.status(200).send({ respuesta: 'OK', mensaje: prod })
        else
            res.status(404).send({ respuesta: 'Error en consultar Producto', mensaje: 'Not Found' })
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en consulta producto', mensaje: error })
    }
})

productRouter.post('/api/products', async (req, res) => {
    const { title, description, stock, code, price, category } = req.body
    try {
        const prod = await productModel.create({ title, description, stock, code, price, category })
        res.status(200).send({ respuesta: 'OK', mensaje: prod })
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en crear productos', mensaje: error })
    }
})

productRouter.put('/api/products/:pid', async (req, res) => {
    const { id } = req.params
    const { title, description, stock, status, code, price, category } = req.body

    try {
        const prod = await productModel.findByIdAndUpdate(id, { title, description, stock, status, code, price, category })
        if (prod)
            res.status(200).send({ respuesta: 'OK', mensaje: 'Producto actualizado' })
        else
            res.status(404).send({ respuesta: 'Error en actualizar Producto', mensaje: 'Not Found' })
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en actualizar producto', mensaje: error })
    }
})

productRouter.delete('/api/products/:pid', async (req, res) => {
    const { id } = req.params

    try {
        const prod = await productModel.findByIdAndDelete(id)
        if (prod)
            res.status(200).send({ respuesta: 'OK', mensaje: 'Producto eliminado' })
        else
            res.status(404).send({ respuesta: 'Error en eliminar Producto', mensaje: 'Not Found' })
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en eliminar producto', mensaje: error })
    }
})


export default productRouter;