import React from 'react';
import Section from './Section';
import { GITHUB_USERNAME, PERSONAL_INFO } from '../constants';
import { useGithubContext } from '../App';
import { SocialLink } from '../types';

const Home: React.FC = () => {
  const { user, isLoadingUser, isUserStale } = useGithubContext();
  
  const socialLinks: SocialLink[] = [
    { name: 'GitHub', url: `https://github.com/${GITHUB_USERNAME}`, icon: Github },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/mellodev-', icon: Linkedin },
    { name: 'Rocketseat', url: 'https://app.rocketseat.com.br/me/mxrvit', icon: Rocket },
    { name: 'Email', url: `mailto:${PERSONAL_INFO.email}`, icon: Mail },
  ];

  return (
    <Section id="home">
      <div className="text-center flex flex-col items-center">
        {isUserStale && (
            <div className="mb-4 w-full max-w-2xl p-3 text-sm text-yellow-800 bg-yellow-100 border border-yellow-300 rounded-lg dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-500/30" role="alert">
              Atenção: Não foi possível buscar os dados mais recentes. As informações exibidas podem estar desatualizadas.
            </div>
        )}
        {isLoadingUser ? (
          <div className="w-40 h-40 bg-light-border dark:bg-dark-border rounded-full animate-pulse"></div>
        ) : (
          user && <img src={user.avatar_url} alt={user.name} className="w-40 h-40 rounded-full shadow-2xl mb-6 border-4 border-light-card dark:border-dark-card" />
        )}
        <h1 className="text-4xl md:text-5xl font-extrabold text-light-text dark:text-dark-text tracking-tight mb-2">
          {user?.name || PERSONAL_INFO.name}
        </h1>
        <h2 className="text-xl md:text-2xl font-medium text-light-accent dark:text-dark-accent mb-4">{PERSONAL_INFO.title}</h2>
        <p className="max-w-2xl text-lg text-light-subtext dark:text-dark-subtext mb-8">
          {user?.bio || PERSONAL_INFO.bio}
        </p>
        <div className="flex items-center justify-center space-x-4">
          {socialLinks.map(link => (
            <a 
              key={link.name} 
              href={link.url}
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-3 bg-light-card dark:bg-dark-card rounded-full shadow-md hover:shadow-lg hover:scale-105 hover:-translate-y-1 transition-all duration-300 text-light-subtext dark:text-dark-subtext"
              aria-label={link.name}
            >
              <link.icon className="w-6 h-6" />
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
};

// Ícones definidos aqui para evitar problemas de dependência
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
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M9 18V9.5A2.5 2.5 0 0 1 11.5 7h1A2.5 2.5 0 0 1 15 9.5V18" />
        <path d="M12 7L10 2h4l-2 5z" />
        <path d="M9 18l-4 4h4" />
        <path d="M15 18l4 4h-4" />
    </svg>
);

export default Home;