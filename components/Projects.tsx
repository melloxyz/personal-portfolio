import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Section from './Section';
import { FEATURED_PROJECTS } from '../constants';
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
  const [featuredRepos, setFeaturedRepos] = useState<GithubRepo[]>([]);
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
      const featured = repos.filter(repo => FEATURED_PROJECTS.includes(repo.name));
      const others = repos.filter(repo => !FEATURED_PROJECTS.includes(repo.name));
      
      setFeaturedRepos(featured);
      setAllRepos(others);
      setFilteredRepos(others); // Inicialmente mostra todos os repos não destacados
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
    <div className="bg-light-card dark:bg-dark-card rounded-2xl p-6 shadow-md animate-pulse">
        <div className="h-6 bg-light-border dark:bg-dark-border rounded w-3/4 mb-3"></div>
        <div className="h-4 bg-light-border dark:bg-dark-border rounded w-full mb-1"></div>
        <div className="h-4 bg-light-border dark:bg-dark-border rounded w-5/6 mb-4"></div>
        <div className="flex justify-between items-center mt-auto pt-4 border-t border-light-border/70 dark:border-dark-border/70">
            <div className="h-5 bg-light-border dark:bg-dark-border rounded w-1/4"></div>
            <div className="flex gap-4">
                <div className="h-5 bg-light-border dark:bg-dark-border rounded w-10"></div>
                <div className="h-5 bg-light-border dark:bg-dark-border rounded w-10"></div>
            </div>
        </div>
    </div>
  );

  return (
    <Section id="projects">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">Projetos</h2>
        <p className="text-lg text-light-subtext dark:text-dark-subtext mt-2">
          Uma seleção dos meus trabalhos de código aberto.
        </p>
        <p className="text-sm text-light-subtext dark:text-dark-subtext mt-2">
          Projetos são sincronizados diretamente da API do GitHub a cada 4 horas.
        </p>
        {isReposStale && (
            <div className="mt-4 max-w-2xl mx-auto p-3 text-sm text-yellow-800 bg-yellow-100 border border-yellow-300 rounded-lg dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-500/30" role="alert">
              Atenção: Não foi possível buscar os dados mais recentes. A lista de projetos pode estar desatualizada.
            </div>
        )}
      </div>

      {isLoadingRepos ? (
        <>
            <div className="mb-16">
                <h3 className="text-2xl font-bold text-center mb-8">Projetos em Destaque</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <SkeletonCard />
                    <SkeletonCard />
                </div>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)}
            </div>
        </>
      ) : (
        <>
          {featuredRepos.length > 0 && (
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-center mb-8">Projetos em Destaque</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {featuredRepos.map((repo, index) => (
                  <ProjectCard key={repo.id} repo={repo} onCardClick={handleCardClick} index={index} />
                ))}
              </div>
            </div>
          )}

          <div>
             {allRepos.length > 0 && (
                <h3 className="text-2xl font-bold text-center mb-8">Outros Projetos</h3>
             )}
            
            {/* Sistema de busca avançada */}
            {allRepos.length > 0 && (
              <ProjectSearch 
                repos={allRepos}
                repoKeywords={repoKeywords.filter(kw => !FEATURED_PROJECTS.includes(kw.repoName))}
                onFilteredResults={handleFilteredResults}
                onSearchStateChange={handleSearchStateChange}
              />
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRepos.map((repo, index) => (
                <ProjectCard key={repo.id} repo={repo} onCardClick={handleCardClick} index={index} />
              ))}
            </div>

            {/* Mensagem quando não há resultados */}
            {isSearchActive && filteredRepos.length === 0 && (
              <div className="text-center py-12">
                <div className="mb-4">
                  <svg className="mx-auto h-24 w-24 text-light-subtext dark:text-dark-subtext" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-light-text dark:text-dark-text mb-2">
                  Nenhum projeto encontrado
                </h3>
                <p className="text-light-subtext dark:text-dark-subtext mb-4">
                  Tente ajustar sua busca ou filtros para encontrar mais projetos.
                </p>
              </div>
            )}
          </div>
        </>
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