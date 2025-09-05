import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';

// Componente para la página de inicio
const Home = () => {
  return <h1>Página de Inicio</h1>;
};

// Componente para la lista de citas
const Citas = () => {
  // Datos de ejemplo
  const citas = [
    { id: '1', nombre: 'Juan Pérez' },
    { id: '2', nombre: 'María García' },
    { id: '3', nombre: 'Pedro Ramírez' },
  ];
  return (
    <div>
      <h1>Citas Médicas</h1>
      <ul>
        {citas.map(cita => (
          <li key={cita.id}>
            <Link to={`/cita/${cita.id}`}>{cita.nombre}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Componente para los detalles de una cita
const CitaDetalle = () => {
  const { id } = useParams();
  return <h1>Detalles de la Cita con ID: {id}</h1>;
};

// Componente para la página de error 404
const NotFound = () => {
  return <h1>404 - Página no Encontrada</h1>;
};

// Componente principal de la aplicación
function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/citas">Ver Citas</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/citas" element={<Citas />} />
        <Route path="/cita/:id" element={<CitaDetalle />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
