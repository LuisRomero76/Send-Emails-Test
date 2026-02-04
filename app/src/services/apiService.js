import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

export const obtenerProductos = async () => {
    try {
        const response = await api.get('/products');
        return response.data;
    } catch (error) {
        throw new Error('Error al obtener los productos: ' + error.message);
    }
}

export const crearProducto = async (productoData) => {
    try {
        const response = await api.post('/products', productoData);
        return response.data;
    } catch (error) {
        throw new Error('Error al crear el producto: ' + error.message);
    }
}

export const crearCompra = async (compraData) => {
    try {
        const response = await api.post('/compra', compraData);
        return response.data;
    } catch (error) {
        throw new Error('Error al crear la compra: ' + error.message);
    }
}