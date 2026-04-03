import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { utentiApi } from '../api/utenti';
import type { UtenteCreate } from '../types/utente';
import UtenteForm from '../components/utenti/UtenteForm';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const UtenteCreatePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data: UtenteCreate) => {
    try {
      setIsLoading(true);
      await utentiApi.create(data);
      toast.success('Utente creato con successo!');
      navigate('/utenti');
    } catch (error: any) {
      const errorMessage = error.response?.data || 'Errore nella creazione dell\'utente';
      toast.error(errorMessage);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <UtenteForm onSubmit={handleSubmit} isLoading={isLoading} />
  );
};

export default UtenteCreatePage;