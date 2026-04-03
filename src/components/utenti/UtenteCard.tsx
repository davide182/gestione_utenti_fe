import React from 'react';
import type { Utente } from '../../types/utente';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { User, Mail, Phone, Calendar, Edit2, Trash2 } from 'lucide-react';

interface UtenteCardProps {
  utente: Utente;
  onDelete?: (id: number) => void;
  onEdit?: (id: number) => void;
}

const UtenteCard: React.FC<UtenteCardProps> = ({ utente, onDelete, onEdit }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('it-IT');
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-gray-500" />
            <CardTitle className="text-gray-900 text-lg">{utente.username}</CardTitle>
          </div>
          <Badge variant={utente.ruolo === 'ADMIN' ? 'destructive' : 'default'}>
            {utente.ruolo}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <p className="flex items-center gap-2 text-gray-600">
            <Mail className="w-3.5 h-3.5" />
            {utente.email}
          </p>
          <p className="flex items-center gap-2 text-gray-600">
            <Phone className="w-3.5 h-3.5" />
            {utente.telefono}
          </p>
          <p className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-3.5 h-3.5" />
            {formatDate(utente.dataNascita)}
          </p>
        </div>
        <div className="flex gap-2 mt-4">
          {onEdit && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(utente.id)}
              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <Edit2 className="w-3.5 h-3.5 mr-1" />
              Modifica
            </Button>
          )}
          {onDelete && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(utente.id)}
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              <Trash2 className="w-3.5 h-3.5 mr-1" />
              Elimina
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UtenteCard;