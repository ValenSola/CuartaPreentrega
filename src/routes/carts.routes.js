import { Router } from "express";
import { cartModel } from "../models/carts.models.js";
import { productModel } from "../models/products.models.js";

const cartRouter = Router()

cartRouter.get('/api/carts/:cid', async (req, res) => {
    const { id } = req.params

    try {
        const cart = await cartModel.findById(id)
        if (cart)
            res.status(200).send({ respuesta: 'OK', mensaje: cart })
        else
            res.status(404).send({ respuesta: 'Error en consultar Carrito', mensaje: 'Not Found' })
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en consulta carrito', mensaje: error })
    }
})

cartRouter.post('/api/carts', async (req, res) => {

    try {
        const cart = await cartModel.create({})
        res.status(200).send({ respuesta: 'OK', mensaje: cart })
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en crear Carrito', mensaje: error })
    }
})

cartRouter.post('/api/carts/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params
    const { quantity } = req.body

    try {
        const cart = await cartModel.findById(cid)
        if (cart) {
            const prod = await productModel.findById(pid) 

            if (prod) {
                const indice = cart.products.findIndex(item => item.id_prod == pid) 
                if (indice != -1) {
                    cart.products[indice].quantity = quantity 
                } else {
                    cart.products.push({ id_prod: pid, quantity: quantity }) 
                }
                const respuesta = await cartModel.findByIdAndUpdate(cid, cart) 
                res.status(200).send({ respuesta: 'OK', mensaje: respuesta })
            } else {
                res.status(404).send({ respuesta: 'Error en agregar producto Carrito', mensaje: 'Produt Not Found' })
            }
        } else {
            res.status(404).send({ respuesta: 'Error en agregar producto Carrito', mensaje: 'Cart Not Found' })
        }

    } catch (error) {
        console.log(error)
        res.status(400).send({ respuesta: 'Error en agregar producto Carrito', mensaje: error })
    }
})


cartRouter.delete('/api/carts/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params
        const cart = await cartModel.findById(cid)
        

        if(cart){
            if(cart.products.length != products.length){
                const products = cart.products.filter(item => item.id_prod.id != pid);
                cart.products = products
                await cart.save();
                res.status(200).send("El producto fue eliminado con éxito!!")
            }else{
                res.status(400).send("El productos no existe en la lista de carts")
            }
        }else{
            res.status(400).send("El Carrito ingresado no existe")
        }
        

        
    } catch (error) {
        console.log(error)
        res.status(400).send({ respuesta: 'Error en eliminar producto Carrito', mensaje: error })
    }
})

cartRouter.delete('/api/carts/:cid', async (req, res) => {
    try {
        const { cid, pid } = req.params
        const cart = await cartModel.findById(cid)
        if (cart){
            if (cart.products.length === 0){
                res.status(400).send("El Carrito no tiene lista de productos para eliminar")
            }else{
                cart.products = []
                await cart.save();
                res.status(200).send("Los productos del carrito fueron eliminados en su totalidad")
            }
        }else{
            res.status(400).send("El Carrito ingresado no existe en base de datos")
        }
       
        
        
    } catch (error) {
        console.log(error)
        res.status(400).send({ respuesta: 'Error en eliminar productos del Carrito', mensaje: error })
    }
})

cartRouter.put('/api/carts/:cid', async (req, res) => {
    const { cid} = req.params
    const { products } = req.body

    try {
        const cart = await cartModel.findById(cid)
        if (cart) {
            cart.products = products
            await cart.save();
            res.status(200).send({respuesta: "Ok", mensaje: "La lista de productos en el Carrito fue actualizada con éxito"})
        } else {
            res.status(404).send({ respuesta: 'Error en agregar producto Carrito', mensaje: 'Carrito no existe en base de datos' })
        }

    } catch (error) {
        console.log(error)
        res.status(400).send({ respuesta: 'Error en agregar producto Carrito', mensaje: error })
    }
})

cartRouter.put('/api/carts/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params
    const { cantidad } = req.body

    try {
        const cart = await cartModel.findById(cid)
        if (cart) {
            
             
            if (!Number.isInteger(cantidad) || cantidad < 0) {
                res.status(400).send("La cantidad ingresada debe ser un entero mayor a cero.");
            }
            const indice = cart.products.findIndex(item => item.id_prod.id === pid)
            if(indice != -1){
                cart.products[indice].quantity = cantidad
                await cart.save()
                res.status(200).send("Producto actualizado con éxito")
            }else{
                res.status(400).send({repuesta: "Error en actualizar producto", mensaje: "El id de producto no existe"})
                
            }
        } else {
            res.status(404).send({ respuesta: 'Error en agregar producto Carrito', mensaje: 'Carrito no existe en base de datos' })
        }

    } catch (error) {
        console.log(error)
        res.status(400).send({ respuesta: 'Error en actualizar producto del carrito', mensaje: error })
    }
})


export default cartRouter;