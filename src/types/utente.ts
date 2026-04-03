export type Ruolo = 'ADMIN' | 'USER';

export interface Utente {
  id: number;
  username: string;
  email: string;
  telefono: string;
  dataNascita: string;
  password?: string;
  ruolo: Ruolo;
}

export interface UtenteCreate {
  username: string;
  email: string;
  telefono: string;
  dataNascita: string;
  password: string;
  ruolo: Ruolo;
}

export interface EmailRequest {
  to: string;
  subject: string;
  htmlContent: string;
}