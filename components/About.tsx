import React, { useState, useEffect, useMemo } from 'react';
import Section from './Section';
import { PERSONAL_INFO, SKILLS, ACADEMIC_FORMATION } from '../constants';
import { useGithubContext } from '../App';

interface AboutProps {
  onSkillSelect: (skill: string) => void;
}

const About: React.FC<AboutProps> = ({ onSkillSelect }) => {
  const { repos } = useGithubContext();
  const [visibleStats, setVisibleStats] = useState(false);
  const [clickedSkill, setClickedSkill] = useState<string | null>(null);

  // Calcular tecnologias únicas dos repositórios
  const uniqueTechnologies = useMemo(() => {
    if (!repos) return new Set<string>();
    
    const techSet = new Set<string>();
    
    repos.forEach(repo => {
      // Adicionar linguagem principal
      if (repo.language) {
        techSet.add(repo.language);
      }
      
      // Adicionar topics (tags do GitHub)
      repo.topics.forEach(topic => {
        techSet.add(topic);
      });
      
      // Adicionar keywords do README se disponível
      if (repo.readme_keywords) {
        repo.readme_keywords.forEach(keyword => {
          techSet.add(keyword);
        });
      }
    });
    
    return techSet;
  }, [repos]);

  // Estatísticas dinâmicas baseadas nos dados reais
  const stats = useMemo(() => [
    { 
      label: 'Projetos Concluídos', 
      value: repos ? repos.length : 0, 
      suffix: '' 
    },
    { 
      label: 'Tecnologias Dominadas', 
      value: uniqueTechnologies.size, 
      suffix: '+' 
    },
    { 
      label: 'Anos de Estudo', 
      value: 1, 
      suffix: '+' 
    },
    { 
      label: 'Certificações', 
      value: 5, 
      suffix: '+' 
    }
  ], [repos, uniqueTechnologies]);

  const handleSkillClick = (skill: string) => {
    // Feedback visual
    setClickedSkill(skill);
    setTimeout(() => setClickedSkill(null), 2000);
    
    // Navegar para a seção de projetos
    window.location.hash = 'projects';
    
    // Aguardar a navegação e então aplicar o filtro
    setTimeout(() => {
      onSkillSelect(skill);
    }, 100);
  };

  useEffect(() => {
    const timer = setTimeout(() => setVisibleStats(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Section id="about">
      {/* Background orbs animados */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-20 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 -left-32 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute -bottom-32 right-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative z-10">
        {/* Header moderno */}
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Sobre Mim
          </h2>
          <p className="text-xl md:text-2xl text-light-subtext dark:text-dark-subtext mb-4 max-w-3xl mx-auto font-light">
            Desenvolvedor Back-End em formação, focado em criar soluções eficientes e escaláveis
          </p>
        </div>

        {/* Conteúdo principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          {/* Bio expandida */}
          <div className="lg:col-span-2 fade-in-up" style={{animationDelay: '0.2s'}}>
            <div className="bg-gradient-to-br from-light-card to-light-bg dark:from-dark-card dark:to-dark-bg rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-light-border/30 dark:border-dark-border/30 backdrop-blur-sm relative overflow-hidden">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-blue-500/5 to-purple-500/5 opacity-50"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-400 to-blue-500 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-light-text dark:text-dark-text">
                    Minha Jornada
                  </h3>
                </div>
                
                <p className="text-lg text-light-subtext dark:text-dark-subtext leading-relaxed mb-6">
                  {PERSONAL_INFO.extendedBio}
                </p>

                {/* Formação Acadêmica */}
                <div className="mt-8">
                  <h4 className="text-xl font-bold text-light-text dark:text-dark-text mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                    </svg>
                    Formação Acadêmica
                  </h4>
                  {ACADEMIC_FORMATION.map((formation, index) => (
                    <div key={index} className="bg-light-bg/50 dark:bg-dark-bg/50 rounded-2xl p-4 border border-light-border/20 dark:border-dark-border/20">
                      <div className="flex items-center gap-3 mb-2">
                        {formation.logoUrl && (
                          <img 
                            src={formation.logoUrl} 
                            alt={formation.institution}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        )}
                        <div>
                          <h5 className="font-semibold text-light-text dark:text-dark-text">{formation.course}</h5>
                          <p className="text-sm text-light-subtext dark:text-dark-subtext">{formation.institution} • {formation.period}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Skills e Estatísticas */}
          <div className="space-y-8">
            {/* Estatísticas */}
            <div className="fade-in-up" style={{animationDelay: '0.3s'}}>
              <div className="bg-gradient-to-br from-light-card to-light-bg dark:from-dark-card dark:to-dark-bg rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-light-border/30 dark:border-dark-border/30 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-light-text dark:text-dark-text mb-6 flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                  </svg>
                  Estatísticas
                  <div className="ml-2 w-2 h-2 bg-green-400 rounded-full animate-pulse" title="Dados em tempo real do GitHub"></div>
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center group">
                      <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                        {repos === null && index < 2 ? (
                          <div className="animate-pulse bg-light-border/30 dark:bg-dark-border/30 h-8 w-12 rounded mx-auto"></div>
                        ) : (
                          visibleStats ? `${stat.value}${stat.suffix}` : '0'
                        )}
                      </div>
                      <div className="text-xs text-light-subtext dark:text-dark-subtext mt-1 group-hover:text-light-text dark:group-hover:text-dark-text transition-colors">
                        {stat.label}
                      </div>
                      {index === 0 && repos && (
                        <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {repos.length > 0 ? 'Sincronizado com GitHub' : 'Carregando...'}
                        </div>
                      )}
                      {index === 1 && uniqueTechnologies.size > 0 && (
                        <div className="text-xs text-blue-600 dark:text-blue-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          Baseado nos projetos
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-light-border/20 dark:border-dark-border/20">
                  <div className="text-xs text-light-subtext/80 dark:text-dark-subtext/80 text-center flex items-center justify-center gap-2">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                    </svg>
                    Dados atualizados em tempo real
                  </div>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="fade-in-up" style={{animationDelay: '0.4s'}}>
              <div className="bg-gradient-to-br from-light-card to-light-bg dark:from-dark-card dark:to-dark-bg rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-light-border/30 dark:border-dark-border/30 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-light-text dark:text-dark-text mb-6 flex items-center gap-2">
                  <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Principais Habilidades
                </h3>
                <div className="flex flex-wrap gap-2">
                  {SKILLS.map((skill, index) => (
                    <button
                      key={skill}
                      onClick={() => handleSkillClick(skill)}
                      className={`skill-tag group relative px-4 py-2 bg-gradient-to-r from-light-accent/10 to-light-accent/5 dark:from-dark-accent/20 dark:to-dark-accent/10 text-light-accent dark:text-dark-accent text-sm font-medium rounded-full cursor-pointer hover:from-light-accent/20 hover:to-light-accent/10 dark:hover:from-dark-accent/30 dark:hover:to-dark-accent/20 transition-all duration-300 border border-light-accent/20 dark:border-dark-accent/30 hover:border-light-accent/40 dark:hover:border-dark-accent/50 hover:shadow-lg hover:-translate-y-0.5 ${
                        clickedSkill === skill ? 'bg-emerald-500 text-white border-emerald-500 animate-bounce' : ''
                      }`}
                      style={{animationDelay: `${index * 0.05}s`}}
                    >
                      {skill}
                      {clickedSkill === skill && (
                        <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-purple-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  ))}
                </div>
                <p className="text-xs text-light-subtext dark:text-dark-subtext mt-4 italic flex items-center gap-2">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                  Clique em uma habilidade para filtrar projetos relacionados
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast de feedback */}
      {clickedSkill && (
        <div className="fixed top-20 right-4 z-50 bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-6 py-3 rounded-2xl shadow-2xl border border-emerald-400/20 backdrop-blur-sm animate-slide-in-right">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="font-semibold">Filtrando por: {clickedSkill}</p>
              <p className="text-xs opacity-90">Navegando para projetos...</p>
            </div>
          </div>
        </div>
      )}

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
        
        @keyframes skill-enter {
          0% {
            opacity: 0;
            transform: translateY(10px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes slide-in-right {
          0% {
            opacity: 0;
            transform: translateX(100%);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-pulse {
          animation: pulse-gentle 6s ease-in-out infinite;
        }
        
        .fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        
        .skill-tag {
          animation: skill-enter 0.4s ease-out forwards;
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out forwards;
        }
        
        /* Smooth number counter animation */
        .stats-counter {
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </Section>
  );
};

export default About;