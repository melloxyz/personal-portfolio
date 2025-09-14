import React, { useState, useEffect } from 'react';
import Section from './Section';
import { GITHUB_USERNAME, PERSONAL_INFO } from '../constants';
import { SocialLink } from '../types';

const Contact: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);
    
  const socialLinks: SocialLink[] = [
    { name: 'GitHub', url: `https://github.com/${GITHUB_USERNAME}`, icon: Github },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/mellodev-', icon: Linkedin },
    { name: 'Rocketseat', url: 'https://app.rocketseat.com.br/me/mxrvit', icon: Rocket },
    { name: 'Email', url: `mailto:${PERSONAL_INFO.email}`, icon: Mail },
  ];

  return (
    <Section id="contact">
      {/* Background orbs discretos */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{animationDelay: '3s'}}></div>
      </div>

      <div className={`relative z-10 text-center transition-all duration-800 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        {/* Header moderno discreto */}
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
          Entre em Contato
        </h2>
        <p className="text-xl text-light-subtext dark:text-dark-subtext mt-2 max-w-2xl mx-auto mb-12 font-light">
          Estou aberto a novas oportunidades, conexões e colaborações. Sinta-se à vontade para entrar em contato!
        </p>

        {/* Botão CTA premium */}
        <div className="mb-16">
          <a 
            href={`mailto:${PERSONAL_INFO.email}`} 
            className="group relative inline-block"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-100 blur transition-all duration-300"></div>
            <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1">
              Diga Olá 👋
            </div>
          </a>
        </div>

        {/* Social links premium discretos */}
        <div className="flex items-center justify-center gap-8">
          {socialLinks.map((link, index) => (
            <a 
              key={link.name} 
              href={link.url}
              target="_blank" 
              rel="noopener noreferrer" 
              className="group relative p-4 rounded-2xl bg-light-card dark:bg-dark-card shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              aria-label={link.name}
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <link.icon className="relative w-8 h-8 text-light-subtext dark:text-dark-subtext group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300" />
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {link.name}
              </div>
            </a>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-gentle {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.15; }
        }
        
        .animate-pulse {
          animation: pulse-gentle 4s ease-in-out infinite;
        }
      `}</style>
    </Section>
  );
};

// Ícones
const Github: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
        <path d="M9 18c-4.51 2-5-2-7-2"></path>
    </svg>
);
const Linkedin: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect width="4" height="12" x="2" y="9"></rect>
        <circle cx="4" cy="4" r="2"></circle>
    </svg>
);
const Mail: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
    </svg>
);
const Rocket: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/s`vg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M9 18V9.5A2.5 2.5 0 0 1 11.5 7h1A2.5 2.5 0 0 1 15 9.5V18" />
        <path d="M12 7L10 2h4l-2 5z" />
        <path d="M9 18l-4 4h4" />
        <path d="M15 18l4 4h-4" />
    </svg>
);

export default Contact;