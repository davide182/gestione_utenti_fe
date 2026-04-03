import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import UtentiList from './pages/UtentiList';
import UtenteCreate from './pages/UtenteCreate';
import UtenteDetail from './pages/UtenteDetail';
import UtenteEdit from './pages/UtenteEdit'; // Importa la nuova pagina
import EmailTest from './pages/EmailTest';

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/utenti" element={<UtentiList />} />
          <Route path="/utenti/create" element={<UtenteCreate />} />
          <Route path="/utenti/:id" element={<UtenteDetail />} />
          <Route path="/utenti/:id/edit" element={<UtenteEdit />} /> {/* Nuova rotta */}
          <Route path="/email-test" element={<EmailTest />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;