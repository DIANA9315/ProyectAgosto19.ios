import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, Link } from 'react-router-dom';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("No se pudo recuperar el usuario de localStorage:", error);
      localStorage.removeItem('user');
    }
  }, []);

  const login = (username) => {
    const userData = { username };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <style>
        {`
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background-color: #f0f2f5;
            color: #333;
            margin: 0;
            padding: 0;
          }

          .app-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            padding: 2rem;
          }

          .app-header {
            width: 100%;
            max-width: 500px;
            margin-bottom: 2rem;
            padding: 1rem 2rem;
            background-color: #fff;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .logo {
            font-size: 2rem;
            font-weight: bold;
            color: #1da1f2;
          }

          nav a {
            color: #1da1f2;
            font-weight: 600;
            margin-left: 1.5rem;
            text-decoration: none;
            transition: color 0.2s;
          }

          nav a:hover {
            color: #0d8ddb;
          }

          .app-main {
            width: 100%;
            max-width: 500px;
            background-color: #fff;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }

          h1 {
            font-size: 2rem;
            font-weight: bold;
            color: #333;
            text-align: center;
            margin-top: 0;
            margin-bottom: 1.5rem;
          }

          .form-container, .home-container, .profile-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
          }

          .login-form {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          input[type="text"] {
            width: 100%;
            padding: 12px;
            margin-bottom: 1rem;
            border-radius: 8px;
            border: 1px solid #ccc;
            font-size: 1rem;
            box-sizing: border-box;
          }

          button {
            width: 100%;
            padding: 12px;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: bold;
            cursor: pointer;
            transition: background-color 0.2s;
          }

          .login-btn {
            background-color: #1da1f2;
            color: #fff;
          }

          .login-btn:hover {
            background-color: #0d8ddb;
          }

          .logout-btn {
            background-color: #ff4d4d;
            color: #fff;
          }

          .logout-btn:hover {
            background-color: #e63939;
          }

          .link-text {
            color: #1da1f2;
            font-weight: 600;
            text-decoration: none;
            transition: color 0.2s;
          }

          .link-text:hover {
            text-decoration: underline;
          }

          .welcome-text {
            font-size: 1.25rem;
            margin-bottom: 1.5rem;
          }

          .username-highlight {
            font-weight: bold;
            color: #1da1f2;
          }

          .profile-info {
            font-size: 1.25rem;
          }
        `}
      </style>
      <div className="app-container">
        <header className="app-header">
          <div className="logo">Twitter</div>
          <nav>
            <Link to="/">Inicio</Link>
            {user && (
              <Link to="/profile">Perfil</Link>
            )}
          </nav>
        </header>

        <main className="app-main">
          <Routes>
            <Route path="/login" element={<Login onLogin={login} />} />
            <Route path="/" element={<Home user={user} logout={logout} />} />
            <Route
              path="/profile"
              element={user ? <Profile user={user} /> : <Navigate to="/login" replace />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username);
      navigate('/', { replace: true });
    }
  };

  return (
    <div className="form-container">
      <h1>Iniciar sesión</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <button type="submit" className="login-btn">
          Entrar
        </button>
      </form>
    </div>
  );
};

const Home = ({ user, logout }) => {
  return (
    <div className="home-container">
      <h1>¡Bienvenido a Twitter!</h1>
      {user ? (
        <div className="home-content">
          <p className="welcome-text">Hola, <span className="username-highlight">{user.username}</span>!</p>
          <button onClick={logout} className="logout-btn">
            Cerrar sesión
          </button>
        </div>
      ) : (
        <p className="welcome-text">Por favor, <Link to="/login" className="link-text">inicia sesión</Link> para ver tu perfil.</p>
      )}
    </div>
  );
};

const Profile = ({ user }) => {
  return (
    <div className="profile-container">
      <h1>Perfil de Usuario</h1>
      {user && (
        <p>Nombre de usuario: <span className="username-highlight">{user.username}</span></p>
      )}
    </div>
  );
};

export default App;
