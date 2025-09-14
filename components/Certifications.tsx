import React, { useState, useEffect } from 'react';
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

const Graduate: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
);

const Trophy: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>
);


const FormationCard: React.FC<{ formation: AcademicFormation; index: number }> = ({ formation, index }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 200);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      className={`relative group transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="bg-gradient-to-br from-light-card to-light-bg dark:from-dark-card dark:to-dark-bg rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-light-border/30 dark:border-dark-border/30 backdrop-blur-sm relative overflow-hidden group">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="relative z-10">
          {/* Status badge */}
          <div className="absolute top-0 right-0 flex items-center gap-2">
            <span className="bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-1">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              Cursando
            </span>
          </div>

          <div className="flex flex-col lg:flex-row items-start gap-6 mb-6">
            {/* Logo */}
            <div className="flex-shrink-0 group">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 flex items-center justify-center p-2 shadow-lg group-hover:scale-105 transition-transform duration-300">
                <img 
                  src={formation.logoUrl} 
                  alt={`${formation.institution} logo`} 
                  className="max-w-full max-h-full object-contain rounded-xl" 
                  loading="lazy"
                />
              </div>
            </div>

            {/* Info */}
            <div className="flex-grow min-w-0">
              <div className="flex items-start gap-2 mb-2">
                <Graduate className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
                <h3 className="font-bold text-xl lg:text-2xl text-light-text dark:text-dark-text break-words">{formation.institution}</h3>
              </div>
              <p className="text-lg lg:text-xl text-light-subtext dark:text-dark-subtext font-medium mb-2 break-words">{formation.course}</p>
              <div className="flex items-center gap-2 text-sm text-light-subtext/80 dark:text-dark-subtext/80">
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <span className="break-words">{formation.period}</span>
              </div>
            </div>
          </div>
          
          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Disciplinas */}
            <div className="bg-light-bg/50 dark:bg-dark-bg/50 rounded-2xl p-6 border border-light-border/20 dark:border-dark-border/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-cyan-500 flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
                <h4 className="font-bold text-lg text-light-text dark:text-dark-text">Principais Disciplinas</h4>
              </div>
              <div className="max-h-40 overflow-y-auto scrollbar-thin space-y-2">
                {formation.mainSubjects.map((subject, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm text-light-subtext dark:text-dark-subtext">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                    <span className="break-words">{subject}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ferramentas */}
            <div className="bg-light-bg/50 dark:bg-dark-bg/50 rounded-2xl p-6 border border-light-border/20 dark:border-dark-border/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center">
                  <Code className="w-4 h-4 text-white" />
                </div>
                <h4 className="font-bold text-lg text-light-text dark:text-dark-text">Linguagens & Ferramentas</h4>
              </div>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto scrollbar-thin">
                {formation.toolsAndLanguages.map((tool, idx) => (
                  <span key={idx} className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 text-purple-700 dark:text-purple-300 text-xs font-medium rounded-full border border-purple-200 dark:border-purple-700/30 flex-shrink-0">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const Certifications: React.FC = () => {
  const [visibleSection, setVisibleSection] = useState('');

  useEffect(() => {
    const timer1 = setTimeout(() => setVisibleSection('header'), 200);
    const timer2 = setTimeout(() => setVisibleSection('formation'), 600);
    const timer3 = setTimeout(() => setVisibleSection('certifications'), 1200);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <Section id="certifications">
      {/* Background orbs animados */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 -right-32 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute -bottom-32 left-1/3 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative z-10">
        {/* Header moderno */}
        <div className={`text-center mb-20 transition-all duration-800 ${
          visibleSection === 'header' || visibleSection === 'formation' || visibleSection === 'certifications' 
            ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Formação & Certificações
          </h2>
          <p className="text-xl md:text-2xl text-light-subtext dark:text-dark-subtext mb-6 max-w-4xl mx-auto font-light">
            Meu compromisso com o aprendizado contínuo e desenvolvimento profissional
          </p>
          
          {/* Stats de aprendizado */}
          <div className="flex flex-wrap justify-center gap-8 mt-12 mb-8">
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Graduate className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {ACADEMIC_FORMATION.length}
              </div>
              <div className="text-sm text-light-subtext dark:text-dark-subtext">Formação</div>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {CERTIFICATIONS.length}+
              </div>
              <div className="text-sm text-light-subtext dark:text-dark-subtext">Certificações</div>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-pink-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">
                2025
              </div>
              <div className="text-sm text-light-subtext dark:text-dark-subtext">Em Andamento</div>
            </div>
          </div>
        </div>

        {/* Formação Acadêmica */}
        <div className={`mb-20 transition-all duration-800 ${
          visibleSection === 'formation' || visibleSection === 'certifications' 
            ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
              <Graduate className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Formação Acadêmica
              </h3>
              <p className="text-light-subtext dark:text-dark-subtext">Base sólida em tecnologia</p>
            </div>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="relative space-y-8">
              {ACADEMIC_FORMATION.map((formation, index) => (
                <FormationCard 
                  key={index} 
                  formation={formation} 
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Certificações */}
        <div className={`transition-all duration-800 ${
          visibleSection === 'certifications' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Certificações
              </h3>
              <p className="text-light-subtext dark:text-dark-subtext">Especialização contínua</p>
            </div>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-1 gap-8">
              {CERTIFICATIONS.map((cert, index) => (
                <div 
                  key={index} 
                  className="opacity-0 translate-y-4 animate-fade-in-up"
                  style={{animationDelay: `${index * 0.15}s`, animationFillMode: 'forwards'}}
                >
                  <CertificationCard certification={cert} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-gentle {
          0%, 100% { 
            transform: scale(1) rotate(0deg);
            opacity: 0.2; 
          }
          50% { 
            transform: scale(1.05) rotate(180deg);
            opacity: 0.3; 
          }
        }
        
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-pulse {
          animation: pulse-gentle 6s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>
    </Section>
  );
};

export default Certifications;