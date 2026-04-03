import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface AuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (username: string, email: string, password: string) => void;
  isLoading?: boolean;
  title: string;
  description: string;
  confirmText: string;
}

const AuthDialog: React.FC<AuthDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
  title,
  description,
  confirmText,
}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setUsername('');
      setEmail('');
      setPassword('');
    }
  }, [isOpen]);

  const handleConfirm = () => {
    if (username && email && password) {
      onConfirm(username, email, password);
    }
  };

  const handleClose = () => {
    onClose();
  };

  // Determina il colore del bottone di conferma
  const getButtonVariant = () => {
    if (confirmText === 'Elimina') return 'destructive';
    if (confirmText === 'Verifica') return 'default';
    return 'default';
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md !bg-white !text-gray-900 p-0 overflow-hidden">
        <div className="p-6">
          <DialogHeader className="mb-4">
            <DialogTitle className="!text-gray-900 !text-xl !font-semibold">
              {title}
            </DialogTitle>
            <DialogDescription className="!text-gray-600 !mt-1">
              {description}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="auth-username" className="!text-gray-700">
                Username
              </Label>
              <Input
                id="auth-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Inserisci il tuo username"
                autoComplete="off"
                className="!bg-white !border-gray-300 !text-gray-900 focus:!border-blue-500 focus:!ring-blue-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="auth-email" className="!text-gray-700">
                Email
              </Label>
              <Input
                id="auth-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Inserisci la tua email"
                autoComplete="off"
                className="!bg-white !border-gray-300 !text-gray-900 focus:!border-blue-500 focus:!ring-blue-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="auth-password" className="!text-gray-700">
                Password
              </Label>
              <Input
                id="auth-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Inserisci la password"
                autoComplete="off"
                className="!bg-white !border-gray-300 !text-gray-900 focus:!border-blue-500 focus:!ring-blue-500"
              />
            </div>
          </div>
          
          <DialogFooter className="mt-6 gap-2">
            <Button 
              variant="outline" 
              onClick={handleClose}
              className="!bg-white !border-gray-300 !text-gray-700 hover:!bg-gray-50"
            >
              Annulla
            </Button>
            <Button 
              onClick={handleConfirm} 
              disabled={isLoading || !username || !email || !password}
              variant={getButtonVariant()}
              className={confirmText === 'Verifica' 
                ? "!bg-blue-600 !text-white hover:!bg-blue-700" 
                : confirmText === 'Elimina'
                ? "!bg-red-600 !text-white hover:!bg-red-700"
                : "!bg-blue-600 !text-white hover:!bg-blue-700"
              }
            >
              {isLoading ? 'Elaborazione...' : confirmText}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;