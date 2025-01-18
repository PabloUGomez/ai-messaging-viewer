
const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 text-gray-800">
      <h1 className="text-9xl font-extrabold text-blue-600">404</h1>
      <h2 className="mt-4 text-2xl font-semibold">Página no encontrada</h2>
      <p className="mt-2 text-gray-600 text-center max-w-md">
        Lo sentimos, no pudimos encontrar la página que estás buscando. 
        Verifica la URL o regresa al inicio.
      </p>
      <button
        onClick={() => (window.location.href = '/')}
        className="mt-6 px-6 py-3 bg-blue-600 text-white font-medium text-lg rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
      >
        Regresar al Inicio
      </button>
    </div>
  );
};

export default Error;