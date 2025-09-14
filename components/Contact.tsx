import React from 'react';
import Section from './Section';
import { GITHUB_USERNAME, PERSONAL_INFO } from '../constants';
import { SocialLink } from '../types';

const Contact: React.FC = () => {
    
  const socialLinks: SocialLink[] = [
    { name: 'GitHub', url: `https://github.com/${GITHUB_USERNAME}`, icon: Github },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/mellodev-', icon: Linkedin },
    { name: 'Rocketseat', url: 'https://app.rocketseat.com.br/me/mxrvit', icon: Rocket },
    { name: 'Email', url: `mailto:${PERSONAL_INFO.email}`, icon: Mail },
  ];

  return (
    <Section id="contact">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold">Entre em Contato</h2>
        <p className="text-lg text-light-subtext dark:text-dark-subtext mt-2 max-w-xl mx-auto">
          Estou aberto a novas oportunidades, conexões e colaborações. Sinta-se à vontade para entrar em contato!
        </p>
        <div className="mt-8">
            <a 
              href={`mailto:${PERSONAL_INFO.email}`} 
              className="inline-block bg-light-accent hover:bg-opacity-90 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Diga Olá
            </a>
        </div>
        <div className="flex items-center justify-center space-x-6 mt-10">
          {socialLinks.map(link => (
            <a 
              key={link.name} 
              href={link.url}
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-light-subtext dark:text-dark-subtext hover:text-light-accent dark:hover:text-dark-accent hover:scale-110 hover:-translate-y-1 transition-all duration-300"
              aria-label={link.name}
            >
              <link.icon className="w-8 h-8" />
            </a>
          ))}
        </div>
      </div>
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