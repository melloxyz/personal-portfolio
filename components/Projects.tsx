import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Section from './Section';
import { useGithubContext } from '../App';
import { GithubRepo } from '../types';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import ProjectSearch from './ProjectSearch';
import { ReadmeAnalyzer, RepoKeywords } from '../services/readmeAnalyzer';

interface ProjectsProps {
  initialFilter: string | null;
  onFilterApplied: () => void;
}

const Projects: React.FC<ProjectsProps> = ({ initialFilter, onFilterApplied }) => {
  const { repos, isLoadingRepos, isReposStale, getRepoReadme } = useGithubContext();
  
  const [allRepos, setAllRepos] = useState<GithubRepo[]>([]);
  const [recentRepos, setRecentRepos] = useState<GithubRepo[]>([]);
  const [filteredRepos, setFilteredRepos] = useState<GithubRepo[]>([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  
  const [selectedRepo, setSelectedRepo] = useState<GithubRepo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [readmeContent, setReadmeContent] = useState<string | null>(null);
  const [isLoadingReadme, setIsLoadingReadme] = useState(false);

  // Gerar dados de palavras-chave para o sistema de busca inteligente
  const repoKeywords = useMemo((): RepoKeywords[] => {
    if (!repos) return [];

    return repos.map(repo => ({
      repoName: repo.name,
      keywords: repo.readme_keywords || [],
      categories: repo.readme_categories || {},
      lastAnalyzed: Date.now(),
      priority: repo.readme_keywords?.length > 0 ? 1 : 3 // Prioridade baseada na análise do README
    }));
  }, [repos]);

  // Processar repos quando carregados do contexto
  useEffect(() => {
    if (repos) {
      // Ordenar todos os repos por data de criação/atualização (mais recentes primeiro)
      const sortedByDate = [...repos].sort((a, b) => {
        const dateA = new Date(a.created_at).getTime();
        const dateB = new Date(b.created_at).getTime();
        return dateB - dateA; // Mais recente primeiro
      });

      // Pegar os 3 projetos mais recentes para destaque
      const recent = sortedByDate.slice(0, 3);
      
      setRecentRepos(recent);
      setAllRepos(sortedByDate); // Todos os projetos (incluindo os recentes)
      setFilteredRepos(sortedByDate); // Inicialmente mostra todos os repos
    }
  }, [repos]);

  // Lidar com filtro inicial das skills do About
  useEffect(() => {
    if (initialFilter && allRepos.length > 0) {
      // Aplicar filtro inicial baseado na skill selecionada no About
      const initialFiltered = allRepos.filter(repo => {
        const term = initialFilter.toLowerCase();
        
        // Verificar linguagem, topics, description e keywords do README
        const searchFields = [
          repo.language || '',
          repo.description || '',
          ...repo.topics,
          ...(repo.readme_keywords || [])
        ];

        return searchFields.some(field => 
          field.toLowerCase().includes(term) || 
          field.toLowerCase().replace(/\.| & /g, '').includes(term.replace(/\.| & /g, ''))
        );
      });
      
      setFilteredRepos(initialFiltered);
      onFilterApplied();
    }
  }, [initialFilter, onFilterApplied, allRepos]);

  // Callback para receber resultados filtrados do ProjectSearch
  const handleFilteredResults = useCallback((filtered: GithubRepo[]) => {
    setFilteredRepos(filtered);
  }, []);

  // Callback para detectar mudanças no estado da busca
  const handleSearchStateChange = useCallback((isActive: boolean) => {
    setIsSearchActive(isActive);
  }, []);

  const handleCardClick = async (repo: GithubRepo) => {
    setSelectedRepo(repo);
    setIsModalOpen(true);
    setIsLoadingReadme(true);
    setReadmeContent(null);

    const owner = repo.full_name.split('/')[0];
    const { data: readmeData } = await getRepoReadme(owner, repo.name);

    if (readmeData?.content) {
      try {
        const binaryString = atob(readmeData.content);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        const decodedContent = new TextDecoder('utf-8').decode(bytes);
        setReadmeContent(decodedContent);
      } catch (e) {
        console.error("Failed to decode README content:", e);
        setReadmeContent("Erro: Não foi possível decodificar o conteúdo do README.");
      }
    } else {
      setReadmeContent("Nenhum arquivo README encontrado para este projeto.");
    }
    setIsLoadingReadme(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRepo(null);
    setReadmeContent(null);
  };
  
  const SkeletonCard = () => (
    <div className="group bg-gradient-to-br from-light-card to-light-bg dark:from-dark-card dark:to-dark-bg rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-light-border/30 dark:border-dark-border/30 backdrop-blur-sm overflow-hidden relative">
      {/* Gradient overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative z-10">
        {/* Title skeleton */}
        <div className="h-6 bg-gradient-to-r from-light-border via-light-border/60 to-light-border dark:from-dark-border dark:via-dark-border/60 dark:to-dark-border rounded-lg w-3/4 mb-4 animate-shimmer"></div>
        
        {/* Description skeleton */}
        <div className="space-y-2 mb-6">
          <div className="h-4 bg-gradient-to-r from-light-border/80 via-light-border/40 to-light-border/80 dark:from-dark-border/80 dark:via-dark-border/40 dark:to-dark-border/80 rounded w-full animate-shimmer"></div>
          <div className="h-4 bg-gradient-to-r from-light-border/80 via-light-border/40 to-light-border/80 dark:from-dark-border/80 dark:via-dark-border/40 dark:to-dark-border/80 rounded w-4/5 animate-shimmer" style={{animationDelay: '0.1s'}}></div>
        </div>
        
        {/* Language and stats skeleton */}
        <div className="flex justify-between items-center pt-4 border-t border-light-border/30 dark:border-dark-border/30">
          <div className="h-5 bg-gradient-to-r from-light-border/60 via-light-border/30 to-light-border/60 dark:from-dark-border/60 dark:via-dark-border/30 dark:to-dark-border/60 rounded-full w-20 animate-shimmer" style={{animationDelay: '0.2s'}}></div>
          <div className="flex gap-4">
            <div className="flex items-center gap-1">
              <div className="h-4 w-4 bg-light-border/50 dark:bg-dark-border/50 rounded animate-shimmer" style={{animationDelay: '0.3s'}}></div>
              <div className="h-4 bg-light-border/50 dark:bg-dark-border/50 rounded w-8 animate-shimmer" style={{animationDelay: '0.3s'}}></div>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-4 w-4 bg-light-border/50 dark:bg-dark-border/50 rounded animate-shimmer" style={{animationDelay: '0.4s'}}></div>
              <div className="h-4 bg-light-border/50 dark:bg-dark-border/50 rounded w-8 animate-shimmer" style={{animationDelay: '0.4s'}}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Section id="projects">
      {/* Background orbs animados */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-20 -right-20 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute -bottom-20 left-1/2 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>
      
      {/* Header moderno */}
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-6">
          Meus Projetos Públicos
        </h2>
        <p className="text-xl md:text-2xl text-light-subtext dark:text-dark-subtext mb-4 max-w-3xl mx-auto font-light">
          Uma seleção dos meus trabalhos de código aberto
        </p>
        <p className="text-sm text-light-subtext/80 dark:text-dark-subtext/80 mb-6">
          Projetos sincronizados diretamente da API do GitHub • Atualizado a cada 4 horas
        </p>
        
        {/* Status banner mais elegante */}
        {isReposStale && (
          <div className="mt-6 max-w-2xl mx-auto">
            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/10 dark:to-amber-900/10 border border-yellow-200 dark:border-yellow-500/20 rounded-2xl p-4 backdrop-blur-sm" role="alert">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-sm text-yellow-800 dark:text-yellow-300">
                  <p className="font-medium">Dados podem estar desatualizados</p>
                  <p className="text-xs opacity-90 mt-1">Não foi possível sincronizar com o GitHub no momento</p>
                </div>
              </div>
            </div>
          </div>
        )}
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
        
        @keyframes shimmer {
          0% {
            background-position: -200px 0;
          }
          100% {
            background-position: calc(200px + 100%) 0;
          }
        }
        
        .animate-pulse {
          animation: pulse-gentle 4s ease-in-out infinite;
        }
        
        .fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        
        .animate-shimmer {
          background-image: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0px,
            rgba(255, 255, 255, 0.2) 40px,
            rgba(255, 255, 255, 0.5) 80px,
            rgba(255, 255, 255, 0)
          );
          background-size: 200px 100%;
          animation: shimmer 2s infinite ease-in-out;
        }
        
        /* Dark mode shimmer */
        .dark .animate-shimmer {
          background-image: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0px,
            rgba(255, 255, 255, 0.1) 40px,
            rgba(255, 255, 255, 0.2) 80px,
            rgba(255, 255, 255, 0)
          );
        }
        
        /* Enhanced hover effects for project cards */
        .project-card-wrapper:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
        
        .dark .project-card-wrapper:hover {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
      `}</style>

      {isLoadingRepos ? (
        <div className="relative z-10">
            {/* Loading state para projetos recentes */}
            <div className="mb-20">
              <div className="text-center mb-12">
                <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent mb-4">
                  Projetos Recentes
                </h3>
                <p className="text-light-subtext dark:text-dark-subtext">Meus 3 repositórios mais recentes</p>
              </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                </div>
            </div>
            
            {/* Loading state para todos os projetos */}
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-4">
                Todos os Projetos
              </h3>
              <p className="text-light-subtext dark:text-dark-subtext">Explore meu portfólio completo</p>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)}
            </div>
        </div>
      ) : (
        <div className="relative z-10">
          {/* Seção de projetos recentes */}
          {recentRepos.length > 0 && (
            <div className="mb-20 fade-in-up">
              <div className="text-center mb-12">
                <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent mb-4">
                  Projetos Recentes
                </h3>
                <p className="text-light-subtext dark:text-dark-subtext">Meus 3 repositórios mais recentes</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {recentRepos.map((repo, index) => (
                  <div key={repo.id} className="fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                    <ProjectCard repo={repo} onCardClick={handleCardClick} index={index} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Seção de todos os projetos */}
          <div className="fade-in-up" style={{animationDelay: '0.3s'}}>
             {allRepos.length > 0 && (
                <div className="text-center mb-12">
                  <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-4">
                    Todos os Projetos
                  </h3>
                  <p className="text-light-subtext dark:text-dark-subtext">Explore meu portfólio completo com busca avançada</p>
                </div>
             )}
            
            {/* Sistema de busca avançada */}
            {allRepos.length > 0 && (
              <div className="mb-12 fade-in-up" style={{animationDelay: '0.4s'}}>
                <ProjectSearch 
                  repos={allRepos}
                  repoKeywords={repoKeywords} // Todos os projetos incluindo os recentes
                  onFilteredResults={handleFilteredResults}
                  onSearchStateChange={handleSearchStateChange}
                />
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRepos.map((repo, index) => (
                <div key={repo.id} className="fade-in-up" style={{animationDelay: `${(index * 0.05)}s`}}>
                  <ProjectCard repo={repo} onCardClick={handleCardClick} index={index} />
                </div>
              ))}
            </div>

            {/* Mensagem aprimorada quando não há resultados */}
            {isSearchActive && filteredRepos.length === 0 && (
              <div className="text-center py-16 fade-in-up">
                <div className="max-w-md mx-auto">
                  <div className="mb-6">
                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-12 h-12 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-light-text dark:text-dark-text mb-3">
                    Nenhum projeto encontrado
                  </h3>
                  <p className="text-light-subtext dark:text-dark-subtext mb-6 leading-relaxed">
                    Tente ajustar sua busca ou explorar diferentes categorias tecnológicas para descobrir mais projetos.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <span className="px-3 py-1 text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full">React</span>
                    <span className="px-3 py-1 text-xs bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full">Node.js</span>
                    <span className="px-3 py-1 text-xs bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-full">Python</span>
                    <span className="px-3 py-1 text-xs bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-full">JavaScript</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {isModalOpen && selectedRepo && (
        <ProjectModal 
          repo={selectedRepo}
          onClose={handleCloseModal}
          readmeContent={readmeContent}
          isLoadingReadme={isLoadingReadme}
        />
      )}
    </Section>
  );
};

export default Projects;