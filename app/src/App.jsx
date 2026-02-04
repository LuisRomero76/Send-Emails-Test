import { useState } from 'react';
import Productos from './pages/Productos';
import Compra from './pages/Compra';

function App() {
  const [pantalla, setPantalla] = useState('productos');
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const handleIrACompra = (producto) => {
    setProductoSeleccionado(producto);
    setPantalla('compra');
  };

  const handleVolver = () => {
    setProductoSeleccionado(null);
    setPantalla('productos');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {pantalla === 'productos' ? (
        <Productos onIrACompra={handleIrACompra} />
      ) : (
        <Compra producto={productoSeleccionado} onVolver={handleVolver} />
      )}
    </div>
  );
}

export default App;