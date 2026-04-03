import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { utentiApi } from '../api/utenti';
import AuthDialog from '../components/AuthDialog';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const UtenteEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(true);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [savedCredentials, setSavedCredentials] = useState<{ username: string; email: string; password: string } | null>(null);
  
  const [nuovoTelefono, setNuovoTelefono] = useState('');
  const [nuovaDataNascita, setNuovaDataNascita] = useState('');

  const handleAuthConfirm = async (username: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      
      await utentiApi.update(parseInt(id!), {
        username: username,
        email: email,
        password: password,
        telefono: 'temp',
        dataNascita: '1990-01-01',
      });
      
      setSavedCredentials({ username, email, password });
      setIsAuthenticated(true);
      setAuthDialogOpen(false);
      toast.success('Identità verificata! Ora puoi modificare i dati.');
      
    } catch (error: any) {
      const errorMessage = error.response?.data || 'Credenziali errate';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nuovoTelefono || !nuovaDataNascita) {
      toast.error('Compila tutti i campi');
      return;
    }
    
    setSaveDialogOpen(true);
  };

  const handleFinalConfirm = async (username: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      
      await utentiApi.update(parseInt(id!), {
        username: username,
        email: email,
        password: password,
        telefono: nuovoTelefono,
        dataNascita: nuovaDataNascita,
      });
      
      toast.success('Utente aggiornato con successo!');
      navigate('/utenti');
      
    } catch (error: any) {
      const errorMessage = error.response?.data || 'Errore nell\'aggiornamento';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
      setSaveDialogOpen(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <AuthDialog
        isOpen={authDialogOpen}
        onClose={() => navigate('/utenti')}
        onConfirm={handleAuthConfirm}
        isLoading={isLoading}
        title="Verifica Identità"
        description="Per modificare i dati, inserisci le tue credenziali di autenticazione."
        confirmText="Verifica"
      />
    );
  }

  return (
    <>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Modifica Dati Utente</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSaveChanges} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nuovoTelefono">Nuovo Telefono *</Label>
              <Input
                id="nuovoTelefono"
                value={nuovoTelefono}
                onChange={(e) => setNuovoTelefono(e.target.value)}
                placeholder="Inserisci il nuovo telefono"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nuovaDataNascita">Nuova Data di Nascita *</Label>
              <Input
                id="nuovaDataNascita"
                type="date"
                value={nuovaDataNascita}
                onChange={(e) => setNuovaDataNascita(e.target.value)}
                required
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Salvataggio...' : 'Salva Modifiche'}
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate('/utenti')}>
                Annulla
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <AuthDialog
        isOpen={saveDialogOpen}
        onClose={() => setSaveDialogOpen(false)}
        onConfirm={handleFinalConfirm}
        isLoading={isLoading}
        title="Conferma Modifiche"
        description="Per salvare le modifiche, inserisci nuovamente le tue credenziali."
        confirmText="Salva"
      />
    </>
  );
};

export default UtenteEditPage;