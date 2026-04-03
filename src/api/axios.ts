import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Aggiungi timeout
});

// Interceptor per gestire errori globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error Details:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      config: error.config
    });
    
    // Evita che l'errore venga mostrato come pagina bianca
    if (error.response?.status === 404) {
      console.error('Endpoint non trovato:', error.config?.url);
    }
    
    return Promise.reject(error);
  }
);

export default api;