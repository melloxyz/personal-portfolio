
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
      className="flex items-center space-x-4 p-4 bg-light-card dark:bg-dark-card rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
    >
      <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center">
        <img src={certification.issuerLogoUrl} alt={`${certification.issuer} logo`} className="max-w-full max-h-full object-contain rounded-xl" loading="lazy"/>
      </div>
      <div className="flex-grow">
        <h3 className="font-bold text-lg text-light-text dark:text-dark-text">{certification.title}</h3>
        <p className="text-sm text-light-subtext dark:text-dark-subtext font-medium">{certification.issuer}</p>
        <p className="text-xs text-light-subtext dark:text-dark-subtext mt-1">{certification.date}</p>
      </div>
      <div className="flex-shrink-0 flex items-center space-x-1.5 text-light-subtext dark:text-dark-subtext group-hover:text-light-accent dark:group-hover:text-dark-accent transition-colors duration-300">
        <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">Ver</span>
        <ExternalLink className="w-5 h-5"/>
      </div>
    </a>
  );
};

const ExternalLink: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
);

export default CertificationCard;