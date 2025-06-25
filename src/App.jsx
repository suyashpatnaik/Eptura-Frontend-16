import { useEffect } from 'react';
import './App.css';
import Main from './components/Main';

function App() {
  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL;
    fetch(`${API_URL}/api/ask`, {
      method: 'GET',
      credentials: 'include', // Only if backend expects cookies/auth
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => console.log('Backend health:', data))
      .catch(err => console.error('Backend health check failed:', err));
  }, []);

  return (
    <div>
      <h1>Eptura AI Assistant</h1>
      <Main />
    </div>
  );
}

export default App;