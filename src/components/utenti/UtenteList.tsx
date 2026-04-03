import React from 'react';
import type { Utente } from '../../types/utente';
import UtenteCard from './UtenteCard';

interface UtenteListProps {
  utenti: Utente[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
  isLoading?: boolean;
}

const UtenteList: React.FC<UtenteListProps> = ({
  utenti,
  onDelete,
  onEdit,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Caricamento utenti...</p>
      </div>
    );
  }

  if (utenti.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Nessun utente trovato.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {utenti.map((utente) => (
        <UtenteCard
          key={utente.id}
          utente={utente}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default UtenteList;