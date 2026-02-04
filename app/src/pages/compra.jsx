import { useState } from 'react';
import { crearCompra } from '../services/apiService';

export default function Compra({ producto, onVolver }) {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
  });

  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensaje({ tipo: '', texto: '' });

    try {
      const datosCompra = {
        ...formData,
        productoNombre: producto.name,
        precio: parseFloat(producto.price),
      };

      const resultado = await crearCompra(datosCompra);
      
      setMensaje({
        tipo: 'success',
        texto: resultado.message || 'Compra realizada exitosamente',
      });

      setFormData({
        nombre: '',
        apellido: '',
        telefono: '',
        email: '',
      });

      setTimeout(() => {
        onVolver();
      }, 3000);

    } catch (error) {
      setMensaje({
        tipo: 'error',
        texto: error.message || 'Error al procesar la compra',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 p-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onVolver}
          className="mb-6 text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2"
        >
          Volver a Productos
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Producto Seleccionado</h2>
            <div className="space-y-4">

              <div className="border-b pb-4">
                <p className="text-sm text-gray-600 mb-1">Producto</p>
                <p className="text-lg font-semibold text-gray-800">{producto.name}</p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Precio</p>
                <p className="text-3xl font-bold text-blue-600">
                  Bs. {parseFloat(producto.price).toFixed(2)}
                </p>
              </div>

            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Datos del Comprador</h2>

            {mensaje.texto && (
              <div className={`mb-4 p-4 rounded-lg border ${
                mensaje.tipo === 'success' 
                  ? 'bg-green-100 text-green-700 border-green-300' 
                  : 'bg-red-100 text-red-700 border-red-300'
              }`}>
                {mensaje.tipo === 'success' ? '✅' : '❌'} {mensaje.texto}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre *
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="Juan"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Apellido *
                </label>
                <input
                  type="text"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="Pérez"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="+34 600 000 000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="correo@ejemplo.com"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed text-lg py-3 mt-6"
              >
                {loading ? '⏳ Procesando...' : '✅ Confirmar Compra'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}