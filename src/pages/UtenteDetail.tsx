import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { utentiApi } from '../api/utenti';
import type { Utente } from '../types/utente';
import UtenteCard from '../components/utenti/UtenteCard';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const UtenteDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [utente, setUtente] = useState<Utente | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUtente = async () => {
      if (!id) return;
      try {
        setIsLoading(true);
        const data = await utentiApi.getById(parseInt(id));
        setUtente(data);
      } catch (error) {
        toast.error('Utente non trovato');
        navigate('/utenti');
      } finally {
        setIsLoading(false);
      }
    };
    loadUtente();
  }, [id, navigate]);

  const handleDelete = async (id: number) => {
    if (!utente) return;

    const password = prompt('Inserisci la password per confermare l\'eliminazione:');
    if (!password) return;

    try {
      await utentiApi.delete(id, { ...utente, password });
      toast.success('Utente eliminato con successo');
      navigate('/utenti');
    } catch (error) {
      toast.error('Errore nell\'eliminazione dell\'utente');
      console.error(error);
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Caricamento...</div>;
  }

  if (!utente) {
    return <div className="text-center py-8">Utente non trovato</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Dettaglio Utente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-w-md mx-auto">
            <UtenteCard
              utente={utente}
              onDelete={handleDelete}
              onEdit={(id) => navigate(`/utenti/${id}/edit`)}
            />
            <div className="mt-4 flex justify-center">
              <Button variant="outline" onClick={() => navigate('/utenti')}>
                Torna alla lista
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UtenteDetailPage;