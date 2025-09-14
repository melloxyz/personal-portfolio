import React from 'react';
import Section from './Section';
import CertificationCard from './CertificationCard';
import { CERTIFICATIONS, ACADEMIC_FORMATION } from '../constants';
import { AcademicFormation } from '../types';

// Ícones definidos inline
const BookOpen: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
);
const Code: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
);


const FormationCard: React.FC<{ formation: AcademicFormation }> = ({ formation }) => {
  return (
    <div
      className="relative flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 p-6 bg-light-card dark:bg-dark-card rounded-2xl shadow-md transition-all duration-300"
    >
      <span className="absolute top-4 right-4 text-xs font-semibold bg-light-accent/10 dark:bg-dark-accent/20 text-light-accent dark:text-dark-accent px-2.5 py-1 rounded-full">
        Cursando
      </span>
      <div className="flex-shrink-0 w-20 h-20 flex items-center justify-center">
        <img src={formation.logoUrl} alt={`${formation.institution} logo`} className="max-w-full max-h-full object-contain rounded-xl" loading="lazy"/>
      </div>
      <div className="flex-grow">
        <h3 className="font-bold text-lg text-light-text dark:text-dark-text">{formation.institution}</h3>
        <p className="text-md text-light-subtext dark:text-dark-subtext font-medium">{formation.course}</p>
        <p className="text-sm text-light-subtext dark:text-dark-subtext mt-1 mb-4">{formation.period}</p>
        
        <div className="space-y-4">
            <div>
                <div className="flex items-center space-x-2 mb-2">
                    <BookOpen className="w-4 h-4 text-light-accent dark:text-dark-accent" />
                    <h4 className="font-semibold text-sm text-light-text dark:text-dark-text">Principais Disciplinas</h4>
                </div>
                <ul className="list-disc list-inside space-y-1 text-sm text-light-subtext dark:text-dark-subtext pl-2">
                    {formation.mainSubjects.map((subject, index) => (
                        <li key={index}>{subject}</li>
                    ))}
                </ul>
            </div>
            <div>
                <div className="flex items-center space-x-2 mb-2">
                    <Code className="w-4 h-4 text-light-accent dark:text-dark-accent" />
                    <h4 className="font-semibold text-sm text-light-text dark:text-dark-text">Linguagens & Ferramentas</h4>
                </div>
                <ul className="list-disc list-inside space-y-1 text-sm text-light-subtext dark:text-dark-subtext pl-2">
                    {formation.toolsAndLanguages.map((tool, index) => (
                        <li key={index}>{tool}</li>
                    ))}
                </ul>
            </div>
        </div>
      </div>
    </div>
  );
};


const Certifications: React.FC = () => {
  return (
    <Section id="certifications">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">Formação & Certificações</h2>
        <p className="text-lg text-light-subtext dark:text-dark-subtext mt-2">
          Meu compromisso com o aprendizado contínuo e desenvolvimento profissional.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <h3 className="text-2xl font-bold text-light-text dark:text-dark-text mb-6">Formação Acadêmica</h3>
        <div className="space-y-6">
          {ACADEMIC_FORMATION.map((formation, index) => (
            <FormationCard key={index} formation={formation} />
          ))}
        </div>

        <h3 className="text-2xl font-bold text-light-text dark:text-dark-text mt-16 mb-6">Certificações</h3>
        <div className="space-y-6">
          {CERTIFICATIONS.map((cert, index) => (
            <CertificationCard key={index} certification={cert} />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Certifications;