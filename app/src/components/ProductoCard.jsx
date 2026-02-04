export default function ProductoCard({ producto, onComprar }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition h-full flex flex-col">
      <h3 className="text-lg font-bold text-gray-800 mb-2">{producto.name}</h3>
      
      <div className="flex justify-between items-center mt-4 pt-4 border-t-2">
        <span className="text-2xl font-bold text-blue-600">
          Bs. {parseFloat(producto.price).toFixed(2)}
        </span>
        <button
          onClick={() => onComprar(producto)}
          className="btn-primary"
        >
          Comprar
        </button>
      </div>
    </div>
  );
}