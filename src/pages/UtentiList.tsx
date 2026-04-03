import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { utentiApi } from '../api/utenti';
import type { Utente } from '../types/utente';
import UtenteList from '../components/utenti/UtenteList';
import AuthDialog from '../components/AuthDialog';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Users, Plus, Search } from 'lucide-react';

const UtentiListPage: React.FC = () => {
  const [utenti, setUtenti] = useState<Utente[]>([]);
  const [filteredUtenti, setFilteredUtenti] = useState<Utente[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRuolo, setFilterRuolo] = useState<string>('all');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const navigate = useNavigate();

  const loadUtenti = async () => {
    try {
      setIsLoading(true);
      const data = await utentiApi.getAll();
      setUtenti(data);
      setFilteredUtenti(data);
    } catch (error) {
      toast.error('Errore nel caricamento degli utenti');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUtenti();
  }, []);

  useEffect(() => {
    let filtered = utenti;
    if (searchTerm) {
      filtered = filtered.filter(
        (u) =>
          u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          u.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filterRuolo !== 'all') {
      filtered = filtered.filter((u) => u.ruolo === filterRuolo);
    }
    setFilteredUtenti(filtered);
  }, [searchTerm, filterRuolo, utenti]);

  const handleDeleteClick = (id: number) => {
    setSelectedUserId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async (username: string, email: string, password: string) => {
    if (!selectedUserId) return;
    try {
      setIsDeleting(true);
      const utenteDaEliminare = utenti.find(u => u.id === selectedUserId);
      if (!utenteDaEliminare) {
        toast.error('Utente non trovato');
        return;
      }
      await utentiApi.delete(selectedUserId, { ...utenteDaEliminare, password });
      toast.success('Utente eliminato con successo');
      setDeleteDialogOpen(false);
      loadUtenti();
    } catch (error: any) {
      const errorMessage = error.response?.data || 'Credenziali errate';
      toast.error(errorMessage);
      console.error(error);
    } finally {
      setIsDeleting(false);
      setSelectedUserId(null);
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/utenti/${id}/edit`);
  };

  return (
    <>
      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <Users className="w-5 h-5" />
                Lista Utenti
              </CardTitle>
              <Button 
                onClick={() => navigate('/utenti/create')}
                className="bg-gray-800 hover:bg-gray-900 text-white"
                size="sm"
              >
                <Plus className="w-4 h-4 mr-1" />
                Nuovo Utente
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Cerca per username o email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={filterRuolo} onValueChange={setFilterRuolo}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Filtra per ruolo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tutti</SelectItem>
                  <SelectItem value="USER">User</SelectItem>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <UtenteList
              utenti={filteredUtenti}
              onDelete={handleDeleteClick}
              onEdit={handleEdit}
              isLoading={isLoading}
            />
          </CardContent>
        </Card>
      </div>

      <AuthDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        isLoading={isDeleting}
        title="Conferma Eliminazione"
        description="Per eliminare questo utente, inserisci le tue credenziali di autenticazione."
        confirmText="Elimina"
      />
    </>
  );
};

export default UtentiListPage;