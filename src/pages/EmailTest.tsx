import React, { useState } from 'react';
import { toast } from 'sonner';
import { emailApi } from '../api/utenti';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Mail, MailCheck, MailPlus, Send } from 'lucide-react';

const EmailTestPage: React.FC = () => {
  const [testLoading, setTestLoading] = useState(false);
  const [welcomeLoading, setWelcomeLoading] = useState(false);
  const [customLoading, setCustomLoading] = useState(false);
  
  const [welcomeData, setWelcomeData] = useState({
    to: '',
    username: '',
  });
  
  const [customData, setCustomData] = useState({
    to: '',
    subject: '',
    htmlContent: '',
  });

  const handleTestResend = async () => {
    try {
      setTestLoading(true);
      const result = await emailApi.testResend();
      toast.success(result);
    } catch (error: any) {
      toast.error(error.response?.data || 'Errore nel test di Resend');
    } finally {
      setTestLoading(false);
    }
  };

  const handleSendWelcome = async () => {
    if (!welcomeData.to || !welcomeData.username) {
      toast.error('Inserisci destinatario e username');
      return;
    }
    try {
      setWelcomeLoading(true);
      const result = await emailApi.sendWelcome(welcomeData.to, welcomeData.username);
      toast.success(result);
      setWelcomeData({ to: '', username: '' });
    } catch (error: any) {
      toast.error(error.response?.data || 'Errore nell\'invio dell\'email di benvenuto');
    } finally {
      setWelcomeLoading(false);
    }
  };

  const handleSendCustom = async () => {
    if (!customData.to || !customData.subject || !customData.htmlContent) {
      toast.error('Compila tutti i campi obbligatori');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customData.to)) {
      toast.error('Inserisci un indirizzo email valido');
      return;
    }
    try {
      setCustomLoading(true);
      const result = await emailApi.sendEmail({
        to: customData.to,
        subject: customData.subject,
        htmlContent: customData.htmlContent,
      });
      toast.success(result);
      setCustomData({ to: '', subject: '', htmlContent: '' });
    } catch (error: any) {
      toast.error(error.response?.data || 'Errore nell\'invio dell\'email personalizzata');
    } finally {
      setCustomLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Test Resend */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-gray-900">
            <Mail className="w-5 h-5" />
            Test Configurazione Resend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 text-sm mb-4">
            Verifica che la configurazione di Resend sia corretta. Verrà inviata un'email di test.
          </p>
          <Button
            onClick={handleTestResend}
            disabled={testLoading}
            className="bg-gray-800 hover:bg-gray-900 text-white"
          >
            {testLoading ? 'Invio in corso...' : 'Esegui Test Resend'}
          </Button>
        </CardContent>
      </Card>

      {/* Email di Benvenuto */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-gray-900">
            <MailCheck className="w-5 h-5" />
            Invia Email di Benvenuto
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="welcome-to" className="text-gray-700">Email del Destinatario *</Label>
            <Input
              id="welcome-to"
              type="email"
              placeholder="esempio@email.com"
              value={welcomeData.to}
              onChange={(e) => setWelcomeData({ ...welcomeData, to: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="welcome-username" className="text-gray-700">Username *</Label>
            <Input
              id="welcome-username"
              placeholder="username"
              value={welcomeData.username}
              onChange={(e) => setWelcomeData({ ...welcomeData, username: e.target.value })}
            />
          </div>
          <Button
            onClick={handleSendWelcome}
            disabled={welcomeLoading || !welcomeData.to || !welcomeData.username}
            className="bg-gray-800 hover:bg-gray-900 text-white"
          >
            <Send className="w-4 h-4 mr-1" />
            {welcomeLoading ? 'Invio in corso...' : 'Invia Email di Benvenuto'}
          </Button>
        </CardContent>
      </Card>

      {/* Email Personalizzata */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-gray-900">
            <MailPlus className="w-5 h-5" />
            Invia Email Personalizzata
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="custom-to" className="text-gray-700">Destinatario *</Label>
            <Input
              id="custom-to"
              type="email"
              placeholder="esempio@email.com"
              value={customData.to}
              onChange={(e) => setCustomData({ ...customData, to: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="custom-subject" className="text-gray-700">Oggetto *</Label>
            <Input
              id="custom-subject"
              placeholder="Oggetto dell'email"
              value={customData.subject}
              onChange={(e) => setCustomData({ ...customData, subject: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="custom-html" className="text-gray-700">Contenuto HTML *</Label>
            <Textarea
              id="custom-html"
              placeholder={`<h1>Titolo</h1>\n<p>Contenuto dell'email...</p>`}
              rows={6}
              value={customData.htmlContent}
              onChange={(e) => setCustomData({ ...customData, htmlContent: e.target.value })}
              className="font-mono text-sm"
            />
          </div>
          <Button
            onClick={handleSendCustom}
            disabled={customLoading || !customData.to || !customData.subject || !customData.htmlContent}
            className="bg-gray-800 hover:bg-gray-900 text-white"
          >
            <Send className="w-4 h-4 mr-1" />
            {customLoading ? 'Invio in corso...' : 'Invia Email Personalizzata'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailTestPage;