
import React from 'react';
import { Certification } from '../types';

interface CertificationCardProps {
  certification: Certification;
}

const CertificationCard: React.FC<CertificationCardProps> = ({ certification }) => {
  return (
    <a
      href={certification.verifyUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block"
    >
      <div className="relative p-6 bg-light-card dark:bg-dark-card rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 border border-transparent hover:border-purple-200 dark:hover:border-purple-800 overflow-hidden">
        {/* Gradient overlay sutil */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Borda animada */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 p-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="w-full h-full bg-light-card dark:bg-dark-card rounded-3xl" />
        </div>

        <div className="relative flex items-center gap-6">
          {/* Logo com efeito premium */}
          <div className="flex-shrink-0 relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center shadow-inner group-hover:shadow-lg transition-shadow duration-300">
              <img 
                src={certification.issuerLogoUrl} 
                alt={`${certification.issuer} logo`} 
                className="max-w-full max-h-full object-contain rounded-xl filter group-hover:brightness-110 transition-all duration-300" 
                loading="lazy"
              />
            </div>
            {/* Pulse effect */}
            <div className="absolute inset-0 rounded-2xl bg-purple-500/20 opacity-0 group-hover:opacity-100 group-hover:animate-ping" />
          </div>
          
          {/* Conteúdo */}
          <div className="flex-grow min-w-0">
            <h3 className="font-bold text-xl text-light-text dark:text-dark-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
              {certification.title}
            </h3>
            
            <div className="flex items-center gap-2 mt-2">
              <div className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium rounded-full">
                {certification.issuer}
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2 text-sm text-light-subtext dark:text-dark-subtext">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                {certification.date}
              </div>
              
              <div className="flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400 font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                <span>Verificar Certificado</span>
                <ExternalLink className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Status badge */}
          <div className="flex-shrink-0">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-green-600 shadow-lg">
              <div className="w-full h-full rounded-full bg-green-400 animate-ping opacity-75" />
            </div>
          </div>
        </div>

        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500 -z-10" />
      </div>
    </a>
  );
};

const ExternalLink: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
);

export default CertificationCard;