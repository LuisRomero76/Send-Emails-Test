import { useState, useEffect } from "react";
import ProductoCard from "../components/ProductoCard";
import FormularioCrearProducto from "../components/FormularioCrearProducto";
import { obtenerProductos, crearProducto } from "../services/apiService";

export default function Productos({ onIrACompra }) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      setLoading(true);
      const data = await obtenerProductos();
      setProductos(data);
      setError("");
    } catch (err) {
      setError("Error al cargar los productos: " + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleComprar = (producto) => {
    onIrACompra(producto);
  };

  const handleCrearProducto = async (nuevoProducto) => {
    try {
      await crearProducto(nuevoProducto);
      await cargarProductos();
    } catch (err) {
      console.error('Error al crear producto:', err);
      setError('Error al crear producto: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Nuestros Productos
          </h1>
          <button
            onClick={() => setMostrarModal(true)}
            className="btn-secondary"
          >
            + Crear Producto
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg border border-red-300">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Cargando productos...</p>
          </div>
        ) : productos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No hay productos disponibles
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productos.map((producto) => (
              <ProductoCard
                key={producto.id}
                producto={producto}
                onComprar={handleComprar}
              />
            ))}
          </div>
        )}

        {mostrarModal && (
          <FormularioCrearProducto
            onCerrar={() => setMostrarModal(false)}
            onCrear={handleCrearProducto}
          />
        )}
      </div>
    </div>
  );
}
