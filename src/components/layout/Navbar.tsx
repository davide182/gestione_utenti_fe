import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { Home, Users, UserPlus, Mail } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/utenti', label: 'Utenti', icon: Users },
    { path: '/utenti/create', label: 'Crea Utente', icon: UserPlus },
    { path: '/email-test', label: 'Test Email', icon: Mail },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex space-x-1 sm:space-x-6">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "inline-flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "text-gray-900 border-b-2 border-gray-900"
                      : "text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}
          </div>
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-900">
              Gestione Utenti
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;