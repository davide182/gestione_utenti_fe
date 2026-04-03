import api from './axios';
import type { Utente, UtenteCreate, Ruolo } from '../types/utente';
import type { EmailRequest } from '../types/utente';

export const utentiApi = {
  getAll: async (): Promise<Utente[]> => {
    const response = await api.get('/utenti');
    return response.data;
  },

  getById: async (id: number): Promise<Utente> => {
    const response = await api.get(`/utenti/${id}`);
    return response.data;
  },

  getByUsername: async (username: string): Promise<Utente> => {
    const response = await api.get(`/utenti/username/${username}`);
    return response.data;
  },

  getByRuolo: async (ruolo: Ruolo): Promise<Utente[]> => {
    const response = await api.get(`/utenti/ruolo/${ruolo}`);
    return response.data;
  },

  create: async (utente: UtenteCreate): Promise<Utente> => {
    const response = await api.post('/utenti', utente);
    return response.data;
  },

  update: async (id: number, utente: Partial<Utente>): Promise<Utente> => {
    console.log('Invio update per ID:', id);
    console.log('Dati inviati:', utente);
    const response = await api.put(`/utenti/${id}`, utente);
    console.log('Risposta:', response.data);
    return response.data;
  },

  delete: async (id: number, utente: Partial<Utente>): Promise<void> => {
    await api.delete(`/utenti/${id}`, { data: utente });
  },
};

export const emailApi = {
  sendEmail: async (emailRequest: EmailRequest): Promise<string> => {
    const response = await api.post('/email/send', emailRequest);
    return response.data;
  },

  sendWelcome: async (email: string, username: string): Promise<string> => {
    const response = await api.post(`/email/welcome/${email}/${username}`);
    return response.data;
  },

  testResend: async (): Promise<string> => {
    const response = await api.get('/email/test');
    return response.data;
  },
};