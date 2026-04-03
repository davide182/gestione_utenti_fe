import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { UtenteCreate, Ruolo } from '../../types/utente';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const utenteSchema = z.object({
  username: z.string().min(3, 'Username deve avere almeno 3 caratteri').max(50),
  email: z.string().email('Email non valida'),
  telefono: z.string().min(1, 'Telefono obbligatorio'),
  dataNascita: z.string().min(1, 'Data di nascita obbligatoria'),
  password: z.string().min(8, 'Password deve avere almeno 8 caratteri'),
  ruolo: z.enum(['ADMIN', 'USER']),
});

type UtenteFormData = z.infer<typeof utenteSchema>;

interface UtenteFormProps {
  onSubmit: (data: UtenteCreate) => Promise<void>;
  isLoading?: boolean;
  initialData?: Partial<UtenteCreate>;
}

const UtenteForm: React.FC<UtenteFormProps> = ({ onSubmit, isLoading = false, initialData }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UtenteFormData>({
    resolver: zodResolver(utenteSchema),
    defaultValues: {
      username: initialData?.username || '',
      email: initialData?.email || '',
      telefono: initialData?.telefono || '',
      dataNascita: initialData?.dataNascita || '',
      password: initialData?.password || '',
      ruolo: initialData?.ruolo || 'USER',
    },
  });

  const ruolo = watch('ruolo');

  const onFormSubmit = async (data: UtenteFormData) => {
    await onSubmit(data);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Nuovo Utente</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              {...register('username')}
              placeholder="mario.rossi"
            />
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              placeholder="email@example.com"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="telefono">Telefono</Label>
            <Input
              id="telefono"
              {...register('telefono')}
              placeholder="1234567890"
            />
            {errors.telefono && (
              <p className="text-sm text-red-500">{errors.telefono.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="dataNascita">Data di Nascita</Label>
            <Input
              id="dataNascita"
              type="date"
              {...register('dataNascita')}
            />
            {errors.dataNascita && (
              <p className="text-sm text-red-500">{errors.dataNascita.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              {...register('password')}
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="ruolo">Ruolo</Label>
            <Select
              value={ruolo}
              onValueChange={(value: Ruolo) => setValue('ruolo', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleziona un ruolo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USER">User</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
              </SelectContent>
            </Select>
            {errors.ruolo && (
              <p className="text-sm text-red-500">{errors.ruolo.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Creazione in corso...' : 'Crea Utente'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default UtenteForm;