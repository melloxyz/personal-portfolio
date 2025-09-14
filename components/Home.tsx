import React, { useState, useEffect } from 'react';
import Section from './Section';
import { GITHUB_USERNAME } from '../constants';
import { CONFIG } from '../config-loader';
import { useGithubContext } from '../App';
import { SocialLink } from '../types';

const Home: React.FC = () => {
  const { user, isLoadingUser, isUserStale } = useGithubContext();
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  
  const fullTitle = CONFIG.informacoesPessoais.titulo;
  
  // Efeito de digitação
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let currentIndex = 0;
    
    const typeNextChar = () => {
      if (currentIndex <= fullTitle.length) {
        setTypedText(fullTitle.slice(0, currentIndex));
        currentIndex++;
        timeoutId = setTimeout(typeNextChar, 100); // 100ms entre cada caractere
      } else {
        setIsTyping(false);
      }
    };
    
    // Iniciar digitação após um pequeno delay
    timeoutId = setTimeout(typeNextChar, 1000);
    
    return () => clearTimeout(timeoutId);
  }, [fullTitle]);
  
  const socialLinks: SocialLink[] = [
    { name: 'GitHub', url: `https://github.com/${GITHUB_USERNAME}`, icon: Github },
    { name: 'LinkedIn', url: CONFIG.redesSociais.linkedin, icon: Linkedin },
    { name: 'Instagram', url: CONFIG.redesSociais.instagram, icon: Instagram },
    { name: 'Twitter', url: CONFIG.redesSociais.twitter, icon: Twitter },
    { name: 'Rocketseat', url: CONFIG.redesSociais.rocketseat, icon: Rocket },
    { name: 'Website', url: CONFIG.redesSociais.website, icon: Globe },
    { name: 'Email', url: `mailto:${CONFIG.informacoesPessoais.email}`, icon: Mail },
  ].filter(link => link.url && link.url !== '' && !link.url.includes('undefined'));

  return (
    <Section id="home">
      {/* Background com gradiente animado */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-red-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 via-cyan-400/20 to-teal-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-indigo-400/10 via-purple-400/10 to-pink-400/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative text-center flex flex-col items-center">
        {isUserStale && (
            <div className="mb-4 w-full max-w-2xl p-3 text-sm text-yellow-800 bg-yellow-100 border border-yellow-300 rounded-lg dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-500/30" role="alert">
              Atenção: Não foi possível buscar os dados mais recentes. As informações exibidas podem estar desatualizadas.
            </div>
        )}
        
        {/* Avatar com animação de pulse e border gradiente */}
        <div className="relative mb-8">
          {isLoadingUser ? (
            <div className="w-40 h-40 bg-light-border dark:bg-dark-border rounded-full animate-pulse"></div>
          ) : (
            user && (
              <div className="relative">
                {/* Border gradiente animado */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 animate-spin" style={{ padding: '4px', animation: 'spin 8s linear infinite' }}>
                  <div className="w-full h-full rounded-full bg-light-bg dark:bg-dark-bg"></div>
                </div>
                {/* Avatar com animação de respiração */}
                <img 
                  src={user.avatar_url} 
                  alt={user.name} 
                  className="relative w-40 h-40 rounded-full shadow-2xl border-4 border-transparent animate-pulse-gentle" 
                  style={{
                    animation: 'pulse-gentle 3s ease-in-out infinite'
                  }}
                />
              </div>
            )
          )}
        </div>
        
        {/* Nome com efeito de entrada */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-light-text dark:text-dark-text tracking-tight mb-2 animate-fade-in-up">
          {user?.name || CONFIG.informacoesPessoais.nome}
        </h1>
        
        {/* Título com efeito de digitação - altura dinâmica */}
        <div className="min-h-[3rem] md:min-h-[3.5rem] mb-6 flex items-center justify-center">
          <h2 className="text-xl md:text-2xl font-medium text-light-accent dark:text-dark-accent text-center leading-tight">
            <span>{typedText}</span>
            {isTyping && <span className="ml-1 animate-blink">|</span>}
          </h2>
        </div>
        
        {/* Bio com efeito de fade - texto responsivo e bem formatado */}
        <div className="max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <p className="text-lg text-light-subtext dark:text-dark-subtext text-center leading-relaxed">
            {user?.bio || CONFIG.informacoesPessoais.biografiaCompleta}
          </p>
        </div>
        
        {/* CTA centralizado */}
        <div className="flex justify-center mb-12">
          {/* Botão principal premium */}
          <button
            onClick={() => window.location.hash = 'projects'}
            className="group relative px-12 py-5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold rounded-3xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 flex items-center gap-4 text-lg"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-100 blur transition-all duration-500"></div>
            <Briefcase className="relative w-6 h-6" />
            <span className="relative">Ver Meus Projetos</span>
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
        
        {/* Links sociais melhorados */}
        <div className="flex items-center justify-center space-x-4 mb-6">
          {socialLinks.map((link, index) => (
            <a 
              key={link.name} 
              href={link.url}
              target="_blank" 
              rel="noopener noreferrer" 
              className="group relative p-4 bg-light-card dark:bg-dark-card rounded-2xl shadow-md hover:shadow-xl hover:scale-110 hover:-translate-y-2 transition-all duration-300 text-light-subtext dark:text-dark-subtext hover:text-light-accent dark:hover:text-dark-accent animate-fade-in-up"
              aria-label={link.name}
              style={{ animationDelay: `${0.8 + index * 0.1}s` }}
            >
              <link.icon className="w-6 h-6" />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 dark:bg-gray-700 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                {link.name}
              </div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
          ))}
        </div>

        {/* Texto de convite */}
        <p className="text-center text-light-subtext dark:text-dark-subtext text-sm font-light max-w-md mx-auto animate-fade-in" style={{ animationDelay: '1.2s' }}>
          Sinta-se à vontade para conferir minhas outras redes e entrar em contato. Vamos conectar! 🤝
        </p>
      </div>

      {/* Estilos CSS inline para animações personalizadas */}
      <style jsx>{`
        @keyframes pulse-gentle {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-pulse-gentle {
          animation: pulse-gentle 3s ease-in-out infinite;
        }
        
        .animate-blink {
          animation: blink 1s infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
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

const Instagram: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
        <path d="m16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
    </svg>
);

const Twitter: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.247-3.739 2.088-6 2 3.308 1.803 6.913 2.423 10.034 1.517 3.58-1.04 6.522-3.723 7.651-7.742a13.84 13.84 0 0 0 .497 -3.753C20.18 7.773 21.692 5.25 22 4.01z"></path>
    </svg>
);

const Globe: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10"></circle>
        <path d="m12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        <path d="M2 12h20"></path>
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

const Briefcase: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        <rect width="20" height="14" x="2" y="6" rx="2"></rect>
    </svg>
);

const MessageCircle: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
    </svg>
);

export default Home;