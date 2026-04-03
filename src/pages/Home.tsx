import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { 
  UserPlus, 
  UserPen, 
  Users, 
  UserX, 
  Mail, 
  MailCheck, 
  MailPlus,
  CheckCircle2
} from 'lucide-react';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Crea Utente",
      description: "Registra un nuovo utente. Al momento della registrazione, se Resend è configurato, viene inviata un'email di benvenuto automatica.",
      icon: UserPlus,
      path: "/utenti/create"
    },
    {
      title: "Visualizza Utenti",
      description: "Consulta la lista completa degli utenti. Puoi filtrare per ruolo e cercare per username o email.",
      icon: Users,
      path: "/utenti"
    },
    {
      title: "Modifica Utente",
      description: "Aggiorna i dati di un utente esistente. Richiede autenticazione per motivi di sicurezza.",
      icon: UserPen,
      path: "/utenti"
    },
    {
      title: "Elimina Utente",
      description: "Rimuovi un utente dal sistema. Richiede autenticazione per confermare l'operazione.",
      icon: UserX,
      path: "/utenti",
      destructive: true
    }
  ];

  const emailFeatures = [
    {
      title: "Test Resend",
      description: "Verifica che l'integrazione con Resend funzioni correttamente.",
      icon: Mail,
      path: "/email-test"
    },
    {
      title: "Email di Benvenuto",
      description: "Invia manualmente un'email di benvenuto a un utente.",
      icon: MailCheck,
      path: "/email-test"
    },
    {
      title: "Email Personalizzata",
      description: "Componi e invia un'email HTML personalizzata a qualsiasi destinatario.",
      icon: MailPlus,
      path: "/email-test"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <Card className="border-0 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <CardContent className="pt-8 pb-8 text-center">
          <h1 className="text-3xl font-bold mb-3">Gestione Utenti</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Piattaforma completa per la gestione degli utenti con integrazione email tramite Resend
          </p>
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            <span className="inline-flex items-center gap-1 text-xs bg-gray-800 px-3 py-1 rounded-full">
              <CheckCircle2 className="w-3 h-3 text-green-400" />
              Resend Integrato
            </span>
            <span className="inline-flex items-center gap-1 text-xs bg-gray-800 px-3 py-1 rounded-full">
              <CheckCircle2 className="w-3 h-3 text-green-400" />
              Autenticazione Sicura
            </span>
            <span className="inline-flex items-center gap-1 text-xs bg-gray-800 px-3 py-1 rounded-full">
              <CheckCircle2 className="w-3 h-3 text-green-400" />
              CRUD Completo
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Funzionalità Utenti */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Users className="w-5 h-5" />
          Gestione Utenti
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${feature.destructive ? 'bg-red-50' : 'bg-gray-100'}`}>
                    <feature.icon className={`w-5 h-5 ${feature.destructive ? 'text-red-600' : 'text-gray-800'}`} />
                  </div>
                  <CardTitle className="text-gray-900 text-base">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">
                  {feature.description}
                </p>
                <Button
                  onClick={() => navigate(feature.path)}
                  className={`w-full ${feature.destructive ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-800 hover:bg-gray-900'} text-white`}
                  size="sm"
                >
                  {feature.title === "Visualizza Utenti" ? "Vai alla Lista" : "Vai"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Funzionalità Email */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Mail className="w-5 h-5" />
          Servizi Email con Resend
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {emailFeatures.map((feature, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gray-100">
                    <feature.icon className="w-5 h-5 text-gray-800" />
                  </div>
                  <CardTitle className="text-gray-900 text-base">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">
                  {feature.description}
                </p>
                <Button
                  onClick={() => navigate(feature.path)}
                  className="w-full bg-gray-800 hover:bg-gray-900 text-white"
                  size="sm"
                >
                  {feature.title === "Test Resend" ? "Esegui Test" : "Vai"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Info su Resend */}
      <Card className="border border-gray-200 bg-gray-50">
        <CardContent className="pt-5 pb-5">
          <div className="flex items-start gap-3">
            <MailCheck className="w-5 h-5 text-gray-800 mt-0.5" />
            <div>
              <h3 className="font-medium text-gray-900 text-sm mb-1">📧 Integrazione con Resend</h3>
              <p className="text-gray-600 text-xs">
                Alla registrazione di un nuovo utente, se Resend è configurato correttamente, 
                viene inviata automaticamente un'email di benvenuto.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;